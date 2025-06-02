//按钮类型
export type ButtonType = "primary" | "success" | "info" | "warning" | "danger";
//按钮尺寸
export type ButtonSize = "large" | "medium" | "small" | "mini";
// 原生按钮类型
export type NativeType = "button" | "submit" | "reset";

export interface ButtonInstance {
  ref: HTMLButtonElement;
}
//button属性
export type buttonProps = {
  type?: ButtonType;
  size?: ButtonSize;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  disabled?: boolean;
  nativeType?: NativeType;
  autofocus?: boolean;
  icon?: string;
  loading?: boolean;
};
