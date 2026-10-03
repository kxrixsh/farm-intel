import { NextResponse } from "next/server";
export async function POST(req: Request) {
  return NextResponse.json({ reply: "FARM AI online and operational.", status: "connected" });
}
