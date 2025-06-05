---
title: Alert | V-Element
description: Alert 组件的文档
---

### Alert 组件属性说明

| 属性名      | 说明               | 类型                                          | 默认值    | 必填 |
| ----------- | ------------------ | --------------------------------------------- | --------- | ---- |
| title       | 警告标题           | `string`                                      | -         | 是   |
| type        | 警告类型           | `'success' \| 'warning' \| 'info' \| 'error'` | `'info'`  | 否   |
| effect      | 主题样式           | `'dark' \| 'light'`                           | `'light'` | 否   |
| closeable   | 是否显示关闭按钮   | `boolean`                                     | `false`   | 否   |
| closeText   | 自定义关闭按钮文本 | `string`                                      | -         | 否   |
| center      | 内容是否居中       | `boolean`                                     | `false`   | 否   |
| description | 警告描述内容       | `string`                                      | -         | 否   |
| showIcon    | 是否显示图标       | `boolean`                                     | `false`   | 否   |
| close       | 关闭时的回调函数   | `() => void`                                  | -         | 否   |

### 类型定义

```typescript
type alertTypes = "success" | "warning" | "info" | "error";

interface alertProps {
  title: string;
  type?: alertTypes;
  effect?: "dark" | "light";
  closeable?: boolean;
  closeText?: string;
  center?: boolean;
  description?: string;
  showIcon?: boolean;
  close?: () => void;
}
```
