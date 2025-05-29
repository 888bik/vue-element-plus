<template>
  <div class="bk-collapse-item" :class="{ 'is-disabled': disabled }">
    <div
      class="bk-collapse-item__header"
      :class="{ 'is-disabled': disabled, 'is-active': isActive }"
      :id="`item-header-${name}`"
      @click="handleClick"
    >
      <slot name="title">{{ title }}</slot>
      <Icon icon="angle-right" class="header-angle" />
    </div>

    <Transition name="slide" v-on="transitionEvents">
      <div class="bk-collapse-item__wrapper" v-show="isActive">
        <div class="bk-collapse-item__content" :id="`item-content-${name}`">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";
import { collapseContextKey, type CollapseItemProps } from "./types";
import Icon from "../Icon/Icon.vue";

defineOptions({
  name: "BkCollapseItem",
});
//获取父组件提供的数据,这里因为用到了插槽,Collapse不是很方便将属性传递给子组件,所以用provider和inject
const collapseContext = inject(collapseContextKey);

const props = defineProps<CollapseItemProps>();

const isActive = computed(() =>
  collapseContext?.activeNames.value.includes(props.name)
);

const handleClick = () => {
  if (props.disabled) return;
  //将接收的name值传递给父组件
  collapseContext?.handleItemClick(props.name);
};
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = "0px";
    el.style.overflow = "hidden";
  },
  enter(el) {
    el.style.height = `${el.scrollHeight}px`;
  },
  afterEnter(el) {
    el.style.height = "";
    el.style.overflow = "";
  },
  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`;
    el.style.overflow = "hidden";
  },
  leave(el) {
    el.style.height = "0px";
  },
  afterLeave(el) {
    el.style.height = "";
    el.style.overflow = "";
  },
};
</script>

<style lang="scss" scoped></style>
