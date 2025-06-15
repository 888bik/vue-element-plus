import { h, render, shallowReactive } from "vue";
import Message from "./Message.vue";
import type { CreateMessageProps, MessageContext } from "./types";
import { useZIndex } from "../../hooks/useZIndex";

let seed = 1;
const instances: MessageContext[] = shallowReactive([]);
/**
 * 为什么要通过这种方式创建Message组件:
 * 1.通过函数创建可以在任何需要的地方调用函数即可创建,而无需在模板中声明
 * 2.动态控制生命周期,自动销毁逻辑
 * @param props
 */
export const createMessage = (props: CreateMessageProps) => {
  const id = `message_${seed++}`;
  const { nextZIndex } = useZIndex();
  
  const destroy = () => {
    //删除数组中的实例
    const index = instances.findIndex((instance) => instance.id === id);
    if (index === -1) return;
    instances.splice(index, 1);
    //将vNode移除
    render(null, container);
  };

  const newProps = {
    ...props,
    id,
    onDestroy: destroy,
    zIndex: nextZIndex(),
  };
  const container = document.createElement("div");
  //创建节点
  const vNode = h(Message, newProps);
  //挂载节点,render函数没有返回实例
  render(vNode, container);
  //追加节点元素
  document.body.appendChild(container.firstChild!);

  const manualDestroy = () => {
    const instance = instances.find((instance) => instance.id === id);
    if (instance) {
      instance.vm.exposed!.isVisible.value = false;
    }
  };

  const vm = vNode.component!;
  
  //封装的实例
  const instance = {
    vNode,
    vm,
    id,
    props: newProps,
    destroy: manualDestroy,
  };
  instances.push(instance);
  return instance;
};

export const getLastInstance = () => {
  return instances[instances.length - 1];
};

export const getLastBottomOffset = (id: string) => {
  const index = instances.findIndex((instance) => instance.id === id);
  // console.log("id:", id, "index:", index, "instanceLength:", instances.length);
  if (index <= 0) {
    return 0;
  } else {
    const prev = instances[index - 1];
    return prev.vm.exposed!.currentBottomOffset.value;
  }
};
//关闭所有的实例
export const closeAll = () => {
  instances.forEach((instance) => {
    instance.destroy();
  });
};
