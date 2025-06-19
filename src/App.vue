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
  <!-- 图标 -->
  <div>
    <Icon icon="thumbs-up" size="2xl" type="success" />
    <Icon icon="arrow-up" size="2xl" color="red" />
  </div>
  <br /><br />
  <!-- 链接 -->
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
  <!-- alert -->
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
    <Alert type="error" effect="dark" show-icon title="error" center />
  </div> -->
  <br /><br />
  <!-- 文字提示 -->
  <div>
    <Tooltip ref="tooltipRef" placement="right" trigger="click">
      <img src="./assets/vue.svg" alt="" />
      <template #content>
        <!-- <h1>hello vue</h1> -->
        hello react
      </template>
    </Tooltip>
  </div>
  <br /><br />
  <!-- 下拉菜单 -->
  <div>
    <Dropdown :menu-options="options" placement="right">hello world </Dropdown>
  </div>
  <br /><br />
  <!-- 输入框 -->
  <div>
    <Input
      v-model:model-value="text"
      @change="handleChange"
      @input="handleInput"
      @update:model-value="handleUpdate"
    />
    {{ text }}
  </div>
  <br /><br />
  <!-- <div>
    <div>
      <Switch model-value :inline-prompt="false" />
    </div>
    <div>
      <Switch
        model-value
        size="large"
        active-text="开开开开"
        inactive-text="关"
      />
    </div>
    <div>
      <Switch model-value size="small" />
    </div>
    <div>
      <Switch model-value active-color="orange" inactive-color="red" />
    </div>
  </div> -->
  <br /><br />
  <div>
    <Select
      :options="selectOptions"
      placeholder="基础选择器,请选择"
      model-value="1"
      placement="bottom"
      filterable
    >
    </Select>
  </div>
  <br /><br />
  <div>
    <Form :model="model" :rules="rules" ref="formRef">
      <FormItem label="email" prop="email">
        <template #label="{ label }">{{ label }} </template>
        <template #default>
          <Input v-model="model.email"></Input>
        </template>
      </FormItem>
      <FormItem label="password" prop="password">
        <template #default>
          <Input v-model:model-value="model.password" show-password clearable />
        </template>
      </FormItem>
      <FormItem label="confirmPwd" prop="confirmPwd">
        <template #default="{ validate }">
          <!-- 这里validate需要指定trigger,否则input会将event传递进去 -->
          <input
            type="password"
            v-model="model.confirmPwd"
            @blur="validate('blur')"
          />
        </template>
      </FormItem>
      <Button @click.prevent="submit">提交</Button>
      <Button @click.prevent="() => formRef?.resetFields()" type="primary"
        >重置</Button
      >
      <Button @click.prevent="() => formRef?.clearValidateAll()" type="info"
        >清除</Button
      >
    </Form>
  </div>
</template>

<script setup lang="ts">
import { h, onMounted, reactive, ref } from "vue";
import Button from "./components/Button/Button.vue";
import Collapse from "./components/Collapse/Collapse.vue";
import CollapseItem from "./components/Collapse/CollapseItem.vue";
import Icon from "./components/Icon/Icon.vue";
import Link from "./components/Link/Link.vue";
import Alert from "@/components/Alert/Alert.vue";
import Tooltip from "./components/Tooltip/Tooltip.vue";
import Dropdown from "./components/Dropdown/Dropdown.vue";
import { createMessage } from "./components/Message/methods.ts";
import Input from "./components/Input/Input.vue";
import Switch from "./components/Switch/Switch.vue";
import Select from "./components/Select/Select.vue";
// import Dropdown from "./components/Dropdown/Dropdown.tsx";
import Form from "./components/Form/Form.vue";
import FormItem from "./components/Form/FormItem.vue";
import type { TooltipInstance } from "./components/Tooltip/types";
import type { MenuOption } from "./components/Dropdown/types";
import type { SelectOption } from "./components/Select/types.ts";
import type { FormInstance, FormRules } from "./components/Form/types.ts";

const openedValue = ref([]);

const tooltipRef = ref<TooltipInstance | null>(null);

const options: MenuOption[] = [
  { key: 1, label: h("b", "this is bold") },
  // { key: 1, label: "item1" },
  { key: 2, label: "item2", disabled: true },
  { key: 3, label: "item3", divided: true },
  { key: 4, label: "item4" },
];
const selectOptions: SelectOption[] = [
  {
    label: "item1",
    value: "1",
    disabled: true,
  },
  {
    label: "item2",
    value: "2",
  },
  {
    label: "item3",
    value: "3",
  },
  {
    label: "java",
    value: "4",
  },
  {
    label: "vue",
    value: "5",
  },
];
const customRender = (option: SelectOption) => {
  return h("div", { className: "abc" }, [
    h("span", option.label),
    h("b", option.value),
  ]);
};
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
// const handleClose = () => {
//   console.log("alert关闭");
// };

const text = ref("");
const formRef = ref<FormInstance>();

const handleChange = (value: string) => {
  console.log("change发生变化", value);
};
const handleInput = (value: string) => {
  console.log("input发生变化", value);
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

const model = reactive({
  email: "123",
  password: "",
  confirmPwd: "",
});
const rules: FormRules = {
  email: [{ type: "email", required: true, trigger: "blur" }],
  password: [{ type: "string", required: true, trigger: "blur" }],
  // test: [{ type: "string", trigger: "input" }],
  confirmPwd: [
    { type: "string", required: true, trigger: "blur" },
    {
      validator: (rule, value) => value === model.password,
      trigger: "blur",
      message: "两个密码必须相同",
    },
  ],
};
const submit = async () => {
  try {
    await formRef.value?.validate();
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped></style>
