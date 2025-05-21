export async function POST(req: Request) {
  const dto = await req.json();
  const { data, bhkName } = dto;
  const filteredData = data.filter((item: any) => item.bhkName === bhkName);
  return Response.json(filteredData);
}
