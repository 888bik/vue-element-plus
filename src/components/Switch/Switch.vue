<template>
  <div
    class="bk-switch"
    :class="{
      [`bk-switch--${size}`]: size,
      'is-disabled': disabled,
      'is-checked': checked,
    }"
    @click="switchValue"
  >
    <input
      type="checkbox"
      class="bk-switch__input"
      role="switch"
      ref="inputRef"
      :disabled="disabled"
      :name="name"
      @keydown.enter="switchValue"
    />
    <div class="bk-switch__core">
      <div class="bk-switch__core-inner">
        <span
          class="bk-switch__core-inner-text"
          v-if="activeText || inactiveText"
        >
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="bk-switch__core-action"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import type { SwitchEmits, SwitchProps } from "./types";

defineOptions({
  name: "BkSwitch",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false,
  activeText: "OFF",
  inactiveText: "NO",
});
const emits = defineEmits<SwitchEmits>();
const innerValue = ref(props.modelValue);
//现在是否被选中
const checked = computed(() => {
  return innerValue.value === props.activeValue;
});
const inputRef = ref<HTMLInputElement>();

const switchValue = () => {
  if (props.disabled) return;
  // innerValue.value = !checked.value;
  const newValue = checked.value ? props.inactiveValue : props.activeValue;
  innerValue.value = newValue;
  emits("change", newValue);
  emits("update:modelValue", newValue);
};

//将input的值与switch的值联动
onMounted(() => {
  inputRef.value!.checked = checked.value;
});

watch(checked, (newValue) => {
  inputRef.value!.checked = newValue;
});

watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue;
  }
);
</script>

<style scoped></style>
