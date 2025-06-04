import { computed, ref } from "vue";

const ZIndex = ref(0);
export const useZIndex = (initialValue = 2000) => {
  //初始值
  const initialIndex = ref(initialValue); //初始值
  //当前值
  const currentZIndex = computed(() => initialIndex.value + ZIndex.value);
  //下一个值
  const nextZIndex = () => {
    ZIndex.value++;
    return currentZIndex.value;
  };
  return {
    initialValue,
    currentZIndex,
    nextZIndex,
  };
};
