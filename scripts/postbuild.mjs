// Post-export fix-ups for the static `out/` folder.
//
// Next.js builds segment-prefetch filenames by replacing "/" with "." but, on
// Windows, the source paths use "\" so files land in nested folders
// (`__next.about/__PAGE__.txt`) instead of the flat name the router requests
// (`__next.about.__PAGE__.txt`). Flatten them so client-side navigation
// prefetches resolve on any host. No-op when built on Linux/macOS.
import { readdir, rename, rm, stat } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const OUT = new URL("../out/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(p)));
    else files.push(p);
  }
  return files;
}

async function flatten(dir) {
  let moved = 0;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("__next.")) {
      for (const file of await walk(p)) {
        const rest = relative(p, file).split(sep).join(".");
        await rename(file, join(dir, `${entry.name}.${rest}`));
        moved++;
      }
      await rm(p, { recursive: true, force: true });
    } else {
      moved += await flatten(p);
    }
  }
  return moved;
}

await stat(OUT);
const moved = await flatten(OUT);
console.log(`postbuild: flattened ${moved} segment prefetch file(s)`);
