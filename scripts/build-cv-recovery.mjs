import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const parts = [
  "scripts/cv-recovery/part-01.b64",
  "scripts/cv-recovery/part-02.b64",
];

const target = resolve("public/assets/ilya-naumov-cv.pdf");
const base64 = (
  await Promise.all(parts.map((part) => readFile(resolve(part), "utf8")))
)
  .join("")
  .replace(/\s+/g, "");
const pdf = Buffer.from(base64, "base64");
const hash = createHash("sha256").update(pdf).digest("hex");
const expectedHash =
  "7f0e713e73d6bff3b6ed92e3adf314403d546c15eb24ccbf47f57c05cccb8e02";

if (!pdf.subarray(0, 5).equals(Buffer.from("%PDF-"))) {
  throw new Error(`CV asset is not a PDF (${pdf.length} bytes, sha256=${hash})`);
}

if (hash !== expectedHash) {
  throw new Error(`CV asset checksum mismatch: ${hash} (${pdf.length} bytes)`);
}

await mkdir(dirname(target), { recursive: true });
await writeFile(target, pdf);

console.log(`Generated ${target} (${pdf.length} bytes, sha256=${hash})`);
