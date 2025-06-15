<template>
  <div>
    <Switch v-model="value1" />
    <Switch v-model="value2" active-color="green" inactive-color="red" />
  </div>
</template>
<script setup>
import Switch from "@/components/Switch/Switch.vue";
import { ref } from "vue";
const value1 = ref(true);
const value2 = ref(true);
</script>
