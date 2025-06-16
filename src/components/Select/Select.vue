<template>
  <div
    class="bk-select"
    :class="{ 'is-disabled': disabled }"
    @click="toggleDropdown"
    @mouseenter="states.mouseHover = true"
    @mouseleave="states.mouseHover = false"
  >
    <Tooltip
      ref="tooltipRef"
      manual
      :popper-options="popperOptions"
      :placement="placement"
      v-on:click-outside="controlDropdown(false)"
    >
      <!-- 输入框 -->
      <Input
        v-model="states.inputValue"
        :placeholder="placeholder"
        readonly
        ref="inputRef"
      >
        <template #suffix>
          <Icon
            icon="xmark"
            v-if="showClearIcon"
            @click.stop="handleClearClick"
            class="bk-input__clear"
            @mousedown.prevent="NOOP"
          />
          <Icon
            icon="angle-down"
            class="header-angle"
            v-else
            :class="{ 'is-active': isDropdownShow }"
          />
        </template>
      </Input>
      <!-- 列表选项 -->
      <template #content>
        <ul class="bk-select__menu">
          <template v-for="(item, index) in options" :key="index">
            <li
              class="bk-select__menu-item"
              :class="{
                'is-disabled': item.disabled,
                'is-selected': states.selectedOption?.value === item.value,
              }"
              :id="`select-item-${item.value}`"
              @click.stop="itemSelect(item)"
            >
              {{ item.label }}
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import Input from "../Input/Input.vue";
import Tooltip from "../Tooltip/Tooltip.vue";
import Icon from "../Icon/Icon.vue";
import type {
  SelectEmits,
  SelectOption,
  SelectProps,
  SelectStates,
} from "./types";
import type { TooltipInstance } from "../Tooltip/types";
import type { Ref } from "vue";
import type { InputInstance } from "../Input/types";

defineOptions({
  name: "BkSelect",
});

const findOption = (value: string) => {
  const option = props.options.find((option) => option.value === value);
  return option ? option : null;
};

const popperOptions: any = {
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 9],
      },
    },
    {
      name: "sameWidth",
      enabled: true,
      fn: ({ state }: { state: any }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
      },
      phase: "beforeWrite",
      requires: ["computeStyles"],
    },
  ],
};

const props = withDefaults(defineProps<SelectProps>(), {
  clearable: true,
});
const emits = defineEmits<SelectEmits>();

const isDropdownShow = ref(false);

const initialOption = findOption(props.modelValue);
// const innerValue = ref(initialOption ? initialOption.label : "");
//为了方便给选中的option动态添加类,创建一个state管理
const states = reactive<SelectStates>({
  inputValue: initialOption ? initialOption.label : "",
  selectedOption: initialOption,
  mouseHover: false,
});

const tooltipRef = ref() as Ref<TooltipInstance>;
const inputRef = ref() as Ref<InputInstance>;

const controlDropdown = (show: boolean) => {
  if (show) {
    tooltipRef.value.show();
  } else {
    tooltipRef.value.hide();
  }
  isDropdownShow.value = show;
  emits("visible-change", show);
};

const toggleDropdown = () => {
  if (props.disabled) return;
  if (isDropdownShow.value) {
    controlDropdown(false);
  } else {
    controlDropdown(true);
  }
};

/**
 * 监听option的点击
 * @param e 每个选项option
 */
const itemSelect = (e: SelectOption) => {
  //选项被禁用直接返回
  if (e.disabled) return;
  states.inputValue = e.label;
  states.selectedOption = e;
  emits("change", e.value);
  emits("update:modelValue", e.value);
  //点击后关闭
  controlDropdown(false);
  //关闭后保持input的聚焦状态
  inputRef.value.ref.focus();
};

const showClearIcon = computed(() => {
  //是否出现清除按钮的条件:1.输入框不为空 2.clearable为true 3.hover在输入框上 4.选择过选项
  return (
    states.inputValue.trim() !== "" &&
    props.clearable &&
    states.mouseHover &&
    states.selectedOption
  );
});
const handleClearClick = () => {
  //清除操作
  states.inputValue = "";
  states.selectedOption = null;
  //发生事件
  emits("clear");
  emits("update:modelValue", "");
  emits("change", "");
};
const NOOP = () => {};
</script>

<style scoped></style>
