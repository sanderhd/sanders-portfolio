export const SERVICES = [
    { name: "Portfolio", url: "https://sander.tf" }
];

export async function checkService(service: { name: string; url: string }) {
    const start = Date.now();
    try {
        const res = await fetch(service.url, {
            method: "HEAD",
            signal: AbortSignal.timeout(5000),
            cache: "no-store",
        });
        return { ...service, online: res.ok, responseTime: Date.now() - start };
    } catch {
        return { ...service, online: false, responseTime: null };
    }
}