"use client";

export default function Error({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
                <p className="text-white/60 mb-6">Please try again.</p>
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
