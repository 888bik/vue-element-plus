<template>
  <form>
    <slot />
  </form>
</template>

<script setup lang="ts">
import { provide } from "vue";
import {
  formContextKey,
  type FormContext,
  type FormFailure,
  type FormInstance,
  type FormItemContext,
  type FormProps,
} from "./types";
import type { ValidateFieldsError } from "async-validator";

defineOptions({
  name: "BkForm",
});
const props = defineProps<FormProps>();

//用于存储所有的formItem
const fields: FormItemContext[] = [];
const addField: FormContext["addField"] = (field) => {
  fields.push(field);
};
const removeField: FormContext["removeField"] = (field) => {
  if (field.prop) {
    fields.splice(fields.indexOf(field), 1);
  }
};

//整个表单的验证
const validate = async () => {
  let validationErrors: ValidateFieldsError = {};
  for (const field of fields) {
    try {
      await field.validate("");
    } catch (e) {
      const error = e as FormFailure;
      validationErrors = {
        ...validationErrors,
        ...error.fields,
      };
    }
  }
  //没有错误则表示验证全部通过
  if (Object.keys(validationErrors).length === 0) return true;
  //否则抛出错误信息
  return Promise.reject(validationErrors);
};

//清除整个表单的验证
const clearValidateAll = (keys: string[] = []) => {
  const filterArr =
    keys.length > 0
      ? fields.filter((field) => keys.includes(field.prop))
      : fields;

  filterArr.forEach((field) => field.clearValidate());
};

//重置整个表单的状态
const resetFields = (keys: string[] = []) => {
  //如果有传入keys,则只重置对应的field,否则全部重置
  const filterArr =
    keys.length > 0
      ? fields.filter((field) => keys.includes(field.prop))
      : fields;

  filterArr.forEach((field) => field.resetField());
};

//因为这里使用的是插槽,不方便传递props
provide(formContextKey, {
  ...props,
  addField,
  removeField,
});

defineExpose<FormInstance>({
  validate,
  resetFields,
  clearValidateAll,
});
</script>

<style scoped></style>
