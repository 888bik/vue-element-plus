<template>
  <div>
    <Tooltip ref="tooltipRef" placement="right">
      hover me
      <template #content>
        <h1>hello vue</h1>
      </template>
    </Tooltip>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Tooltip from "@/components/Tooltip/Tooltip.vue";
const tooltipRef = ref();
</script>

<style scoped></style>
