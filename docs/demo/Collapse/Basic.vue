<template>
  <Collapse v-model="activeNames" accordion>
    <CollapseItem name="1" title="标题1">
      <p>内容区域1</p>
    </CollapseItem>
    <CollapseItem name="2" title="标题2">
      <p>内容区域2</p>
    </CollapseItem>
  </Collapse>
</template>

<script setup>
import { ref } from "vue";

const activeNames = ref(["1"]);
</script>
