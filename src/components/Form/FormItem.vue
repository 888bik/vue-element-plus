<template>
  <div
    class="bk-form-item"
    :class="{
      'is-error': validateStates.state === 'error',
      'is-success': validateStates.state === 'success',
      'is-loading': validateStates.loading,
      'is-required': isRequired,
    }"
  >
    <label class="bk-form-item__label">
      <!-- 将接收的label传递给父组件渲染 -->
      <slot name="label" :label="label">
        {{ label }}
      </slot>
    </label>
    <div class="bk-form-item__content">
      <slot :validate="validate" />
      <!-- 错误信息提示 -->
      <div
        class="bk-form-item__error-msg"
        v-if="validateStates.state === 'error'"
      >
        {{ validateStates.errorMsg }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  onMounted,
  onUnmounted,
  provide,
  reactive,
} from "vue";
import {
  formContextKey,
  formItemContextKey,
  type FormFailure,
  type FormItemContext,
  type FormItemInstance,
  type FormItemProps,
  type ValidateStatusProp,
} from "./types";
import { isNil } from "lodash-es";
import Schema from "async-validator";

defineOptions({
  name: "BkFormItem",
});
const props = defineProps<FormItemProps>();
const formContext = inject(formContextKey);
let initialValue: any = null;

const validateStates: ValidateStatusProp = reactive({
  state: "init",
  errorMsg: "",
  loading: false,
});

//获取每个formItem,input输入的值
const innerValue = computed(() => {
  const model = formContext?.model;
  if (model && props.prop && !isNil(model[props.prop])) {
    return model[props.prop];
  } else {
    return null;
  }
});
//获取每个formItem的rule
const itemRule = computed(() => {
  const rule = formContext?.rules;
  if (rule && props.prop && !isNil(rule[props.prop])) {
    return rule[props.prop];
  } else {
    return [];
  }
});

const isRequired = computed(() => {
  return itemRule.value.some((rule) => rule.required);
});

//获取有trigger的验证规则
const getTriggerRules = (trigger?: string) => {
  //一个formItem可能有多个验证规则
  const rules = itemRule.value;
  if (rules) {
    //如果rule的trigger的值为空,或者没有传递trigger,则不进行验证
    return rules.filter((rule) => {
      if (!rule.trigger || !trigger) return true;
      return rule.trigger && rule.trigger === trigger;
    });
  } else {
    return [];
  }
};

const validate = async (trigger?: string) => {
  const modeName = props.prop;
  const triggerRules = getTriggerRules(trigger);
  if (triggerRules.length === 0) {
    return true;
  }
  if (modeName) {
    const validator = new Schema({
      [modeName]: triggerRules,
    });
    validateStates.loading = true;
    return validator
      .validate({ [modeName]: innerValue.value })
      .then(() => {
        validateStates.state = "success";
      })
      .catch((e: FormFailure) => {
        const { errors } = e;
        validateStates.state = "error";
        validateStates.errorMsg =
          errors && errors.length > 0 ? errors[0].message || "" : "";
        return Promise.reject(e);
      })
      .finally(() => {
        validateStates.loading = false;
      });
  }
};
//清除验证
const clearValidate = () => {
  validateStates.state = "init";
  validateStates.errorMsg = "";
  validateStates.loading = false;
};
//重置value到初始状态
const resetField = () => {
  clearValidate();
  const model = formContext?.model;
  if (model && props.prop && !isNil(model[props.prop])) {
    model[props.prop] = initialValue;
  }
};

const context: FormItemContext = {
  prop: props.prop || "",
  validate,
  resetField,
  clearValidate,
};

onMounted(() => {
  if (props.prop) {
    formContext?.addField(context);
    //保存一下初始状态的值
    initialValue = innerValue.value;
  }
});
onUnmounted(() => {
  formContext?.removeField(context);
});

provide(formItemContextKey, context);

defineExpose<FormItemInstance>({
  validateStates,
  validate,
  resetField,
  clearValidate,
});
</script>

<style scoped></style>
