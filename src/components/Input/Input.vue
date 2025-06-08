<template>
  <div
    class="bk-input"
    :class="{
      [`bk-input--${type}`]: type,
      [`bk-input--${size}`]: size,
      'is-disabled': disabled,
      'is-prepend': $slots.prepend,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
      'is-append': $slots.append,
    }"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend -->
      <div class="bk-input__prepend" v-if="$slots.prepend">
        <slot name="prepend" />
      </div>

      <div class="bk-input__wrapper">
        <!-- prefix -->
        <span class="bk-input__prefix" v-if="$slots.prefix">
          <slot name="prefix" />
        </span>
        <!-- inner -->
        <input
          class="bk-input__inner"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          v-bind="attrs"
          v-model="innerValue"
          ref="inputRef"
          :disabled="disabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          @change="handleChange"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
        />

        <!-- suffix -->
        <span
          class="bk-input__suffix"
          v-if="$slots.suffix || showClear || showPassword"
          @click="keepFocus"
          @mousedown.prevent="NOOP"
        >
          <slot name="suffix" />
          <!-- clear icon -->
          <Icon
            icon="circle-xmark"
            v-if="showClear"
            class="bk-input__clear"
            @click="handleClear"
          />
          <!-- showPassword  -->
          <Icon
            icon="eye"
            v-if="showPasswordArea && passwordVisible"
            class="bk-input__password"
            @click="togglePasswordVisible"
          />
          <Icon
            icon="eye-slash"
            v-if="showPasswordArea && !passwordVisible"
            class="bk-input__password"
            @click="togglePasswordVisible"
          />
        </span>
      </div>
      <!-- append -->
      <div class="bk-input__append" v-if="$slots.append">
        <slot name="append" />
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea
        class="bk-textarea__wrapper"
        v-model="innerValue"
        ref="inputRef"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, useAttrs, watch } from "vue";
import type { InputEmits, InputProps } from "./types";
import Icon from "../Icon/Icon.vue";

defineOptions({
  name: "BkInput",
  inheritAttrs: false,
});
//@change和@input的区别:change值发生变化并且失去焦点时发生变化,input值发生变化时变化
const props = withDefaults(defineProps<InputProps>(), {
  clearable: true,
  disabled: false,
  showPassword: true,
});
const emits = defineEmits<InputEmits>();
const inputRef = ref<HTMLInputElement>();
const isFocus = ref(false);
const passwordVisible = ref(false);
const attrs = useAttrs();
const innerValue = ref(props.modelValue);
const showClear = computed(
  () =>
    //icon出现条件:1.开启了清除选项 2.输入框没有被禁用 3.聚焦在输入框 4.输入框有值
    props.clearable && !props.disabled && isFocus.value && !!innerValue.value
);
const showPasswordArea = computed(
  () => props.showPassword && !!innerValue.value && !props.disabled
);

//流程:input的v-model绑定innerValue的值,input值发生变化时,innerValue的值也发生变化
//@change失去焦点时调用handleChange,emits事件
const handleInput = () => {
  emits("update:modelValue", innerValue.value);
  emits("input", innerValue.value);
};
const handleChange = () => {
  emits("change", innerValue.value);
};
const handleFocus = (event: FocusEvent) => {
  isFocus.value = true;
  emits("focus", event);
};
const handleClear = () => {
  innerValue.value = "";
  emits("clear");
  emits("change", "");
  emits("input", "");
  emits("update:modelValue", "");
};
const handleBlur = (event: FocusEvent) => {
  // isFocus.value = false;
  emits("blur", event);
};
const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value;
};
const keepFocus = async () => {
  await nextTick();
  inputRef.value?.focus();
};
//空函数
const NOOP = () => {};

//监听
watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue;
  }
);
defineExpose({
  inputRef,
});
</script>
<style scoped></style>
