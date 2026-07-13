import fs from "node:fs/promises";
import path from "node:path";

const routes = [
  { path: "/", output: "dist/client/index.html" },
  { path: "/contact", output: "dist/client/contact/index.html" },
  { path: "/privacy", output: "dist/client/privacy/index.html" },
  { path: "/terms", output: "dist/client/terms/index.html" },
];

async function main() {
  const server = await import("../dist/server/_ssr/ssr.mjs");
  const handler = server.default;

  for (const route of routes) {
    const url = `http://localhost${route.path}`;
    const request = new Request(url, { headers: { host: "localhost" } });
    const response = await handler.fetch(request, {}, {});
    const html = await response.text();

    const outputPath = path.resolve(route.output);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, html, "utf-8");

    console.log(`Prerendered ${route.path} -> ${outputPath} (${html.length} bytes)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
