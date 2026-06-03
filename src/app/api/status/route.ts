import { NextResponse } from "next/server";
import { SERVICES, checkService } from "@/lib/checkService";
import { recordStatus, getHistory } from "@/lib/statusStore";

export const dynamic = "force-dynamic";

export async function GET() {
    const statusses = await Promise.all(SERVICES.map(checkService));
    statusses.forEach(recordStatus);

    const result = statusses.map((s) => ({
        ...s,
        history: getHistory(s.name),
    }));

    return NextResponse.json(result);
}
