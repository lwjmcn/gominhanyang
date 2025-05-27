import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import legacy from "@vitejs/plugin-legacy";
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    legacy({
      targets: ["defaults", "ie >= 11"],
      polyfills: true,
      modernPolyfills: true,
    }),
  ],
  server: {
    port: 3000,
  },
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)), } },
});


/*
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    legacy({
      targets: ["defaults", "ie >= 11"],
      polyfills: true,
      modernPolyfills: true,
    }),
  ],
  server: {
    port: 3000,
  },
  resolve: { alias: { "@": new URL("./src", import.meta.url).pathname } },
});
*/