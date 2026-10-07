// Produce a standalone React/Vite project from the Site's reviewed source.
// Only an explicit allowlist is copied; Site identity and runtime files stay out.
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { resolve } from "node:path";

const source = process.cwd();
const destination = resolve(
  process.argv[2] ?? "../fabricio-velez-portfolio-vercel",
);
if (destination === source || destination.startsWith(`${source}/`)) {
  throw new Error("Choose an export directory outside the source checkout.");
}
if (existsSync(destination)) {
  throw new Error("The export directory already exists; choose a new path.");
}
mkdirSync(destination, { recursive: true });
mkdirSync(resolve(destination, "scripts"), { recursive: true });

for (const file of [
  "src",
  "public",
  "docs",
  "index.html",
  "README.md",
  "AGENTS.md",
  "THIRD_PARTY.md",
  "vercel.json",
  "scripts/export-vercel.mjs",
]) {
  cpSync(resolve(source, file), resolve(destination, file), {
    recursive: true,
  });
}
const version = (name) =>
  JSON.parse(
    readFileSync(resolve(source, "node_modules", name, "package.json"), "utf8"),
  ).version;
const dependencies = Object.fromEntries(
  ["react", "react-dom", "lucide-react", "gsap"].map((name) => [
    name,
    version(name),
  ]),
);
const devDependencies = Object.fromEntries(
  [
    "@types/node",
    "@types/react",
    "@types/react-dom",
    "@vitejs/plugin-react",
    "typescript",
    "vite",
  ].map((name) => [name, version(name)]),
);
writeFileSync(
  resolve(destination, "package.json"),
  JSON.stringify(
    {
      name: "fabricio-velez-portfolio",
      version: "1.0.0",
      private: true,
      type: "module",
      engines: { node: ">=22.13.0" },
      scripts: {
        dev: "vite",
        typecheck: "tsc --noEmit",
        build: "npm run typecheck && vite build",
        preview: "vite preview",
      },
      dependencies,
      devDependencies,
    },
    null,
    2,
  ) + "\n",
);
writeFileSync(
  resolve(destination, "vite.config.ts"),
  `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: { outDir: "dist", emptyOutDir: true },
});
`,
);
const tsconfig = JSON.parse(
  readFileSync(resolve(source, "tsconfig.json"), "utf8"),
);
tsconfig.include = ["src", "vite.config.ts"];
writeFileSync(
  resolve(destination, "tsconfig.json"),
  JSON.stringify(tsconfig, null, 2) + "\n",
);
writeFileSync(
  resolve(destination, ".gitignore"),
  "node_modules/\ndist/\n.vercel/\n.env\n.env.*\n*.log\n.DS_Store\n",
);
console.log(
  JSON.stringify({ directory: destination, dependencies, devDependencies }),
);
