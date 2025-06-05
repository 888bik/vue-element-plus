<template>
  <Transition name="fade">
    <div
      class="bk-alert"
      :class="{
        [`bk-alert--${type}`]: type,
        'is-light': effect === 'light',
        'is-dark': effect === 'dark',
      }"
      v-if="isVisible"
    >
      <div class="bk-alert__content-wrapper" :class="{ 'is-center': center }">
        <!-- 图标 -->
        <div v-if="showIcon" class="icon">
          <template v-if="type === 'info'"> <InfoIcon /> </template>
          <template v-else-if="type === 'primary'"><PrimaryIcon /> </template>
          <template v-else-if="type === 'error'"><ErrorIcon /> </template>
          <template v-else-if="type === 'success'"><SuccessIcon /></template>
          <template v-else="type === 'warning'"><WarningIcon /> </template>
        </div>
        <!-- 内容区域 -->
        <div class="bk-alert__content">
          <!-- 标题 -->
          <span class="bk-alert__title" v-if="title">
            {{ title }}
          </span>

          <template v-if="$slots.default || description">
            <div class="bk-alert__description">
              <slot />
              {{ description }}
            </div>
          </template>
        </div>
      </div>

      <!-- 关闭按钮 -->
      <div class="bk-alert__close-btn" v-if="closeable" @click="handleClose">
        <template v-if="closeText">
          {{ closeText }}
        </template>
        <template v-else>
          <CloseIcon />
        </template>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { alertProps } from "./type";
import CloseIcon from "../../assets/close.svg";
import InfoIcon from "../../assets/InfoIcon.svg";
import ErrorIcon from "../../assets/errorIcon.svg";
import PrimaryIcon from "../../assets/primaryIcon.svg";
import WarningIcon from "../../assets/warningIcon.svg";
import SuccessIcon from "../../assets/successIcon.svg";
import { ref } from "vue";
// import CloseIcon from "@/assets/close.svg";
// import ErrorIcon from "@/assets/errorIcon.svg";
// import PrimaryIcon from "@/assets/primaryIcon.svg";
// import SuccessIcon from "@/assets/successIcon.svg";
// import InfoIcon from "@/assets/InfoIcon.svg";

defineOptions({
  name: "BkAlert",
});

const emits = defineEmits<{ (e: "close", event: MouseEvent): void }>();

withDefaults(defineProps<alertProps>(), {
  effect: "light",
  closeable: true,
  center: false,
  type: "primary",
  showIcon: false,
});
//控制是否隐藏
const isVisible = ref(true);

const handleClose = (e: MouseEvent) => {
  emits("close", e);
  isVisible.value = false;
};
</script>

<style lang="scss" scoped></style>
