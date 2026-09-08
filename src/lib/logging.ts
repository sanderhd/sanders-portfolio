export async function reportServerError(payload: {
    level?: "error" | "warn" | "info";
    message: string;
    stack?: string;
    url?: string;
    context?: unknown;
}) {
    const apiUrl = process.env.LOGGING_API_URL;
    const apiKey = process.env.LOGGING_API_KEY;

    if (!apiUrl || !apiKey) {
        console.error("LOGGING_API_URL / LOGGING_API_KEY not configured, dropping error report");
        return;
    }

    try {
        await fetch(`${apiUrl}/api/log`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-api-key": apiKey },
            body: JSON.stringify({
                project: "portfolio",
                level: payload.level ?? "error",
                message: payload.message.slice(0, 4000),
                stack: payload.stack?.slice(0, 4000),
                url: payload.url?.slice(0, 500),
                context: payload.context,
            }),
        });
    } catch (err) {
        console.error("Failed to forward error to logging service:", err);
    }
}
