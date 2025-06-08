---
title: Link | V-Element
description: Link 组件的文档
---

# Link 导航

文字超链接

## 基础用法

基础的文字链接用法。

<preview path="../demo/Link/Basic.vue" title="基础用法" description="Link 组件的基础用法"></preview>

## 禁用

文字链接不可用状态。

<preview path="../demo/Link/Disabled.vue" title="基础用法" description="Button 组件的基础用法"></preview>

## 下划线

文字链接下划线。

<preview path="../demo/Link/Underline.vue" title="基础用法" description="Button 组件的基础用法"></preview>

## 图标

带图标的链接
<preview path="../demo/Link/Icon.vue" title="基础用法" description="Button 组件的基础用法"></preview>

## Link 组件属性说明

| 属性名    | 说明             | 类型                                         | 默认值      | 必填 |
| --------- | ---------------- | -------------------------------------------- | ----------- | ---- |
| type      | 链接类型         | `'default' \| 'primary' \| 'danger'`         | `'default'` | 否   |
| disabled  | 是否禁用         | `boolean`                                    | `false`     | 否   |
| underline | 下划线显示方式   | `'always' \| 'hover' \| 'never' \| boolean`  | `'hover'`   | 否   |
| href      | 链接地址         | `string`                                     | -           | 是   |
| target    | 链接打开方式     | `'_blank' \| '_self' \| '_parent' \| '_top'` | `'_self'`   | 否   |
| onClick   | 点击事件回调函数 | `(event: MouseEvent) => void`                | -           | 否   |

## 类型定义

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
