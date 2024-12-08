import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Ganti `lasol` dengan nama repositori GitHub kamu
export default defineConfig({
  plugins: [react()],
  base: "/lasol/", // Tambahkan ini agar GitHub Pages dapat menemukan resource
});
