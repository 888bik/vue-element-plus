import { defineConfig } from "vitepress";
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";
import { fileURLToPath, URL } from "url";
// https://vitepress.dev/reference/site-config
console.log(
  "Alias path:",
  fileURLToPath(new URL("../../src", import.meta.url))
);
export default defineConfig({
  title: "vue-element-plus",
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("../../src", import.meta.url)),
        // "@": path.resolve(__dirname, "./src"),
      },
    },
  },
  description: "A VitePress Site",
  markdown: {
    config(md) {
      md.use(containerPreview);
      md.use(componentPreview);
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],
    sidebar: [
      {
        text: "Feedback 反馈组件",
        items: [
          { text: "Alert", link: "/components/alert" },
          {
            text: "Message",
            link: "/components/message",
          },
          {
            text: "Tooltip",
            link: "/components/tooltip",
          },
        ],
      },
      {
        text: "Navigation 导航",
        items: [{ text: "Dropdown", link: "/components/dropdown" }],
      },
      {
        text: "Data 数据展示",
        items: [{ text: "Collapse", link: "/components/collapse" }],
      },
      {
        text: "Basic 基础组件",
        items: [
          { text: "Button", link: "/components/button" },
          {
            text: "Icon",
            link: "/components/icon",
          },
          {
            text: "Link",
            link: "/components/link",
          },
        ],
      },
      {
        text: "Form 表单组件",
        items: [
          { text: "Input", link: "/components/input" },
          { text: "Switch", link: "/components/switch" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/888bik/vue-element-plus" },
    ],
  },
});
