import { defineConfig } from "vitepress";
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";
import { fileURLToPath } from "url";
// https://vitepress.dev/reference/site-config

// console.log("@->:", fileURLToPath(new URL("../../src", import.meta.url)));
export default defineConfig({
  title: "vue-element-plus",

  description: "A VitePress Site",
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("../../src", import.meta.url)),
      },
    },
  },
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
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
      {
        text: "Basic",
        items: [{ text: "Button", link: "/components/button" }],
      },
      {
        text: "Basic",
        items: [{ text: "Alert", link: "/components/alert" }],
      },
      {
        text: "Basic",
        items: [{ text: "Collapse", link: "/components/collapse" }],
      },
      {
        text: "Basic",
        items: [{ text: "Link", link: "/components/link" }],
      },
      {
        text: "Basic",
        items: [{ text: "Dropdown", link: "/components/dropdown" }],
      },
      {
        text: "Basic",
        items: [{ text: "Icon", link: "/components/icon" }],
      },
      {
        text: "Basic",
        items: [{ text: "Message", link: "/components/message" }],
      },
      {
        text: "Basic",
        items: [{ text: "Tooltip", link: "/components/tooltip" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/888bik/vue-element-plus" },
    ],
  },
});
