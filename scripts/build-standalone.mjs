import { readFile, writeFile } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(projectRoot, "dist");
const distIndex = join(distDir, "index.html");

const mimeTypes = {
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const localPath = (assetPath) => assetPath.replace(/^\.\//, "").replace(/^\//, "");

let html = (await readFile(distIndex, "utf8")).replaceAll("\r\n", "\n");

const stylesheetTag = html.match(/<link rel="stylesheet"[^>]+href="([^"]+)"[^>]*>/);
if (!stylesheetTag) throw new Error("Could not find the generated stylesheet.");

const stylesheetPath = join(distDir, localPath(stylesheetTag[1]));
let css = await readFile(stylesheetPath, "utf8");
const assetPattern = /url\((['"]?)(\.\/[a-zA-Z0-9_.-]+)\1\)/g;

for (const match of [...css.matchAll(assetPattern)]) {
  const assetRef = match[2];
  const assetPath = join(dirname(stylesheetPath), assetRef);
  const mime = mimeTypes[extname(assetPath).toLowerCase()];
  if (!mime) continue;
  const encoded = (await readFile(assetPath)).toString("base64");
  css = css.replaceAll(match[0], `url("data:${mime};base64,${encoded}")`);
}

html = html.replace(stylesheetTag[0], () => `<style>${css}</style>`);

const scriptTag = html.match(/<script type="module"[^>]+src="([^"]+)"[^>]*><\/script>/);
if (!scriptTag) throw new Error("Could not find the generated JavaScript bundle.");

const scriptPath = join(distDir, localPath(scriptTag[1]));
const script = (await readFile(scriptPath, "utf8")).replaceAll("</script", "<\\/script");
html = html.replace(scriptTag[0], () => `<script type="module">${script}</script>`);

const rootLauncher = html.replaceAll("./images/", "./dist/images/");
await writeFile(join(projectRoot, "OPEN_WEBSITE.html"), rootLauncher, "utf8");
