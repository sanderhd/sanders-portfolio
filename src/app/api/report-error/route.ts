import { NextResponse } from "next/server";
import { reportServerError } from "@/lib/logging";

export async function POST(req: Request) {
    const body = await req.json();

    await reportServerError({
        level: body.level === "warn" || body.level === "info" ? body.level : "error",
        message: String(body.message ?? "Unknown error"),
        stack: body.stack ? String(body.stack) : undefined,
        url: body.url ? String(body.url) : undefined,
        context: body.context,
    });

    return NextResponse.json({ ok: true });
}
