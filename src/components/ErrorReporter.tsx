"use client";

import { useEffect } from "react";

function report(payload: { level: "error"; message: string; stack?: string; context?: unknown }) {
    fetch("/api/report-error", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, url: window.location.href }),
    }).catch(() => {});
}

export default function ErrorReporter() {
    useEffect(() => {
        function onError(event: ErrorEvent) {
            report({
                level: "error",
                message: event.message,
                stack: event.error?.stack,
                context: { source: "window.onerror", filename: event.filename, lineno: event.lineno },
            });
        }

        function onRejection(event: PromiseRejectionEvent) {
            const reason = event.reason;
            report({
                level: "error",
                message: reason instanceof Error ? reason.message : String(reason),
                stack: reason instanceof Error ? reason.stack : undefined,
                context: { source: "unhandledrejection" },
            });
        }

        window.addEventListener("error", onError);
        window.addEventListener("unhandledrejection", onRejection);
        return () => {
            window.removeEventListener("error", onError);
            window.removeEventListener("unhandledrejection", onRejection);
        };
    }, []);

    return null;
}
