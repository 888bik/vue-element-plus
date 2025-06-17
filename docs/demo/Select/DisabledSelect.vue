<template>
  <div>
    <Select
      v-model="test"
      placeholder="请选择"
      :options="options"
      disabled
    ></Select>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Select from "@/components/Select/Select.vue";
const options = [
  { label: "麻辣烫", value: "1" },
  { label: "小龙虾", value: "2" },
  { label: "汤圆", value: "3" },
  { label: "饺子", value: "4" },
];

const test = ref("1");
</script>
