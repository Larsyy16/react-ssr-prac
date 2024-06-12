import fs from "fs";
import path from "path";

export function writeDataToFile(filename, content) {
  fs.writeFileSync(
    path.join(process.cwd(), "server", filename),
    JSON.stringify(content, null, 2),
    "utf8",
  );
}
