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
  "873da13bb8dea5d0e8f30b5f74661b4d1c12a7f9f425e8be9729d817b96be0b6";

if (hash !== expectedHash) {
  throw new Error(`CV asset checksum mismatch: ${hash}`);
}

await mkdir(dirname(target), { recursive: true });
await writeFile(target, pdf);

console.log(`Generated ${target} (${pdf.length} bytes)`);
