<template></template>

<script setup lang="ts">
import { onMounted } from "vue";
import { createMessage } from "../../../src/components/Message/methods";

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
