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
    <slot />
  </a>
</template>

<script setup lang="ts">
import type { LinkInstance, linkProps } from "./type";
import "./style.scss";
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
  if (props.underline === "hover") {
    return {};
  }
});

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
