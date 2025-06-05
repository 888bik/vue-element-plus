---
title: Link | V-Element
description: Link 组件的文档
---

# Link 导航

## 基础用法

### Link 组件属性说明

| 属性名    | 说明             | 类型                                         | 默认值      | 必填 |
| --------- | ---------------- | -------------------------------------------- | ----------- | ---- |
| type      | 链接类型         | `'default' \| 'primary' \| 'danger'`         | `'default'` | 否   |
| disabled  | 是否禁用         | `boolean`                                    | `false`     | 否   |
| underline | 下划线显示方式   | `'always' \| 'hover' \| 'never' \| boolean`  | `'hover'`   | 否   |
| href      | 链接地址         | `string`                                     | -           | 是   |
| target    | 链接打开方式     | `'_blank' \| '_self' \| '_parent' \| '_top'` | `'_self'`   | 否   |
| onClick   | 点击事件回调函数 | `(event: MouseEvent) => void`                | -           | 否   |

### 类型定义

```typescript
type LinkType = "default" | "primary" | "danger";

interface LinkProps {
  type?: LinkType;
  disabled?: boolean;
  underline?: "always" | "hover" | "never" | boolean;
  href: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  onClick?: (event: MouseEvent) => void;
}
```
