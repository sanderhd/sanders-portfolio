import Navbar from "@/components/Navigation";
import StatusClient from "@/components/StatusClient";
import { checkService } from "@/lib/checkService";
import { recordStatus, getHistory } from "@/lib/statusStore";
import { SERVICES } from "@/lib/checkService";

export const revalidate = 0;

export default async function StatusPage() {
    const statusses = await Promise.all(SERVICES.map(checkService));
    statusses.forEach(recordStatus);

    const withHistory = statusses.map((s) => ({
        ...s,
        history: getHistory(s.name),
    }));

    const allOnline = statusses.every((s) => s.online);

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
                    <StatusClient initial={withHistory} />
                </div>

                <p className="text-white/20 text-xs mt-10 text-center">
                    Refreshes every 60 seconds • {new Date().toLocaleDateString("nl-NL")}
                </p>
            </div>
        </div>
    )
}