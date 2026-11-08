import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];

// https://vite.dev/config/
export default defineConfig({
  // Project pages are served from /<repository-name>/ on GitHub Pages.
  base: repositoryName ? `/${repositoryName}/` : "/",
  plugins: [react(), tailwindcss()],
});
