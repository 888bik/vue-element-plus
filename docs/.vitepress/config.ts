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
          { text: "Alert 提示", link: "/components/alert" },
          {
            text: "Message 消息提示",
            link: "/components/message",
          },
          {
            text: "Tooltip 文字提示",
            link: "/components/tooltip",
          },
        ],
      },
      {
        text: "Navigation 导航",
        items: [{ text: "Dropdown 下拉菜单", link: "/components/dropdown" }],
      },
      {
        text: "Data 数据展示",
        items: [{ text: "Collapse 折叠面板", link: "/components/collapse" }],
      },
      {
        text: "Basic 基础组件",
        items: [
          { text: "Button 按钮", link: "/components/button" },
          {
            text: "Icon 图标",
            link: "/components/icon",
          },
          {
            text: "Link 链接",
            link: "/components/link",
          },
        ],
      },
      {
        text: "Form 表单组件",
        items: [
          { text: "Input 输入框", link: "/components/input" },
          { text: "Switch 开关", link: "/components/switch" },
          { text: "Select 选择器", link: "/components/select" },
          { text: "Form 表单", link: "/components/form" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/888bik/vue-element-plus" },
    ],
  },
});
