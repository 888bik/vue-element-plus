<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <!-- 单独的disabled属性是为了便于禁用绑定到button上的事件，
  比如：点击事件。class里的is-disabled是为了给按钮添加禁用的样式。 -->
  <button
    ref="_ref"
    class="bk-button"
    :class="{
      [`bk-button--${type}`]: type,
      [`bk-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <Icon icon="spinner" spin v-if="loading" />

    <span v-if="$slots.default">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { buttonProps, ButtonInstance } from "./types.ts";
import Icon from "../Icon/Icon.vue";

const _ref = ref<ButtonInstance>();

defineOptions({
  name: "BkButton",
});
defineProps<buttonProps>();
defineExpose({
  ref: _ref,
});
</script>

<style scoped></style>
