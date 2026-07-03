import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/esummit/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("three")) {
              return "vendor-three";
            }
            if (id.includes("gsap")) {
              return "vendor-gsap";
            }
            if (id.includes("framer-motion") || id.includes("motion")) {
              return "vendor-motion";
            }
            if (id.includes("lucide-react")) {
              return "vendor-lucide";
            }
            if (
              id.includes("react-router") ||
              id.includes("@remix-run/router")
            ) {
              return "vendor-router";
            }
            if (id.includes("react") || id.includes("scheduler")) {
              return "vendor-react";
            }
            if (id.includes("locomotive-scroll")) {
              return "vendor-lscroll";
            }
            if (id.includes("howler")) {
              return "vendor-howler";
            }
            return "vendor";
          }
        },
      },
    },
  },
});
