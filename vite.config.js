import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve("./src")
    }
  },
  server: {
    port: 5173,
    open: true
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.split("node_modules/")[1].split("/")[0];
          }
        }
      }
    }
  },
  optimizeDeps: {
    include: [
      "@mui/material",
      "@mui/icons-material",
      "clsx",
      "notistack",
      "formik",
      "yup"
    ]
  }
});
