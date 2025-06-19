<template>
  <div>
    <Form :model="model" :rules="rules" ref="formRef">
      <FormItem label="邮箱" prop="email">
        <Input v-model="model.email"></Input>
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input v-model="model.password" type="password"></Input>
      </FormItem>
      <div class="btn">
        <Button type="info" @click.prevent="reset">Reset</Button>
      </div>
    </Form>
  </div>
</template>
<script setup>
import Form from "@/components/Form/Form.vue";
import FormItem from "@/components/Form/FormItem.vue";
import Input from "@/components/Input/Input.vue";
import Button from "@/components/Button/Button.vue";
import { reactive, ref } from "vue";
const model = reactive({
  email: "222",
  password: "333",
});
const rules = {
  email: [{ type: "email", required: true, trigger: "blur" }],
  password: [
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
};
const formRef = ref();

const reset = () => {
  formRef?.value.resetFields();
};
</script>

<style>
.btn {
  display: flex;
  justify-content: center;
}
</style>
