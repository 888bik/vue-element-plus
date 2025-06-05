---
title: Message | V-Element
description: Message 组件的文档
---

### Message 组件属性说明

| 属性名         | 说明             | 类型                                           | 默认值   | 必填 |
| -------------- | ---------------- | ---------------------------------------------- | -------- | ---- |
| message        | 消息内容         | `string \| VNode`                              | -        | 否   |
| duration       | 自动关闭延时(ms) | `number`                                       | `3000`   | 否   |
| showClose      | 是否显示关闭按钮 | `boolean`                                      | `false`  | 否   |
| type           | 消息类型         | `'success' \| 'info' \| 'warning' \| 'danger'` | `'info'` | 否   |
| onDestroy      | 销毁时的回调函数 | `() => void`                                   | -        | 是   |
| id             | 消息唯一标识     | `string`                                       | -        | 是   |
| zIndex         | 消息层级         | `number`                                       | -        | 是   |
| offset         | 垂直偏移量(px)   | `number`                                       | `16`     | 否   |
| transitionName | 过渡动画名称     | `string`                                       | -        | 否   |

### 类型定义

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
