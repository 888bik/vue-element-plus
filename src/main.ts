import { createApp } from "vue";
import "./styles/index.scss";
import "normalize.css";
import App from "./App.vue";
import "./components/Collapse/style.scss";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(fas);

createApp(App).mount("#app");
