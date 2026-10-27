import type { Instrumentation } from "next";

export const onRequestError: Instrumentation.onRequestError = async (err, request, context) => {
    if (process.env.NEXT_RUNTIME !== "nodejs") return;

    const { logEvent } = await import("@/lib/analytics");
    const error = err as Error & { digest?: string };

    await logEvent("server_error", {
        path: request.path,
        method: request.method,
        route: context.routePath,
        routeType: context.routeType,
        message: error.message,
        stack: error.stack?.slice(0, 2000),
        digest: error.digest,
    });
};
