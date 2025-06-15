<template>
  <div>
    <Switch v-model="rightValue" :activeValue="1" :inactiveValue="0"></Switch>
    <p>{{ rightValue }}</p>
  </div>
</template>
<script setup>
import Switch from "@/components/Switch/Switch.vue";
import { ref } from "vue";
const rightValue = ref(1);
</script>
