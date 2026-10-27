// Client-side: sends analytics events to /api/track.

type EventType = "pageview" | "click" | "error" | "event";
type Props = Record<string, string | number | boolean | undefined>;

let isLanding = true;
const reportedErrors = new Set<string>();

export function track(type: EventType, props: Props = {}) {
    if (typeof window === "undefined") return;

    const body = JSON.stringify({
        type,
        path: window.location.pathname,
        // document.referrer only means something for the page the visitor landed on
        referrer: type === "pageview" && isLanding ? document.referrer : undefined,
        props,
    });

    if (type === "pageview") isLanding = false;

    const sent = navigator.sendBeacon?.("/api/track", new Blob([body], { type: "application/json" }));
    if (!sent) {
        fetch("/api/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
            keepalive: true,
        }).catch(() => {});
    }
}

export function reportError(error: unknown, source: string) {
    const err = error instanceof Error ? error : new Error(String(error));
    const key = `${source}:${err.message}`;

    // Avoid flooding Loki with the same error (or an error loop)
    if (reportedErrors.has(key) || reportedErrors.size >= 20) return;
    reportedErrors.add(key);

    track("error", {
        source,
        message: err.message,
        stack: err.stack,
        digest: (error as { digest?: string })?.digest,
    });
}
