<template>
  <div>
    <Collapse v-model="activeNames">
      <CollapseItem name="1" title="标题1">
        <p>内容区域1</p>
      </CollapseItem>
      <CollapseItem name="2" title="标题2">
        <p>内容区域2</p>
      </CollapseItem>
    </Collapse>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Collapse from "../../../src/components/Collapse/Collapse.vue";
import CollapseItem from "../../../src/components/Collapse/CollapseItem.vue";

const activeNames = ref(["1"]);
</script>
