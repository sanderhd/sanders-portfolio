"use client";

import { useEffect } from "react";

export default function GlobalError({
    error,
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
                context: { digest: error.digest, boundary: "global-error" },
            }),
        }).catch(() => {});
    }, [error]);

    return (
        <html lang="en">
            <body className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="text-center px-6">
                    <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
                    <p className="text-white/60">
                        The error has been reported. Please try refreshing the page.
                    </p>
                </div>
            </body>
        </html>
    );
}
