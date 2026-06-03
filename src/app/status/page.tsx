import Navbar from "@/components/Navigation";
import StatusClient from "@/components/StatusClient";

export const revalidate = 60;

export interface Service {
    name: string;
    url: string;
}

export interface ServiceStatus {
    name: string;
    url: string;
    online: boolean;
    responseTime: number | null;
}

const SERVICES: Service[] = [
    { name: "Portfolio", url: "https://sander.tf" },
    { name: "Streamhive", url: "https://streamhive.sander.tf" },
];

async function checkService(service: Service): Promise<ServiceStatus> {
    const start = Date.now();

    try {
        const res = await fetch(service.url, {
            method: "HEAD",
            next: { revalidate: 0 },
            signal: AbortSignal.timeout(5000),
        });
        return {
            ...service,
            online: res.ok,
            responseTime: Date.now() - start,
        };
    } catch {
        return {
            ...service,
            online: false,
            responseTime: null
        };
    }
}

export default async function StatusPage() {
    const statuses = await Promise.all(SERVICES.map(checkService));
    const allOnline = statuses.every((s) => s.online);

    return (
        <div className="min-h-screen text-white">
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(64,64,64,0.4),rgba(255,255,255,0))]" />
            <Navbar />

            <div className="max-w-2xl mx-auto px-4 pt-32 pb-24">
                <h1 className="text-3xl font-bold text-white mb-2">Status</h1>
                <p className="text-white/40 text0sm mb-10">Live status of my public services.</p>

                <div className={`flex items-center gap-3 rounded-2xl border px-5 py-4 mb-8 ${
                    allOnline
                        ? "border-green-500/20 bg-green-500/5"
                        : "border-red-500/20 bg-red-500/5"
                }`}>
                    <span className={`h-2.5 w-2.5 rounded-full ${allOnline ? "bg-green-400" : "bg-red-400"} animate-pulse`} />
                    <span className={`text-sm font-medium ${allOnline ? "text-green-400" : "text-red-400"}`}>
                        {allOnline ? "All systems operational" : "Some systems are degraded"}
                    </span>
                </div>

                <div className="flex flex-col gap-3">
                    {statuses.map((s) => (
                        <StatusClient key={s.name} service={s} />
                    ))}
                </div>

                <p className="text-white/20 text-xs mt-10 text-center">
                    Refreshes every 60 seconds • {new Date().toLocaleDateString("nl-NL")}
                </p>
            </div>
        </div>
    )
}