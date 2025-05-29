import type { InjectionKey, Ref } from "vue";

export type NameType = string | number; // 标识每个折叠项的唯一标识符，可以是字符串或数字类型

export interface CollapseProps {
  modelValue: NameType[];
  accordion?: boolean;//手风琴效果
}

export interface CollapseItemProps {
  name: NameType;
  title?: string;
  disabled?: boolean;
}

export interface CollapseContext {
  activeNames: Ref<NameType[]>;
  handleItemClick: (name: NameType) => void;
}

export interface CollapseEmits {
  (e: "update:modelValue", values: NameType[]): void;
  (e: "change", values: NameType[]): void;
}

export const collapseContextKey: InjectionKey<CollapseContext> =
  Symbol("collapseContextKey");
