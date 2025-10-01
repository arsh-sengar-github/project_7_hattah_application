import { connectDatabase } from "@/lib/databaseConnection";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDatabase();
  return NextResponse.json({
    success: true,
    message: "Connected to Database",
  });
}
