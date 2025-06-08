<template>
  <Button @click="open('info')" type="info"> 创建多条消息 </Button>
  <Button @click="closeAllMessage">关闭所有消息</Button>
</template>
<script setup lang="ts">
import Button from "../../../src/components/Button/Button.vue";
import {
  createMessage,
  closeAll,
} from "../../../src/components/Message/methods";
const open = (type) => {
  createMessage({
    message: "message消息提示1",
    duration: 0,
  });
  createMessage({
    message: "message消息提示2",
    duration: 0,
  });
  createMessage({
    message: "message消息提示3",
    duration: 0,
  });
  createMessage({
    message: "message消息提示4",
    duration: 0,
  });
  createMessage({
    message: "message消息提示5",
    duration: 0,
  });
};
const closeAllMessage = () => {
  closeAll();
};
</script>
