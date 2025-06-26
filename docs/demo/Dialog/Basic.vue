<template>
  <div>
    <Button @click="openDialog">openDialog</Button>
    <Dialog
      title="Tips"
      :visible="visible"
      @visible-change="handleVisibleUpdate"
    >
      <strong>hello dialog</strong>
    </Dialog>
  </div>
</template>

<script setup>
import Dialog from "@/components/Dialog/Dialog.vue";
import Button from "@/components/Button/Button.vue";
import { ref } from "vue";
const visible = ref(false);
const openDialog = () => {
  visible.value = true;
};
const handleVisibleUpdate = (newValue) => {
  visible.value = newValue;
};
</script>
