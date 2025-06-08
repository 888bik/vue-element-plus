<template>
  <Transition name="fade">
    <div
      class="bk-alert"
      :class="{
        [`bk-alert--${type}`]: type,
        'is-light': effect === 'light',
        'is-dark': effect === 'dark',
        'is-center': center,
      }"
      v-if="isVisible"
    >
      <div class="bk-alert__content-wrapper">
        <!-- 类型图标 -->
        <template v-if="showIcon">
          <Icon :icon="showAlertIcon()" />
        </template>

        <!-- 内容区域 -->
        <div class="bk-alert__content">
          <!-- 标题 -->
          <span class="bk-alert__title" v-if="title">
            <slot name="title">{{ title }}</slot>
          </span>

          <template v-if="$slots.default || description">
            <div class="bk-alert__description">
              <slot>{{ description }}</slot>
            </div>
          </template>
        </div>
      </div>

      <!-- 关闭按钮 -->
      <template v-if="closeable">
        <!-- 自定义的关闭文本 -->
        <div class="bk-alert__close-btn" @click="handleClose" v-if="closeText">
          {{ closeText }}
        </div>
        <!-- 默认的图标关闭 -->
        <Icon
          icon="xmark"
          v-else
          @click="handleClose"
          class="bk-alert__close-btn"
        ></Icon>
      </template>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { alertProps } from "./type";
import { ref } from "vue";
import Icon from "../Icon/Icon.vue";

defineOptions({
  name: "BkAlert",
});

const emits = defineEmits<{ (e: "close", event: MouseEvent): void }>();

const props = withDefaults(defineProps<alertProps>(), {
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

// 根据警报类型返回相应的图标名称
const showAlertIcon = () => {
  switch (props.type) {
    case "error":
      return "circle-xmark";
    case "primary":
    case "info":
      return "circle-info";
    case "success":
      return "circle-check";
    case "warning":
      return "circle-exclamation";
    default:
      return "circle-info";
  }
};
</script>

<style lang="scss" scoped></style>
