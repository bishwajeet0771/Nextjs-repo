// import fs from "fs";
import { revalidateTag } from "next/cache";
export async function POST(req: Request) {
  const data = await req.json();
  // console.log(data.id);
  await revalidateTag(data.id);
  return Response.json({
    id: "revalidated",
    builderId: data.id,
    status: true,
  });
}
