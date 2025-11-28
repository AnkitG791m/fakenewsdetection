import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/fakenewsdetection/",  // 👈 yeh line add karo
});
