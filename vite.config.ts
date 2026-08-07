import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "hls.js": fileURLToPath(
        new URL("./node_modules/hls.js/dist/hls.js", import.meta.url),
      ),
    },
  },
});
