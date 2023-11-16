import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    server: { port: 3000, open: true },
    plugins: [react()],
  };
});
