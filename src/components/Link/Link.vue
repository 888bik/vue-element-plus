<template>
  <a
    :href="href"
    class="bk-link"
    :target="target"
    :class="computedClass"
    ref="_ref"
    :style="customStyles"
    @click="handleClick"
  >
    <!-- <span v-if="icon && iconPosition === 'left'">
      <Icon :icon="icon" />
    </span> -->
    <slot />
    <slot name="icon" />
    <!-- <span v-if="icon && iconPosition === 'right'">
      <Icon :icon="icon" color="" />
    </span> -->
  </a>
</template>

<script setup lang="ts">
import type { LinkInstance, linkProps } from "./types";
import { computed, onMounted, ref } from "vue";

defineOptions({
  name: "BkLink",
});

const props = defineProps<linkProps>();

const emits = defineEmits<{ (e: "click", event: MouseEvent): void }>();

const customStyles = computed(() => {
  if (props.underline === "always" || props.underline === true) {
    return {
      textDecoration: "underline",
    };
  }
});

//动态添加class
const computedClass = computed(() => ({
  [`bk-link--${props.type}`]: props.type,
  "is-disabled": props.disabled,
  "bk-link--underline":
    props.underline === true || props.underline === "always",
  "bk-link--hover-underline": props.underline === "hover",
}));

const _ref = ref<LinkInstance>();

//事件处理
const handleClick = (e: MouseEvent) => {
  if (props.disabled) {
    e.preventDefault();
    e.stopPropagation();
    return;
  }
  if (typeof props.onClick === "function") {
    props.onClick(e);
  }
  emits("click", e);
};

//阻止处于禁用状态下的交互
onMounted(() => {
  document.querySelectorAll("a.is-disabled").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  });
});
</script>

<style lang="scss" scoped></style>
