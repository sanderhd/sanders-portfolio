"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        fetch("/api/report-error", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                level: "error",
                message: error.message,
                stack: error.stack,
                url: typeof window !== "undefined" ? window.location.href : undefined,
                context: { digest: error.digest, boundary: "error" },
            }),
        }).catch(() => {});
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
                <p className="text-white/60 mb-6">The error has been reported.</p>
                <button
                    onClick={reset}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                >
                    Try again
                </button>
            </div>
        </div>
    );
}
