/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const zustandDir = path.resolve(__dirname, "../node_modules/zustand/esm");

if (!fs.existsSync(zustandDir)) {
  console.error("Zustand esm directory not found!");
  process.exit(1);
}

const files = fs.readdirSync(zustandDir).filter((f) => f.endsWith(".mjs"));

files.forEach((file) => {
  const filePath = path.join(zustandDir, file);
  let content = fs.readFileSync(filePath, "utf8");

  const updated = content.replace(
    /\(import\.meta\.env\s?\?\s?import\.meta\.env\.MODE\s?:\s?(void 0|undefined)\)\s?!==\s?"production"/g,
    "__DEV__"
  );

  if (updated !== content) {
    fs.writeFileSync(filePath, updated, "utf8");
    console.log(`✅ Patched ${file}`);
  }
});

console.log("🎉 Zustand patch completed!");