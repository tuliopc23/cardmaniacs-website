/**
 * Generates favicon.ico and apple-touch-icon.png from the app icon PNG.
 * Run from repo root: node frontend/scripts/generate-favicons.mjs
 */
import { readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = join(__dirname, "..", "..");
const publicDir = join(__dirname, "..", "public");
const source = join(publicDir, "images", "Graphic.png");

async function loadSharp() {
  const pnpmDir = join(workspaceRoot, "node_modules", ".pnpm");
  const sharpDir = readdirSync(pnpmDir).find((entry) => entry.startsWith("sharp@"));
  if (!sharpDir) throw new Error("sharp not found — run pnpm install from repo root");
  const mod = await import(
    pathToFileURL(join(pnpmDir, sharpDir, "node_modules", "sharp", "lib", "index.js")).href
  );
  return mod.default;
}

async function generateFavicons() {
  const sharp = await loadSharp();
  const sizes = [16, 32];
  const pngBuffers = await Promise.all(
    sizes.map((size) => sharp(source).resize(size, size, { fit: "cover" }).png().toBuffer()),
  );

  // Build a minimal multi-size ICO (PNG-embedded entries)
  const ico = buildIco(pngBuffers, sizes);
  writeFileSync(join(publicDir, "favicon.ico"), ico);

  await sharp(source)
    .resize(180, 180, { fit: "cover" })
    .png()
    .toFile(join(publicDir, "apple-touch-icon.png"));

  console.log("Generated favicon.ico and apple-touch-icon.png");
}

/** Minimal ICO writer for PNG-embedded favicons. */
function buildIco(images, sizes) {
  const count = images.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = dirEntrySize * count;
  let offset = headerSize + dirSize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);

  const entries = [];
  const dataBuffers = [];

  for (let i = 0; i < count; i++) {
    const size = sizes[i];
    const data = images[i];
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(size === 256 ? 0 : size, 0); // width
    entry.writeUInt8(size === 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bit count
    entry.writeUInt32LE(data.length, 8); // bytes in resource
    entry.writeUInt32LE(offset, 12); // offset
    entries.push(entry);
    dataBuffers.push(data);
    offset += data.length;
  }

  return Buffer.concat([header, ...entries, ...dataBuffers]);
}

generateFavicons().catch((err) => {
  console.error(err);
  process.exit(1);
});
