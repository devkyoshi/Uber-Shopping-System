import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/backend": {
        target: "http://localhost:8070",
        secure: false,
      },
      "/customer": {
        target: "http://localhost:8070",
        secure: false,
      },
      "/Feedback": {
        target: "http://localhost:8070",
        secure: false,
      },
      "/Rating": {
        target: "http://localhost:8070",
        secure: false,
      },
      '/api': {
        target: 'http://localhost:8070',
        secure: false,
      },
      
    },
  },
  plugins: [react()],
});
