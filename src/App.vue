<template>
  <!-- 按钮案例 -->
  <div>
    <Button type="info" circle disabled>info </Button>
    <Button type="danger" plain loading> danger </Button>
    <Button type="success" loading>success</Button>
    <Button type="warning">warning</Button>
    <Button size="large" round>large</Button>
    <Button size="small">small</Button>
  </div>
  <br /><br />
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
  <div>
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
      <!-- <h1>I am zsd</h1> -->
      hello I am bik
    </Alert>
    <Alert type="error" effect="dark" show-icon title="error" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Button from "./components/Button/Button.vue";
import Collapse from "./components/Collapse/Collapse.vue";
import CollapseItem from "./components/Collapse/CollapseItem.vue";
import Icon from "./components/Icon/Icon.vue";
import Link from "./components/Link/Link.vue";
import Alert from "./components/Alert/Alert.vue";

const openedValue = ref([]);

const handleActiveNames = (e) => {
  // console.log(e);
};
const test = (e) => {
  console.log("点击事件");
};
const handleClose = () => {
  console.log("监听事件点击");
};
</script>

<style scoped></style>
