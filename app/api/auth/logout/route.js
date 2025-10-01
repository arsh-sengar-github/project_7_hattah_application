import { connectDatabase } from "@/lib/databaseConnection";
import { cookies } from "next/headers";
import { response, errorResponse } from "@/lib/helpers";

export async function POST(request) {
  try {
    await connectDatabase();
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
    return response(true, 206, "User logged out");
  } catch (error) {
    return errorResponse(error);
  }
}
