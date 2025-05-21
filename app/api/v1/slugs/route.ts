import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  return new Response("", {
    status: 405,
  });
}
const getFilePath = (type: string) =>
  path.join(process.cwd(), "static", `${type}Slugs.json`);

export async function POST(request: Request) {
  const { type, slug, id } = await request.json();

  if (!type || (type !== "project" && type !== "builder")) {
    return NextResponse.json(
      { error: "Invalid type parameter" },
      { status: 400 }
    );
  }

  const filePath = getFilePath(type);

  // Ensure the file exists
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({}));
  }

  // Read the existing data from the file
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(fileContent);

  // Perform CRUD operations
  if (Object.prototype.hasOwnProperty.call(data, slug)) {
    return NextResponse.json(
      { error: `${type} already exists` },
      { status: 400 }
    );
  }

  // Add new entry
  data[slug] = id;

  // Write the updated data back to the file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json(
    { message: `${type} created successfully` },
    { status: 201 }
  );
}

export async function PUT(request: Request) {
  const { type, slug, id } = await request.json();

  if (!type || (type !== "project" && type !== "builder")) {
    return NextResponse.json(
      { error: "Invalid type parameter" },
      { status: 400 }
    );
  }

  const filePath = getFilePath(type);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: `${type} not found` }, { status: 404 });
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(fileContent);

  if (!Object.prototype.hasOwnProperty.call(data, slug)) {
    return NextResponse.json(
      { error: `${type} does not exist` },
      { status: 404 }
    );
  }

  data[slug] = id;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json(
    { message: `${type} updated successfully` },
    { status: 200 }
  );
}

export async function DELETE(request: Request) {
  const { type, slug } = await request.json();

  if (!type || (type !== "project" && type !== "builder")) {
    return NextResponse.json(
      { error: "Invalid type parameter" },
      { status: 400 }
    );
  }

  const filePath = getFilePath(type);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: `${type} not found` }, { status: 404 });
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(fileContent);

  if (!Object.prototype.hasOwnProperty.call(data, slug)) {
    return NextResponse.json(
      { error: `${type} does not exist` },
      { status: 404 }
    );
  }

  delete data[slug];
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json(
    { message: `${type} deleted successfully` },
    { status: 200 }
  );
}
