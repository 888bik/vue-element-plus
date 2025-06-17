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
        :placeholder="filteredPlaceholder"
        :readonly="!filterable || !isDropdownShow"
        ref="inputRef"
        @input="debounceOnFilter"
        @keydown="handleKeydown"
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
        <!-- 加载状态 -->
        <div class="bk-select__loading" v-if="states.loading">
          <Icon icon="spinner" spin />
        </div>
        <!-- 数据没有找到 -->
        <div
          class="bk-select__noData"
          v-else-if="filteredOption.length === 0 && filterable"
        >
          not march Data
        </div>
        <!-- 渲染列表 -->
        <ul class="bk-select__menu" v-else>
          <template v-for="(item, index) in filteredOption" :key="index">
            <li
              class="bk-select__menu-item"
              :class="{
                'is-disabled': item.disabled,
                'is-selected': states.selectedOption?.value === item.value,
                'is-highlighted': states.highlightIndex === index,
              }"
              :id="`select-item-${item.value}`"
              @click.stop="itemSelect(item)"
            >
              <!-- {{ item.label }} -->
              <RenderVNode
                :v-node="renderLabel ? renderLabel(item) : item.label"
              />
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import Input from "../Input/Input.vue";
import Tooltip from "../Tooltip/Tooltip.vue";
import { debounce, isFunction } from "lodash-es";
import Icon from "../Icon/Icon.vue";
import RenderVNode from "../Common/RenderVNode";
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

/**
 * 通过value找到对应的option
 * @param value option的value,要求唯一
 */
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
  options: () => [],
});
const emits = defineEmits<SelectEmits>();

const isDropdownShow = ref(false);

const initialOption = ref(findOption(props.modelValue));
watch(
  () => props.modelValue,
  (newValue) => {
    initialOption.value = findOption(newValue);
  }
);

// const innerValue = ref(initialOption ? initialOption.label : "");
//为了方便给选中的option动态添加类,创建一个state管理
const states = reactive<SelectStates>({
  inputValue: initialOption.value ? initialOption.value?.label : "",
  selectedOption: initialOption.value,
  mouseHover: false,
  loading: false,
  highlightIndex: -1,
});

const tooltipRef = ref() as Ref<TooltipInstance>;
const inputRef = ref() as Ref<InputInstance>;

const timeout = computed(() => {
  return props.remote ? 300 : 0;
});

const controlDropdown = (show: boolean) => {
  if (show) {
    //展开之前把之前选的清除
    if (props.filterable && states.selectedOption) {
      states.inputValue = "";
    }
    //过滤之后再次展开重新生成列表选项
    if (props.filterable) {
      generateFilterOption(states.inputValue);
    }
    tooltipRef.value.show();
  } else {
    tooltipRef.value.hide();
    //展开时,如果选择的option没有变化,当blur时候,将label回灌到input中
    if (props.filterable) {
      states.inputValue = states.selectedOption
        ? states.selectedOption.label
        : "";
    }
    // states.highlightIndex = -1;
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

//过滤后的选项
const filteredOption = ref(props.options);
watch(
  () => props.options,
  (newOption) => {
    filteredOption.value = newOption;
  }
);

const generateFilterOption = async (searchValue: string) => {
  if (!props.filterable) return;
  //如果有传递自定义的过滤方法并且传递的是一个方法就调用,否则调用默认的
  if (props.filterMethod && isFunction(props.filterMethod)) {
    filteredOption.value = props.filterMethod(searchValue);
  } else if (
    props.remote &&
    props.remoteMethod &&
    isFunction(props.remoteMethod)
  ) {
    //发送远程过滤请求
    try {
      states.loading = true;
      filteredOption.value = await props.remoteMethod(searchValue);
    } catch (error) {
      console.log("error:", error);
      filteredOption.value = [];
    } finally {
      states.loading = false;
    }
  } else {
    filteredOption.value = props.options.filter((option) =>
      option.label.includes(searchValue)
    );
  }
  // states.highlightIndex = -1;
};
//监听输入过滤
const onFilter = () => {
  generateFilterOption(states.inputValue);
};
//防抖优化
const debounceOnFilter = debounce(() => {
  onFilter();
}, timeout.value);

//过滤后的placeholder
const filteredPlaceholder = computed(() => {
  return props.filterable && states.selectedOption && isDropdownShow.value
    ? states.selectedOption.label
    : props.placeholder;
});

const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case "Enter":
      // toggleDropdown();
      if (!isDropdownShow.value) {
        controlDropdown(true);
      } else {
        if (
          states.highlightIndex > -1 &&
          filteredOption.value[states.highlightIndex]
        ) {
          itemSelect(filteredOption.value[states.highlightIndex]);
        } else {
          controlDropdown(false);
        }
      }

      break;
    case "Escape":
      if (isDropdownShow.value) {
        controlDropdown(false);
      }
      break;
    case "ArrowUp":
      //阻止按⬆️时屏幕滚动
      e.preventDefault();
      //filteredOption选项有值才可以移动
      if (filteredOption.value.length > 0) {
        //如果选项的index是-1或者是第一个,需要变为选项的最后一个
        if (states.highlightIndex === 0 || states.highlightIndex === -1) {
          states.highlightIndex = filteredOption.value.length - 1;
        } else {
          //移动
          states.highlightIndex--;
        }
      }
      break;
    case "ArrowDown":
      if (filteredOption.value.length > 0) {
        //如果选项的index是-1或者是最后一个了,需要变为选项的第一个
        if (
          states.highlightIndex === -1 ||
          states.highlightIndex === filteredOption.value.length - 1
        ) {
          states.highlightIndex = 0;
        } else {
          states.highlightIndex++;
        }
      }
      break;
    default:
      break;
  }
};
</script>

<style scoped></style>
