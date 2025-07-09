export interface RateProps {
  num?: number;
  size?: RateSize;
  maxScore?: number;
  activeColor?: string; //选中的星星颜色
  voidColor?: string; //未选中的星星颜
}
export type RateSize = "large" | "default" | "small";

export interface RateEmits {
  (e: "changeRateNum", value: number): void; // 改变评分数量事件
}
