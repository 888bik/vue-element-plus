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
    <Collapse>
      <CollapseItem title="I am title" name="a">
        <h3>I am content</h3>
      </CollapseItem>
      <CollapseItem name="b">
        <template #title> I am title2 </template>
        I am content2
      </CollapseItem>
      <CollapseItem title="hello vue">
        <img src="./assets/vue.svg" alt="" />
      </CollapseItem>
    </Collapse>
  </div>
</template>

<script setup>
import Button from "./components/Button/Button.vue";
import Collapse from "./components/Collapse/Collapse.vue";
import CollapseItem from "./components/Collapse/CollapseItem.vue";
</script>

<style scoped></style>
