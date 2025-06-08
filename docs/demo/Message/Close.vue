<template>
  <Button @click="open('danger')" type="danger"> Danger </Button>
</template>

<script setup lang="ts">
import Button from "../../../src/components/Button/Button.vue";
import { createMessage } from "../../../src/components/Message/methods";
const open = (type) => {
  createMessage({
    message: "danger消息提示",
    showClose: true,
    duration: 0,
    type: type,
  });
};
</script>
