<template>
  <div>
    <Tooltip ref="tooltipRef" placement="right">
      <h2>hello vue</h2>
      <template #content>
        <h1>hello vue</h1>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Tooltip from "../../../src/components/Tooltip/Tooltip.vue";
const tooltipRef = ref();
</script>

<style scoped></style>
