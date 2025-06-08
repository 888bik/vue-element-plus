<template>
  <div>
    <Button>default</Button>
    <Button type="success">success</Button>
    <Button type="danger">danger</Button>
    <Button type="info">info</Button>
    <Button type="warning">warning</Button>
    <Button type="primary">primary</Button>
  </div>
  <br />
  <div>
    <Button>default</Button>
    <Button type="success" plain>success</Button>
    <Button type="danger" plain>danger</Button>
    <Button type="info" plain>info</Button>
    <Button type="warning" plain>warning</Button>
    <Button type="primary" plain>primary</Button>
  </div>
  <br />
  <div>
    <Button round>default</Button>
    <Button type="success" round>success</Button>
    <Button type="danger" round>danger</Button>
    <Button type="info" round>info</Button>
    <Button type="warning" round>warning</Button>
    <Button type="primary" round>primary</Button>
  </div>
</template>

<script setup lang="ts">
import Button from "../../../src/components/Button/Button.vue";
</script>

<style scoped></style>
