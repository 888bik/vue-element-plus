<template>
  <Transition :name="transitionName">
    <div
      class="bk-message"
      v-show="isVisible"
      ref="messageRef"
      :style="cssStyle"
      :class="{ [`bk-message--${type}`]: type, 'is-close': showClose }"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="bk-message__content">
        <slot>
          <RenderVNode :v-node="message" v-if="message" />
        </slot>
      </div>

      <div
        class="bk-message__close"
        v-if="showClose"
        :class="{ [`bk-message__close--${type}`]: type }"
      >
        <Icon icon="xmark" @click.stop="handleClose" />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import RenderVNode from "../Common/RenderVNode";
import type { MessageProps } from "./types";
import { getLastBottomOffset } from "./methods";
import useEventListener from "../../hooks/useEventListener";
import Icon from "../Icon/Icon.vue";

defineOptions({
  name: "BkMessage",
});
const props = withDefaults(defineProps<MessageProps>(), {
  type: "info",
  duration: 3000,
  showClose: false,
  offset: 20,
  transitionName: "fade-up",
});
const isVisible = ref(false);

const messageRef = ref<HTMLDivElement>();
//div内容的高度
const contentHeight = ref(0);

//上一个元素底部距离上上个元素的距离,第一个为0
const lastBottomOffset = computed(() => getLastBottomOffset(props.id));

//当前元素顶部的距离上一个元素的距离 + 自定义要偏移的距离(即想要让两个message之间距离多少,默认20px)
const currentTopOffset = computed(() => lastBottomOffset.value + props.offset);

//当前元素底部距离上一个元素的距离(也就是下一个元素要偏移的距离)
const currentBottomOffset = computed(
  () => contentHeight.value + currentTopOffset.value
);

const cssStyle = computed(() => {
  return {
    top: currentTopOffset.value + "px",
    zIndex: props.zIndex,
  };
});

let timer: any;
const startTimer = () => {
  if (props.duration === 0) return;
  timer = setTimeout(() => {
    isVisible.value = false;
  }, props.duration);
};

const clearTimer = () => {
  clearTimeout(timer);
};

const handleClose = () => {
  isVisible.value = false;
};

const keyDown = (e: Event) => {
  const event = e as KeyboardEvent;
  if (event.code === "Escape") {
    isVisible.value = false;
  }
};
useEventListener(document, "keydown", keyDown);

watch(isVisible, (newValue) => {
  if (!newValue) {
    props.onDestroy();
  }
});

onMounted(async () => {
  isVisible.value = true;
  await nextTick();
  contentHeight.value = messageRef.value!.getBoundingClientRect().height;
  startTimer();
});

// function updateContentHight() {
//   contentHeight.value = messageRef.value!.getBoundingClientRect().height;
// }
defineExpose({
  currentBottomOffset,
  isVisible,
});
</script>

<style scoped></style>
