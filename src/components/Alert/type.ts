export interface alertProps {
  title: string;
  type?: alertTypes;
  effect?: "dark" | "light";
  //决定组件是否可以关闭
  closeable?: boolean;
  // 代替右侧的关闭图标;
  closeText?: string;
  center?: boolean;
  description?: string;
  showIcon?: boolean;
  close?: () => void;
}

export type alertTypes = "primary" | "success" | "info" | "warning" | "error";
