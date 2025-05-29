<template>
  <i
    class="bk-icon"
    :class="{ [`bk-icon--${type}`]: type }"
    :style="customStyles"
    v-bind="$attrs"
  >
    <FontAwesomeIcon v-bind="filteredProps" />
  </i>
</template>

<script setup lang="ts">
import "./style.scss";
import { omit } from "lodash-es";
import type { IconProps } from "./type";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { computed, useAttrs } from "vue";

defineOptions({
  name: "BkIcon",
  //这里禁用了透传,所以上面v-bind手动绑定$attrs
  inheritAttrs: false,
});

const props = defineProps<IconProps>();

// const filteredProps = omit(props, ["type", "color"]);
//为了更精细化的传递属性
const filteredProps = computed(() => omit(props, ["type", "color"]));

const customStyles = computed(() => {
  return props.color ? { color: props.color } : {};
});

const attrs = useAttrs();
console.log(attrs);
</script>

<style lang="scss" scoped></style>
