export async function POST(req: Request) {
  const { initialData, bhkType } = await req.json();
  const filteredData =
    bhkType === "0"
      ? initialData
      : initialData.filter((item: any) => item.bhkName === bhkType);
  return Response.json(filteredData);
}
