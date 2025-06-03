<template>
  <div class="bk-dropdown">
    <Tooltip
      ref="tooltipRef"
      :trigger="trigger"
      :placement="placement"
      :popper-options="popperOptions"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      :manual="manual"
      @visible-change="visibleChange"
    >
      <slot />
      <template #content>
        <ul class="bk-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <!-- 分隔符,如果存在则显示 -->
            <li
              v-if="item.divided"
              role="separator"
              class="divided-placeholder"
            />
            <li
              class="bk-dropdown__item"
              :id="`bk-dropdown-${item.key}`"
              :class="{
                'is-disabled': item.disabled,
                'is-divided': item.divided,
              }"
              @click="itemClick(item)"
            >
              <!-- {{ item.label }} -->
              <!-- 扩展:可以添加VNode节点元素 -->
              <RenderVNode :v-node="item.label" />
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import "./style.scss";
import Tooltip from "../Tooltip/Tooltip.vue";
import type {
  DropdownEmits,
  DropdownInstance,
  DropdownProps,
  MenuOption,
} from "./types";
import { ref } from "vue";
import type { TooltipInstance } from "../Tooltip/types";
import RenderVNode from "../Common/RenderVNode";

defineOptions({
  name: "BkDropdown",
});
const props = withDefaults(defineProps<DropdownProps>(), {
  hideAfterClick: true,
});
const emits = defineEmits<DropdownEmits>();
const tooltipRef = ref<TooltipInstance>();

const itemClick = (item: MenuOption) => {
  if (item.disabled) {
    return;
  }
  emits("select", item);

  if (props.hideAfterClick) {
    tooltipRef.value?.hide();
  }
};

const visibleChange = (isVisible: boolean) => {
  emits("visible-change", isVisible);
};

defineExpose<DropdownInstance>({
  show: () => tooltipRef.value?.show(),
  hide: () => tooltipRef.value?.hide(),
});
</script>

<style scoped></style>
