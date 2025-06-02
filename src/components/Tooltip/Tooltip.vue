<template>
  <div class="bk-tooltip" v-on="outerEvents" ref="popperContainerNode">
    <!-- 触发节点 -->
    <div class="bk-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot />
    </div>
    <!-- 弹出层 -->
    <Transition :name="transition">
      <div class="bk-tooltip__popper" ref="popperNode" v-show="isOpen">
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, reactive, ref, watch } from "vue";
import "./style.scss";
import type { TooltipEmits, TooltipInstance, TooltipProps } from "./types";
import { createPopper, type Instance, type Options } from "@popperjs/core";
import useClickOutside from "../../hooks/useClickOutside";
import { debounce } from "lodash-es";
defineOptions({
  name: "BkTooltip",
});
const props = withDefaults(defineProps<TooltipProps>(), {
  trigger: "hover",
  placement: "right",
  manual: false,
  transition: "fade",
  openDelay: 0,
  closeDelay: 0,
});

const emits = defineEmits<TooltipEmits>();

const isOpen = ref(false);
const triggerNode = ref<HTMLElement>();
//popperJs会根据triggerNode的位置计算并调整弹出层的位置
const popperNode = ref<HTMLElement>();
let popperInstance: Instance | null = null;
//创建动态事件events
let events: Record<string, any> = reactive({});
let outerEvents: Record<string, any> = reactive({});
//包裹触发节点和弹出层
const popperContainerNode = ref<HTMLElement>();
//popper配置
const popperOptions = computed<Partial<Options>>(() => {
  return {
    placement: props.placement,
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 9],
        },
      },
    ],
    ...props.popperOptions,
  };
});

const togglePopper = () => {
  if (isOpen.value) {
    closeFinal();
  } else {
    openFinal();
  }
};

const open = () => {
  isOpen.value = true;
  emits("visible-change", true);
};
const close = () => {
  isOpen.value = false;
  emits("visible-change", false);
};

//防抖优化
const debounceOpen = debounce(open, props.openDelay);
const debounceClose = debounce(close, props.closeDelay);
//细节处理:如果最后一次停在trigger触发区,将上一次的关闭事件取消
const openFinal = () => {
  debounceClose.cancel();
  debounceOpen();
};
const closeFinal = () => {
  debounceOpen.cancel();
  debounceClose();
};

//添加事件
const attachEvents = () => {
  if (props.trigger === "click") {
    events["click"] = togglePopper;
  } else if (props.trigger === "hover") {
    events["mouseenter"] = openFinal;
    outerEvents["mouseleave"] = closeFinal;
  }
};

//非手动模式才添加事件
if (!props.manual) {
  attachEvents();
}

useClickOutside(popperContainerNode, () => {
  if (props.trigger === "click" && isOpen.value && !props.manual) {
    closeFinal();
  }
  if (isOpen.value) {
    emits("click-outside", true);
  }
});

watch(
  () => props.manual,
  (isManual) => {
    //手动模式将事件取消
    if (isManual) {
      events = {};
      outerEvents = {};
    } else {
      attachEvents();
    }
  }
);

watch(
  () => props.trigger,
  (newTrigger, oldTrigger) => {
    //trigger发生变化时先清除事件
    if (newTrigger !== oldTrigger) {
      events = {};
      //再次添加事件
      attachEvents();
    }
  }
);

//监听popper浮层的显示变化
watch(
  isOpen,
  (newValue) => {
    //当newValue为true时才常见popper,否则销毁
    if (newValue) {
      if (triggerNode.value && popperNode.value) {
        popperInstance = createPopper(
          triggerNode.value,
          popperNode.value,
          popperOptions.value
        );
      } else {
        popperInstance?.destroy();
      }
    }
  },
  { flush: "post" }
);

defineExpose<TooltipInstance>({
  show: openFinal,
  hide: closeFinal,
});

onUnmounted(() => {
  popperInstance?.destroy();
});
</script>

<style lang="scss" scoped></style>
