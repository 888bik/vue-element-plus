---
title: Icon | V-Element
description: Icon 组件的文档
---

# Icon 图标

基于 FontAwesome 的图标组件，支持多种颜色和类型。

## 基础用法

使用 `icon` 属性指定图标名称，`color` 自定义颜色。

<preview path="../demo/Icon/Basic.vue" title="基础用法" description="Icon 组件的基础用法"></preview>

## 类型展示

通过 `type` 属性可以设置不同的预设类型样式。

<preview path="../demo/Icon/Basic.vue" title="类型展示" description="五种预设类型的图标展示"></preview>

### Icon Attributes

| 参数                     | 说明                        | 类型                                                        | 默认值 |
| ------------------------ | --------------------------- | ----------------------------------------------------------- | ------ |
| icon                     | FontAwesome 图标名称        | `IconLookup`                                                | —      |
| color                    | 自定义颜色                  | `string`                                                    | —      |
| type                     | 预设类型                    | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | —      |
| ...其他 FontAwesome 属性 | 继承自 FontAwesomeIconProps | —                                                           | —      |

### 继承的 FontAwesomeIconProps

| 常用参数   | 说明                                                 |
| ---------- | ---------------------------------------------------- |
| size       | 图标尺寸 (`'xs'`, `'sm'`, `'lg'`, `'xl'`, `'2x'`...) |
| spin       | 是否旋转动画                                         |
| pulse      | 是否脉冲动画                                         |
| border     | 是否显示边框                                         |
| fixedWidth | 是否固定宽度                                         |

### 类型定义

```typescript
interface IconProps extends FontAwesomeIconProps {
  color?: string;
  type?: "primary" | "success" | "warning" | "danger" | "info";
}
```
