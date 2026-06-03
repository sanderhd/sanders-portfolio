"use client";

import { useEffect, useState } from "react";
import { ServiceStatus } from "@/app/status/page";

const HISTORY_KEY = (name: string) => `status_history_${name}`;
const MAX_HISTORY = 30;

interface HistoryEntry {
    online: boolean;
    responseTime: number | null;
    timestamp: number;
}

export default function StatusClient({ service }: { service: ServiceStatus }) {
    const [history, setHistory] = useState<HistoryEntry[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem(HISTORY_KEY(service.name));
        const prev: HistoryEntry[] = stored ? JSON.parse(stored) : [];

        const updated = [
            ...prev,
            { online: service.online, responseTime: service.responseTime, timestamp: Date.now() },
        ].slice(-MAX_HISTORY);

        localStorage.setItem(HISTORY_KEY(service.name), JSON.stringify(updated));
        setHistory(updated);
    }, [service]);

    const padded = [
        ...Array(MAX_HISTORY - history.length).fill(null),
        ...history,
    ];

    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <span className={`h-2 w-2 rounded-full ${service.online ? "bg-green-400" : "bg-red-400"}`} />
                    <span className="text-sm font-medium text-white">{service.name}</span>
                    <a
                        href={service.url}
                        target="_blank"
                        className="text-xs text-white/30 hover:text-white/50 transition"
                    >
                        {service.url.replace(/https?:\/\//, "")}
                    </a>
                </div>
                <div className="flex items-center gap-3">
                    {service.responseTime !== null && (
                        <span className="text-xs text-white/40">{service.responseTime}ms</span>
                    )}
                    <span className={`text-xs font-medium ${service.online ? "text-green-400" : "text-red-400"}`}>
                        {service.online ? "Online" : "Offline"}
                    </span>
                </div>
            </div>

            <div className="flex gap-0.5">
                {padded.map((entry, i) => (
                    <div
                        key={i}
                        title={entry ? `${entry.online ? "Online" : "Offline"} · ${entry.responseTime ?? "—"}ms · ${new Date(entry.timestamp).toLocaleTimeString("nl-NL")}` : "No data"}
                        className={`h-6 flex-1 rounded-sm transition-colors ${
                            entry === null
                                ? "bg-white/5"
                                : entry.online
                                ? "bg-green-500/60 hover:bg-green-500/90"
                                : "bg-red-500/60 hover:bg-red-500/90"
                        }`}
                    />
                ))}
            </div>
            <div className="flex justify-between mt-1.5">
                <span className="text-xs text-white/20">30 checks ago</span>
                <span className="text-xs text-white/20">now</span>
            </div>
        </div>
    );
}