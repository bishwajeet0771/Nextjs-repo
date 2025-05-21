const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const writeNewSlugs = async () => {
  let url = `https://www.getrightproperty.com/common/project-list`;
  const res = await fetch(url, {
    method: "POST",
    cache: "no-store",
  });
  const data = await res.json();
  const staticDir = path.join(process.cwd(), "static");
  const filePath = path.join(staticDir, "projectSlugs.json");

  // Ensure the 'static' directory exists
  if (!fs.existsSync(staticDir)) {
    fs.mkdirSync(staticDir);
  }

  // Convert the data object into JSON
  const jsonContent = JSON.stringify(data, null, 2);

  // Write the JSON data to the file
  fs.writeFileSync(filePath, jsonContent);
};

writeNewSlugs();
