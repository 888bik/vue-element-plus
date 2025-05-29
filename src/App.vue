<template>
  <div>
    <Button type="info" circle>info</Button>
    <Button type="danger" plain>danger</Button>
    <Button type="success">success</Button>
    <Button type="warning">warning</Button>
    <Button size="large" round>large</Button>
    <Button size="small">small</Button>
  </div>
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
  <div>
    <Icon icon="thumbs-up" size="2xl" type="success" />
    <Icon icon="arrow-up" size="2xl" color="red" />
  </div>
  <!-- {{ openedValue }} -->
</template>

<script setup>
import { ref } from "vue";
import Button from "./components/Button/Button.vue";
import Collapse from "./components/Collapse/Collapse.vue";
import CollapseItem from "./components/Collapse/CollapseItem.vue";
import Icon from "./components/Icon/Icon.vue";

const handleActiveNames = (e) => {
  // console.log(e);
};
const openedValue = ref([]);
</script>

<style scoped></style>
