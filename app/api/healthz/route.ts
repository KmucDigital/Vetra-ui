import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function GET(_request: NextRequest): NextResponse {
  return NextResponse.json({ status: "ok" });
}
