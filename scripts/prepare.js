const fs = require("fs");
const path = require("path");

main();

function main() {
  unglobalReactJsx();
  copyGlobalDts();
}

function unglobalReactJsx() {
  const dtsPath = path.join(__dirname, "../node_modules/@types/react/index.d.ts");
  let contents = fs.readFileSync(dtsPath, "utf-8");
  contents = contents.replace(/namespace JSX/g, "namespace __ReactJSX");
  fs.writeFileSync(dtsPath, contents, "utf-8");
}

function copyGlobalDts() {
  const srcFile = path.join(__dirname, "../src/global.d.ts");
  const outDir = path.join(__dirname, "../dist");
  const outFile = path.join(__dirname, "../dist/global.d.ts");
  fs.mkdirSync(outDir, { recursive: true });
  fs.copyFileSync(srcFile, outFile);
}
