// ponytail: OpenNext's Turbopack chunk inliner (@opennextjs/cloudflare <= 1.20.16) only matches
// "/"-style paths. On Windows the traced paths use "\", so it emits an empty requireChunk() and
// every page returns 500 in production. Normalize the paths before the plugin uses them.
// Idempotent; throws if OpenNext changes so the deploy fails loudly instead of shipping a broken site.
// Remove once upstream normalizes paths (check getInlinableChunks in turbopack.js).
import fs from "node:fs";

const file = "node_modules/@opennextjs/cloudflare/dist/cli/build/patches/plugins/turbopack.js";
const marker = "windows-path-fix";
const needle = "patchCode: async ({ code, tracedFiles, filePath }) => {";
const inject = String.raw`
                tracedFiles = tracedFiles.map((p) => p.replaceAll("\\", "/")); filePath = filePath.replaceAll("\\", "/"); // ${marker}`;

const src = fs.readFileSync(file, "utf8");
if (src.includes(marker)) {
  console.log("[patch-opennext-windows] already applied");
} else if (!src.includes(needle)) {
  throw new Error("[patch-opennext-windows] OpenNext turbopack.js changed — re-check the Windows path fix");
} else {
  fs.writeFileSync(file, src.replace(needle, needle + inject));
  console.log("[patch-opennext-windows] applied");
}
