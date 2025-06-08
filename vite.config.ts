import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader(), vueJsx()],
  resolve: {
    alias: {
      "@": "/src/", // 设置@指向src
      "@components": "/src/components", // 设置@components指向src/components
    },
  },
});
