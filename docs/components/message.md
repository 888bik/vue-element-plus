---
title: Message | V-Element
description: Message 组件的文档
---

## Message 组件

与 Alert 组件类似，Message 组件也用于向用户提供关键的信息，但通常它是以非阻塞的方式显示，显示临时性的通知，比如操作成功，操作失败，通常会在屏幕的某个角落或顶部浮动，不会打断用户的操作。

## 基础用法

用来显示「成功、警告、消息、错误」类的操作反馈。设置 type 字段可以定义不同的状态，默认为 info。

<preview path="../demo/Message/Basic.vue"></preview>

## 可关闭的消息提示

可以添加关闭按钮。

默认的 Message 是不可以被人工关闭的。 如果你需要手动关闭功能，你可以把 showClose 设置为 true, 并且 Message 拥有`duration`配置，默认的关闭时间为 3000 毫秒，当把这个属性的值设置为 0 便表示该消息不会被自动关闭。
<preview path="../demo/Message/Close.vue"></preview>

## 手动关闭所有实例

调用`closeAll()`关闭所有创建的 message 消息。

<preview path="../demo/Message/CloseAll.vue"></preview>

## Message 组件属性说明

| 属性名         | 说明             | 类型                                                       | 默认值   | 必填 |
| -------------- | ---------------- | ---------------------------------------------------------- | -------- | ---- |
| message        | 消息内容         | `string \| VNode`                                          | -        | 否   |
| duration       | 自动关闭延时(ms) | `number`                                                   | `3000`   | 否   |
| showClose      | 是否显示关闭按钮 | `boolean`                                                  | `false`  | 否   |
| type           | 消息类型         | `'primary' \|'success' \| 'info' \| 'warning' \| 'danger'` | `'info'` | 否   |
| onDestroy      | 销毁时的回调函数 | `() => void`                                               | -        | 是   |
| id             | 消息唯一标识     | `string`                                                   | -        | 是   |
| zIndex         | 消息层级         | `number`                                                   | -        | 是   |
| offset         | 垂直偏移量(px)   | `number`                                                   | `16`     | 否   |
| transitionName | 过渡动画名称     | `string`                                                   | -        | 否   |

## 类型定义

```typescript
interface MessageProps {
  message?: string | VNode;
  duration?: number;
  showClose?: boolean;
  type?: "success" | "info" | "warning" | "danger";
  onDestroy: () => void;
  id: string;
  zIndex: number;
  offset?: number;
  transitionName?: string;
}
```
