import { ref, type Ref } from "vue";

export const useRate = (
  initialNum: number,
  callback: () => void
): [Ref<number>, (num: number) => void] => {
  //创建响应式变量rateNum,用于保存已评分的星星数量
  const rateNum = ref<number>(initialNum);

  //用于设置评分星星数量
  const setRateNum = (num: number) => {
    rateNum.value = num;
    //执行回调函数,一般用于emit事件
    callback();
  };

  return [rateNum, setRateNum];
};
