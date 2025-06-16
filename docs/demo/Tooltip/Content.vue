<template>
  <Tooltip>
    <template #content> multiple lines<br />second line </template>
    <Button>Top center</Button>
  </Tooltip>
</template>
<script setup>
import Tooltip from "@/components/Tooltip/Tooltip.vue";
import Button from "@/components/Button/Button.vue";
</script>
