import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  root: "mentor",
  base: "/mobil-demo/",
  plugins: [react()],
  build: { outDir: "../mobil-demo", emptyOutDir: true },
  server: { host: "127.0.0.1", port: 4174 },
});
