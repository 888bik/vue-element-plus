<template>
  <Transition name="bk-dialog-fade">
    <div class="bk-dialog-mask" v-show="isVisible" ref="dialogRef">
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
          <template v-if="$slots.header">
            <slot name="header" />
          </template>
          <template v-else>
            <span>{{ title }}</span>
            <Icon
              icon="xmark"
              class="bk-dialog__right-close"
              @click="handleClose"
            />
          </template>
        </div>

        <div class="bk-dialog__content">
          <slot />
        </div>

        <div class="bk-dialog__footer">
          <slot name="footer">
            <Button
              class="bk-dialog__cancelBtn"
              type="info"
              @click="clickCancel"
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
  </Transition>
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
const dialogRef = ref<HTMLBRElement>();

//用户记录dialog时左上角的位置
const dialogLeft = ref(0);
const dialogTop = ref(0);
let offsetX = 0;
let offsetY = 0;
// 保存关闭时的位置
const savedDialogLeft = ref(0);
const savedDialogTop = ref(0);

const isVisible = ref(props.visible);

watch(
  () => props.visible,
  (newValue) => {
    isVisible.value = newValue;
    if (newValue) {
      calculateInitialPosition();
      //dialog时禁止滚动
      document.body.style.overflow = "hidden";
    } else {
      //不存在时恢复滚动
      document.body.style.overflow = "";
    }
  }
);

// 计算初始居中位置
const calculateInitialPosition = () => {
  if (!dialogWrapperRef.value) return;

  // 获取 Dialog 的宽度和高度
  const dialogWidth = dialogWrapperRef.value.offsetWidth;
  const dialogHeight = dialogWrapperRef.value.offsetHeight;

  // 计算居中位置,如果有保存的位置,则使用上次关闭时保存的位置
  if (savedDialogLeft.value !== 0 || savedDialogTop.value !== 0) {
    dialogLeft.value = savedDialogLeft.value;
    dialogTop.value = savedDialogTop.value;
  } else {
    dialogLeft.value = (window.innerWidth - dialogWidth) / 2;
    dialogTop.value =
      (window.innerHeight - dialogHeight) / 2 - (props.center ? 0 : 250);
  }
};

const handleClose = () => {
  //保存当前的位置
  savedDialogLeft.value = dialogLeft.value;
  savedDialogTop.value = dialogTop.value;
  emits("visible-change", false);
};
const clickCancel = () => {
  handleClose();
  emits("cancel");
};
const clickConfirm = () => {
  handleClose();
  emits("confirm");
};

// 按下鼠标时触发
const startDraggle = (e: MouseEvent) => {
  if ((e.target as HTMLElement).closest(".bk-dialog__right-close")) return;
  isDragging = true;
  offsetX = e.clientX - dialogLeft.value;
  offsetY = e.clientY - dialogTop.value;
};

const handleDragging = (e: MouseEvent) => {
  if (!props.draggable) return;
  if (isDragging) {
    dialogTop.value = e.clientY - offsetY;
    dialogLeft.value = e.clientX - offsetX;
  }
};

const stopDraggle = () => {
  isDragging = false;
};

//点击dialog外边的区域时关闭
const clickOutside = (e: MouseEvent) => {
  if ((e.target as HTMLElement).closest(".bk-dialog-wrapper")) return;
  handleClose();
};

//按下esc键时关闭
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key == "Escape" && isVisible) {
    handleClose();
  }
};

onMounted(() => {
  document.addEventListener("mousemove", handleDragging);
  document.addEventListener("mouseup", stopDraggle);
  dialogRef.value?.addEventListener("click", clickOutside);
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("mousemove", handleDragging);
  document.removeEventListener("mouseup", stopDraggle);
  dialogRef.value?.removeEventListener("click", clickOutside);
  document.removeEventListener("keydown", handleKeydown);
});

defineExpose({
  ref: dialogRef,
});
</script>

<style scoped></style>
