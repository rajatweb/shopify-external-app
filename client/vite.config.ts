import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
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
