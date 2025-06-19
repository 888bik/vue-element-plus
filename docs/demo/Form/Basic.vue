<template>
  <div>
    <Form :model="model">
      <FormItem label="邮箱" prop="email">
        <Input v-model="model.email"></Input>
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input v-model="model.password" type="password"></Input>
      </FormItem>
      <div class="btn">
        <Button type="primary">Submit</Button>
      </div>
    </Form>
  </div>
</template>
<script setup>
import Form from "@/components/Form/Form.vue";
import FormItem from "@/components/Form/FormItem.vue";
import Input from "@/components/Input/Input.vue";
import Button from "@/components/Button/Button.vue";
import { reactive } from "vue";
const model = reactive({
  email: "222",
  password: "333",
});
</script>

<style>
.btn {
  display: flex;
  justify-content: center;
}
</style>
