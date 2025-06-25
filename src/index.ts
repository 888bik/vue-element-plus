import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Alert from "./components/Alert";
import Button from "./components/Button";
import CollapseItem, { Collapse } from "./components/Collapse";
import Dropdown from "./components/Dropdown";
import FormItem, { Form } from "./components/Form";
import Icon from "./components/Icon";
import Input from "./components/Input";
import Link from "./components/Link";
import Message, {
  closeAll as closeMessageAll,
  createMessage,
} from "./components/Message";
import Select from "./components/Select";
import Switch from "./components/Switch";
import Tooltip from "./components/Tooltip";

import "./styles/index.scss";

import type { App } from "vue";

library.add(fas);

const components = [
  Alert,
  Button,
  Collapse,
  Dropdown,
  Form,
  Icon,
  Input,
  Link,
  Message,
  Select,
  Switch,
  Tooltip,
];

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name!, component);
  });
};

export {
  install,
  Alert,
  Button,
  Collapse,
  CollapseItem,
  Dropdown,
  Form,
  FormItem,
  Icon,
  Input,
  Link,
  Message,
  closeMessageAll,
  createMessage,
  Select,
  Switch,
  Tooltip,
};

export default install;
