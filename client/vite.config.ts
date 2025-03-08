import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Get ngrok URL from environment or use default
const host = process.env.SHOPIFY_APP_URL?.replace(/https?:\/\//, "") || "";

export default defineConfig({
  define: {
    "process.env": process.env,
  },
  plugins: [react()],
  root: dirname(fileURLToPath(import.meta.url)),
  appType: "spa",
  server: {
    allowedHosts: [
      process.env.SHOPIFY_APP_URL?.replace(/https?:\/\//, "") || "",
    ],
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});
