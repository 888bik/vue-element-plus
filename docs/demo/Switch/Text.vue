<template>
  <div>
    <Switch v-model="value1" activeText="on" inactiveText="off"></Switch>
    <Switch
      v-model="value2"
      activeText="开"
      inlinePrompt
      inactiveText="关"
    ></Switch>
  </div>
</template>
<script setup>
import Switch from "@/components/Switch/Switch.vue";
import { ref } from "vue";
const value1 = ref(true);
const value2 = ref(true);
</script>
