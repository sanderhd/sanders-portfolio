import { createHash } from "node:crypto";
import { logEvent } from "@/lib/analytics";

const EVENT_TYPES = new Set(["pageview", "click", "error", "event"]);
const BOT_PATTERN = /bot|crawl|spider|slurp|headless|lighthouse|preview|facebookexternalhit|curl|wget|python|monitor/i;
const MAX_BODY_SIZE = 8_000;
const RATE_LIMIT = 120; // events per IP per minute

const hits = new Map<string, { count: number; reset: number }>();

function getClientIp(req: Request) {
    return (
        req.headers.get("cf-connecting-ip") ??
        req.headers.get("x-real-ip") ??
        req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
        "unknown"
    );
}

function isRateLimited(ip: string) {
    const now = Date.now();
    const entry = hits.get(ip);

    if (!entry || entry.reset < now) {
        if (hits.size > 10_000) hits.clear();
        hits.set(ip, { count: 1, reset: now + 60_000 });
        return false;
    }

    return ++entry.count > RATE_LIMIT;
}

// Anonymous visitor id: changes every day, so visitors can't be followed across days
// and no cookies are needed.
function getVisitorId(ip: string, userAgent: string) {
    const day = new Date().toISOString().slice(0, 10);
    return createHash("sha256")
        .update(`${process.env.ANALYTICS_SALT ?? ""}|${day}|${ip}|${userAgent}`)
        .digest("hex")
        .slice(0, 16);
}

function parseUserAgent(ua: string) {
    const device = /ipad|tablet/i.test(ua) ? "tablet" : /mobi|android|iphone/i.test(ua) ? "mobile" : "desktop";

    const browser =
        /edg\//i.test(ua) ? "Edge" :
        /opr\//i.test(ua) ? "Opera" :
        /firefox|fxios/i.test(ua) ? "Firefox" :
        /chrome|crios/i.test(ua) ? "Chrome" :
        /safari/i.test(ua) ? "Safari" :
        "Other";

    const os =
        /windows/i.test(ua) ? "Windows" :
        /android/i.test(ua) ? "Android" :
        /iphone|ipad|ipod/i.test(ua) ? "iOS" :
        /mac os/i.test(ua) ? "macOS" :
        /linux/i.test(ua) ? "Linux" :
        "Other";

    return { device, browser, os };
}

function getReferrerHost(referrer: unknown, ownHost: string | null) {
    if (typeof referrer !== "string" || !referrer) return undefined;
    try {
        const host = new URL(referrer).host;
        return host === ownHost ? undefined : host;
    } catch {
        return undefined;
    }
}

function sanitizeProps(props: unknown) {
    if (!props || typeof props !== "object") return {};

    const result: Record<string, string | number | boolean> = {};
    for (const [key, value] of Object.entries(props).slice(0, 10)) {
        if (typeof value === "string") result[key.slice(0, 40)] = value.slice(0, 2000);
        else if (typeof value === "number" || typeof value === "boolean") result[key.slice(0, 40)] = value;
    }
    return result;
}

export async function POST(req: Request) {
    const noContent = new Response(null, { status: 204 });

    const userAgent = req.headers.get("user-agent") ?? "";
    if (!userAgent || BOT_PATTERN.test(userAgent)) return noContent;

    const ip = getClientIp(req);
    if (isRateLimited(ip)) return new Response(null, { status: 429 });

    const raw = await req.text();
    if (raw.length > MAX_BODY_SIZE) return new Response(null, { status: 413 });

    let body: { type?: unknown; path?: unknown; referrer?: unknown; props?: unknown };
    try {
        body = JSON.parse(raw);
    } catch {
        return new Response(null, { status: 400 });
    }

    if (typeof body.type !== "string" || !EVENT_TYPES.has(body.type)) {
        return new Response(null, { status: 400 });
    }

    await logEvent(body.type, {
        ...sanitizeProps(body.props),
        path: typeof body.path === "string" ? body.path.slice(0, 200) : undefined,
        referrer: getReferrerHost(body.referrer, req.headers.get("host")),
        visitor: getVisitorId(ip, userAgent),
        country: req.headers.get("cf-ipcountry") ?? undefined,
        ...parseUserAgent(userAgent),
    });

    return noContent;
}
