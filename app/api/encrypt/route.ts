import { encryptUrl } from "@/app/hooks/custom/useRedirect";
// import { encryptData } from "@/app/utils/auth/nodeCrypto";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const encryptedData = encryptUrl(data.url);
    return NextResponse.json({ hash: encryptedData, status: true });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false, error: "Error reading file" });
  }
}
