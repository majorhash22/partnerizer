import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",
  cacheDir: ".vite-cache",
  publicDir: "static",
  plugins: [react()],
  build: {
    rolldownOptions: {
      input: ["index.html", "platform/index.html", "solutions/index.html", "ecosystems/index.html"]
        .map((page) => fileURLToPath(new URL(page, import.meta.url))),
    },
  },
  server: {
    host: "127.0.0.1",
  },
  preview: {
    host: "127.0.0.1",
  },
});
