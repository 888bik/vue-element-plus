import type { App } from "vue";
import Form from "./Form.vue";
import FormItem from "./FormItem.vue";

Form.install = (app: App) => {
  app.component(Form.name!, Form);
};
FormItem.install = (app: App) => {
  app.component(Form.name!, Form);
};

export default FormItem;

export { Form };

export * from "./types";
