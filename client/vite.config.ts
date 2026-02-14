import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173, // React dev server port
    proxy: {
      "/api": {
        target: "http://localhost:8080", // Your Express server
        changeOrigin: true,
      },
    },
  },
});
