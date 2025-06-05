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
import { omit } from "lodash-es";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { computed } from "vue";
import type { IconProps } from "./types";

defineOptions({
  name: "BkIcon",
  //这里禁用了透传,所以上面v-bind手动绑定$attrs
  inheritAttrs: false,
});

const props = defineProps<IconProps>();

//过滤type,color属性
const filteredProps = computed(() => omit(props, ["type", "color"]));

const customStyles = computed(() => {
  return props.color ? { color: props.color } : {};
});
</script>

<style lang="scss" scoped></style>
