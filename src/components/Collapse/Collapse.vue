<template>
  <div class="bk-collapse">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, ref, watch } from "vue";
import {
  collapseContextKey,
  type CollapseEmits,
  type CollapseProps,
  type NameType,
} from "./types";

defineOptions({
  name: "BkCollapse",
});

const props = defineProps<CollapseProps>();
const emits = defineEmits<CollapseEmits>();

//维护是否处于展开状态的item的数组
const activeNames = ref<NameType[]>(props.modelValue || []);

if (props.accordion && activeNames.value.length > 1) {
  console.warn("accordion mode should only have one active item");
}

const handleItemClick = (item: NameType) => {
  if (!Array.isArray(activeNames.value)) {
    activeNames.value = [];
  }
  // 为什么不直接activeNames.value.push()
  //先解构赋值给一个新的数组,这样做能被检测到引用变化,触发更新
  let _activeNames = [...activeNames.value];
  if (props.accordion) {
    //手风琴模式需要判断name是否存在于activeNames中,如果存在则移除,不存在则添加name
    _activeNames = [activeNames.value[0] === item ? "" : item];
    activeNames.value = _activeNames;
  } else {
    const index = _activeNames.indexOf(item);
    if (index > -1) {
      //已经存在,则删除name,表示折叠状态
      _activeNames.splice(index, 1);
    } else {
      //不存在,则添加name,表示展开状态
      _activeNames.push(item);
    }
    activeNames.value = _activeNames;
  }
  emits("update:modelValue", _activeNames);
  emits("change", _activeNames);
};

watch(
  () => props.modelValue,
  () => {
    activeNames.value = props.modelValue;
  }
);

provide(collapseContextKey, {
  activeNames,
  handleItemClick,
});
</script>

<style lang="scss" scoped></style>
