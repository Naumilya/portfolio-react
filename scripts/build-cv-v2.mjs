import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { gunzipSync } from "node:zlib";

const parts = [
  "scripts/cv-final/part-01.b64",
  "scripts/cv-final/part-02.b64",
  "scripts/cv-final/part-rest.b64",
];

const target = resolve("public/assets/ilya-naumov-cv.pdf");
const base64 = (
  await Promise.all(parts.map((part) => readFile(resolve(part), "utf8")))
).join("");

const compressed = Buffer.from(base64.replace(/\s+/g, ""), "base64");
const pdf = gunzipSync(compressed);
const hash = createHash("sha256").update(pdf).digest("hex");
const expectedHash =
  "e6cf2e1f5d06653f7d3d8d21c4fe31ba2af3b5314077730a51c414c954db86c3";

if (hash !== expectedHash) {
  throw new Error(`CV asset checksum mismatch: ${hash}`);
}

await mkdir(dirname(target), { recursive: true });
await writeFile(target, pdf);

console.log(`Generated ${target} (${pdf.length} bytes)`);
