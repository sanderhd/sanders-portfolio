export async function register() {}

export async function onRequestError(
    err: unknown,
    request: { path: string; method: string },
    context: { routerKind: string; routePath: string; routeType: string }
) {
    const { reportServerError } = await import("@/lib/logging");
    const error = err instanceof Error ? err : new Error(String(err));

    await reportServerError({
        level: "error",
        message: error.message,
        stack: error.stack,
        url: request.path,
        context: {
            method: request.method,
            routerKind: context.routerKind,
            routePath: context.routePath,
            routeType: context.routeType,
        },
    });
}
