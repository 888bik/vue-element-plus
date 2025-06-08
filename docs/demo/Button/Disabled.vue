<template>
  <div>
    <Button disabled>default</Button>
    <Button type="success" disabled>success</Button>
    <Button type="danger" disabled>danger</Button>
    <Button type="info" disabled>info</Button>
    <Button type="warning" disabled>warning</Button>
    <Button type="primary" disabled>primary</Button>
  </div>
  <br />
  <div>
    <Button disabled>default</Button>
    <Button type="success" plain disabled>success</Button>
    <Button type="danger" plain disabled>danger</Button>
    <Button type="info" plain disabled>info</Button>
    <Button type="warning" plain disabled>warning</Button>
    <Button type="primary" plain disabled>primary</Button>
  </div>
</template>

<script setup lang="ts">
import Button from "../../../src/components/Button/Button.vue";
</script>

<style scoped></style>
