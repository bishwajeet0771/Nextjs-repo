import { revalidatePath, revalidateTag } from "next/cache";
export async function POST(req: Request) {
  const data = await req.json();
  await revalidatePath(data.path);
  revalidateTag(data.path);
  return Response.json({
    id: "revalidated",
    path: data.path,
    status: true,
  });
}
