<template>
  <Dropdown :menu-options="options" placement="top"> hello vue</Dropdown>
</template>

<script setup lang="ts">
import type { MenuOption } from "../../../src/components/Dropdown/types";
import Dropdown from "../../../src/components/Dropdown/Dropdown.vue";
import { h } from "vue";
const options: MenuOption[] = [
  // { key: 1, label: h("b", "this is bold") },
  { key: 2, label: "item2", disabled: true },
  { key: 3, label: "item3", divided: true },
  { key: 4, label: "item4" },
];
</script>

<style scoped></style>
