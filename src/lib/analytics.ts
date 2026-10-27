// Server-side: pushes analytics events to Loki as JSON log lines.
// Without LOKI_URL set, events are only printed in development.

type Fields = Record<string, unknown>;

export async function logEvent(event: string, fields: Fields = {}) {
    const line = JSON.stringify({ ...fields, event });
    const lokiUrl = process.env.LOKI_URL;

    if (!lokiUrl) {
        if (process.env.NODE_ENV !== "production") console.log("[analytics]", line);
        return;
    }

    try {
        await fetch(`${lokiUrl.replace(/\/$/, "")}/loki/api/v1/push`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                streams: [
                    {
                        stream: { app: "portfolio", event },
                        values: [[`${Date.now()}000000`, line]],
                    },
                ],
            }),
            signal: AbortSignal.timeout(3000),
        });
    } catch (err) {
        console.error("[analytics] failed to push event to Loki", err);
    }
}
