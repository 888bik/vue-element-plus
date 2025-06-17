<template>
  <div>
    <Select
      v-model="test"
      placeholder="请选择"
      clearable
      remote
      filterable
      :remote-method="handleFetch"
    ></Select>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Select from "@/components/Select/Select.vue";
const handleFetch = async (query) => {
  if (!query) return Promise.resolve([]);
  const res = await fetch(
    `https://api.github.com/search/repositories?q=${query}`
  );
  const { items } = await res.json();
  return items
    .slice(0, 10)
    .map((item) => ({ label: item.name, value: item.node_id }));
};
const test = ref("1");
</script>
