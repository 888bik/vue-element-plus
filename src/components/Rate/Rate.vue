<template>
  <div class="bk-rate">
    <span
      v-for="item in maxScore"
      :key="item"
      class="iconfont bk-rate__icon-star"
      :class="{ [`bk-rate__star-${size}`]: size }"
      @click="setRateNum(item)"
      :style="{
        color: item <= rateNum ? activeColor : voidColor,
      }"
    ></span>
  </div>
</template>

<script setup lang="ts">
import type { RateEmits, RateProps } from "./types";
import { useRate } from "./useRate";

defineOptions({
  name: "BkRate",
});

const props = withDefaults(defineProps<RateProps>(), {
  num: 3, //默认星星数量
  size: "default",
  maxScore: 5,
  activeColor: "red",
  voidColor: "#eee",
});

const emits = defineEmits<RateEmits>();

const [rateNum, setRateNum] = useRate(props.num, () => {
  emits("changeRateNum", rateNum.value);
});
</script>

<style scoped></style>
