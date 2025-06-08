<template>
  <Button @click="open('primary')" type="primary"> Primary </Button>
  <Button @click="open('success')" type="success"> Success </Button>
  <Button @click="open('info')" type="info"> Info </Button>
  <Button @click="open('warning')" type="warning"> warning </Button>
  <Button @click="open('danger')" type="danger"> Danger </Button>
</template>
<script setup lang="ts">
import Button from "../../../src/components/Button/Button.vue";
import { createMessage } from "../../../src/components/Message/methods";
const open = (type) => {
  createMessage({ message: "message消息提示", type });
};
</script>
