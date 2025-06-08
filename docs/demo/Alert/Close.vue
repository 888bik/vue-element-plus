<template>
  <Alert title="success alert" type="success" />
  <Alert title="info alert" type="info" :closable="false" />
  <Alert title="warning" type="warning" close-text="Gotcha" />
</template>
<script setup lang="ts">
import Alert from "../../../src/components/Alert/Alert.vue";
</script>
