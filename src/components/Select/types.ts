import type { Placement } from "@popperjs/core";
import type { VNode } from "vue";

export interface SelectProps {
  // v-model
  modelValue: string;
  // 选项
  options?: SelectOption[];
  // 一些基本表单属性
  placeholder: string;
  disabled?: boolean;
  placement?: Placement;
  clearable?: boolean;
  renderLabel?: RenderLabelFunc;
  filterable?: boolean;
  filterMethod?: CustomFilterFunc;
  remote?: boolean;
  remoteMethod?: CustomFilterRemoteFunc;
}

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectStates {
  inputValue: string;
  selectedOption: null | SelectOption;
  mouseHover: boolean;
  loading: boolean;
  highlightIndex: number;
}
export interface SelectEmits {
  (e: "change", value: string): void;
  (e: "update:modelValue", value: string): void;
  (e: "visible-change", value: boolean): void;
  (e: "clear"): void;
}
export type RenderLabelFunc = (option: SelectOption) => VNode;
export type CustomFilterFunc = (value: string) => SelectOption[];
export type CustomFilterRemoteFunc = (value: string) => Promise<SelectOption[]>;
