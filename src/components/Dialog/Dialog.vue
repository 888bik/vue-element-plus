<template>
  <div class="bk-dialog-mask" v-show="isVisible">
    <div
      class="bk-dialog-wrapper"
      ref="dialogWrapperRef"
      :style="{ top: `${dialogTop}px`, left: `${dialogLeft}px` }"
    >
      <div
        class="bk-dialog__header"
        :class="{ 'is-draggable': draggable }"
        ref="headerRef"
        @mousedown="startDraggle"
      >
        <span>{{ title }}</span>
        <!-- 右边的x -->
        <Icon icon="xmark" class="bk-dialog__right-close" />
      </div>
      <div class="bk-dialog__content">
        <slot />
      </div>
      <div class="bk-dialog__footer">
        <slot name="footer">
          <Button class="bk-dialog__cancelBtn" type="info" @click="clickCancel"
            >Cancel</Button
          >
          <Button
            class="bk-dialog__confirmBtn"
            type="primary"
            @click="clickConfirm"
            >Confirm</Button
          >
        </slot>
      </div>
    </div>
  </div>
  offsetX : {{ offsetX }} offsetY : {{ offsetY }} dialogLeft :
  {{ dialogLeft }} dialogTop : {{ dialogTop }}
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import Button from "../Button/Button.vue";
import Icon from "../Icon/Icon.vue";
import type { DialogEmits, DialogProps } from "./types";

defineOptions({
  name: "BkDialog",
});

const props = defineProps<DialogProps>();
const emits = defineEmits<DialogEmits>();
let isDragging = false;
const headerRef = ref<HTMLElement | null>(null);
const dialogWrapperRef = ref<HTMLElement | null>(null);

//用户记录dialog时左上角的位置
const dialogLeft = ref(0);
const dialogTop = ref(0);
let offsetX = 0;
let offsetY = 0;

const isVisible = ref(props.visible);

watch(
  () => props.visible,
  (newValue) => {
    isVisible.value = newValue;
    if (newValue) {
      calculateInitialPosition();
    }
  }
);

// 计算初始居中位置
const calculateInitialPosition = () => {
  if (!dialogWrapperRef.value) return;

  // 获取 Dialog 的宽度和高度
  const dialogWidth = dialogWrapperRef.value.offsetWidth;
  const dialogHeight = dialogWrapperRef.value.offsetHeight;

  // 计算居中位置
  dialogLeft.value = (window.innerWidth - dialogWidth) / 2;
  dialogTop.value =
    (window.innerHeight - dialogHeight) / 2 - (props.center ? 0 : 250);
};

const clickCancel = () => {
  emits("visible-change", false);
};
const clickConfirm = () => {
  emits("visible-change", false);
};

const startDraggle = (e: MouseEvent) => {
  isDragging = true;
  offsetX = e.clientX - dialogLeft.value;
  offsetY = e.clientY - dialogTop.value;
};

const handleDragging = (e: MouseEvent) => {
  // if (!props.draggable) return;
  if (isDragging) {
    dialogTop.value = e.clientY - offsetY;
    dialogLeft.value = e.clientX - offsetX;
  }
};

const stopDraggle = () => {
  isDragging = false;
};

onMounted(() => {
  window.addEventListener("mousemove", handleDragging);
  window.addEventListener("mouseup", stopDraggle);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", handleDragging);
  window.removeEventListener("mouseup", startDraggle);
});
</script>

<style scoped></style>
