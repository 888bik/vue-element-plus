<template>
  <!-- 按钮案例 -->
  <div>
    <Button type="info" circle disabled>info </Button>
    <Button type="danger" plain loading> danger </Button>
    <Button type="success" loading>success</Button>
    <Button type="warning">warning</Button>
    <Button size="large" @click="open" round>open</Button>
    <Button size="small" @click="close">close</Button>
  </div>
  <br /><br />
  <!-- 折叠面板 -->
  <div>
    <Collapse @change="handleActiveNames" v-model="openedValue">
      <CollapseItem title="I am title" name="a">
        <h3>I am content</h3>
      </CollapseItem>
      <CollapseItem name="b">
        <template #title> I am title2 </template>
        I am content2
      </CollapseItem>
      <CollapseItem name="c" disabled>
        <template #title> I am title3 </template>
        I am content3
      </CollapseItem>
      <CollapseItem title="hello vue" name="d">
        <img src="./assets/vue.svg" alt="" />
      </CollapseItem>
    </Collapse>
  </div>
  <br /><br />
  <div>
    <Icon icon="thumbs-up" size="2xl" type="success" />
    <Icon icon="arrow-up" size="2xl" color="red" />
  </div>
  <br /><br />
  <div>
    <Link href="https://baidu.com" type="danger"
      >跳转百度
      <Icon icon="thumbs-up" type="info" />
    </Link>
    <Link href="https://jd.com" target="_blank" type="info" disabled
      >跳转京东</Link
    >
    <Link type="success" href="https://....." underline="always"
      >跳转饿了么
    </Link>
    <Link href="https://meituan.com" underline="hover">跳转美团</Link>
  </div>
  <br /><br />
  <!-- {{ openedValue }} -->
  <!-- <div>
    <Alert show-icon title="primary" description="你好Vue" />
    <Alert type="warning" @close="handleClose" title="warning" />
    <Alert type="info" @close="handleClose" title="info" />
    <Alert type="success" title="success" />
    <Alert type="error" title="error"> </Alert>
    <br />
    <Alert effect="dark" title="primary" />
    <Alert type="warning" effect="dark" close-text="关闭" title="warning" />
    <Alert type="info" effect="dark" center title="info" />
    <Alert type="success" effect="dark" show-icon title="success">
      hello I am bik
    </Alert>
    <Alert type="error" effect="dark" show-icon title="error" />
  </div> -->
  <br /><br />
  <div>
    <Tooltip ref="tooltipRef" placement="right">
      <img src="./assets/vue.svg" alt="" />
      <template #content>
        <h1>hello vue</h1>
      </template>
    </Tooltip>
  </div>
  <br /><br />
  <div>
    <Dropdown :menu-options="options">hello world </Dropdown>
  </div>
  <br /><br />
  <!-- <div>
    <Message message="hello next">hello react</Message>
  </div> -->
  <br /><br />
  <div>
    <Input
      :model-value="text"
      @change="handleChange"
      @input="handleInput"
      @update:model-value="handleUpdate"
    />
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { h, onMounted, ref } from "vue";
import Button from "./components/Button/Button.vue";
import Collapse from "./components/Collapse/Collapse.vue";
import CollapseItem from "./components/Collapse/CollapseItem.vue";
import Icon from "./components/Icon/Icon.vue";
import Link from "./components/Link/Link.vue";
import Alert from "./components/Alert/Alert.vue";
import Tooltip from "./components/Tooltip/Tooltip.vue";
// import Dropdown from "./components/Dropdown/Dropdown.vue";
import Message from "./components/Message/Message.vue";
import { createMessage } from "./components/Message/methods.ts";
import Dropdown from "./components/Dropdown/Dropdown.tsx";
import type { TooltipInstance } from "./components/Tooltip/types";
import type { MenuOption } from "./components/Dropdown/types";
import Input from "./components/Input/Input.vue";

const openedValue = ref([]);

const tooltipRef = ref<TooltipInstance | null>(null);

const options: MenuOption[] = [
  { key: 1, label: h("b", "this is bold") },
  // { key: 1, label: "item1" },
  { key: 2, label: "item2", disabled: true },
  { key: 3, label: "item3", divided: true },
  { key: 4, label: "item4" },
];
const handleActiveNames = () => {};
// const test = (e) => {
//   console.log("点击事件");
// };

const open = () => {
  tooltipRef.value?.show();
};
const close = () => {
  tooltipRef.value?.hide();
};

// const handleItem = (item: MenuOption) => {
//   console.log("监听到点击");
// };

const text = ref();

const handleChange = (value: string) => {
  console.log("change发生变化", value);
};
const handleInput = (value: string) => {
  console.log("input发生变化");
};
const handleUpdate = (value: string) => {
  text.value = value;
};

onMounted(() => {
  createMessage({
    message: "hello vue",
    showClose: true,
    type: "danger",
    duration: 3000,
  });
  const instance2 = createMessage({
    message: "hello java",
    showClose: true,
    type: "success",
  });
  createMessage({ message: "hello react", showClose: true, type: "warning" });

  setTimeout(() => {
    instance2.destroy();
  }, 4000);
});
</script>

<style scoped></style>
