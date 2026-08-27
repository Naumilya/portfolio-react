import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const parts = [
  "scripts/cv/part-01.b64",
  "scripts/cv/part-02.b64",
  "scripts/cv/part-03.b64",
  "scripts/cv/part-04.b64",
  "scripts/cv/part-05a.b64",
  "scripts/cv/part-05b.b64",
];

const target = resolve("public/assets/ilya-naumov-cv.pdf");
const base64 = (
  await Promise.all(parts.map((part) => readFile(resolve(part), "utf8")))
).join("");

const pdf = Buffer.from(base64.replace(/\s+/g, ""), "base64");
const hash = createHash("sha256").update(pdf).digest("hex");
const expectedHash =
  "c8bc7d8e65ca5b2995db14c603401535708e488d05b11feb57fdaf42adf177d1";

if (hash !== expectedHash) {
  throw new Error(`CV asset checksum mismatch: ${hash}`);
}

await mkdir(dirname(target), { recursive: true });
await writeFile(target, pdf);

console.log(`Generated ${target} (${pdf.length} bytes)`);
