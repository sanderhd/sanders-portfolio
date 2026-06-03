interface ServiceStatus {
    name: string;
    online: boolean;
    responseTime: number | null;
}

export interface HistoryEntry {
    online: boolean;
    responseTime: number | null;
    timestamp: number;
}

const MAX_HISTORY = 30;
const store = new Map<string, HistoryEntry[]>();

export function recordStatus(status: ServiceStatus) {
    const prev = store.get(status.name) ?? [];
    const updated = [
        ...prev,
        { 
            online: status.online, 
            responseTime: status.responseTime, 
            timestamp: Date.now() 
        },
    ].slice(-MAX_HISTORY);
    store.set(status.name, updated);
}

export function getHistory(name: string): HistoryEntry[] {
    return store.get(name) ?? [];
}