const fs = require("fs");
const path = require("path");

main();

function main() {
  copyReactJsxTypings();
}

function copyReactJsxTypings() {
  const srcDir = path.join(__dirname, "../node_modules/@types/react");
  const srcPath = path.join(__dirname, "../node_modules/@types/react/index.d.ts");

  const outDir = path.join(__dirname, "../src");
  const outPath = path.join(__dirname, "../src/react.d.ts");

  let contents = fs.readFileSync(srcPath, "utf-8");
  contents = contents.replace(/declare global/g, "export namespace __ReactGlobal");

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, contents, "utf-8");
  fs.rmSync(srcDir, { recursive: true, force: true });
}
