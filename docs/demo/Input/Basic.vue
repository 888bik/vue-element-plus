<template>
  <Input v-model="test" placeholder="基础文本框，请输入" />
  <span>{{ test }}</span>
</template>

<script setup>
import { ref } from "vue";
import Input from "../../../src/components/Input/Input.vue";
const test = ref("");
</script>
