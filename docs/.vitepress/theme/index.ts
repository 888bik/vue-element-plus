import DefaultTheme from "vitepress/theme";
import { ElementPlusContainer } from "@vitepress-demo-preview/component";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

import "@vitepress-demo-preview/component/dist/style.css";
import "./custom.scss";
import "../../../src/styles/index.scss";

library.add(fas);

export default {
  ...DefaultTheme,

  enhanceApp({ app }) {
    app.component("demo-preview", ElementPlusContainer);
  },
};
