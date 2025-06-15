export type SwitchValueType = boolean | string | number;
export interface SwitchProps {
  modelValue: SwitchValueType;
  disabled?: boolean;
  activeText?: string;
  inactiveText?: string;
  activeValue?: SwitchValueType;
  inactiveValue?: SwitchValueType;
  activeColor?: string;
  inactiveColor?: string;
  name?: string;
  id?: string;
  size?: "small" | "large";
  inlinePrompt?: boolean; // 是否使用行内提示样式
}
export interface SwitchEmits {
  (e: "update:modelValue", value: SwitchValueType): void;
  (e: "change", value: SwitchValueType): void;
}
