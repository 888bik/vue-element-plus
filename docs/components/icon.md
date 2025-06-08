---
title: Icon | V-Element
description: Icon 组件的文档
---

# Icon 图标

对`fontawesome`图标库进行封装，涵盖了各种常见的图标需求。

## 基础用法

传入`icon`属性设置要使用的 Icon 图标。

<preview path="../demo/Icon/Basic.vue" title="基础用法" description="Icon 组件的基础用法"></preview>

## 扩展用法

Icon 组件是对`fontawesome`图标库的封装，因此该图标库的相关属性均可以设置, 比如颜色`color`、大小`size`, 旋转角度`rotation`。

<preview path="../demo/Icon/Icon.vue" title="扩展用法" description="Icon 组件的扩展用法"></preview>

## Icon 属性说明

| 参数                  | 说明                        | 类型                                                        | 默认值 |
| --------------------- | --------------------------- | ----------------------------------------------------------- | ------ |
| icon                  | FontAwesome 图标名称        | `IconLookup`                                                | —      |
| color                 | 自定义颜色                  | `string`                                                    | —      |
| type                  | 预设类型                    | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | —      |
| 其他 FontAwesome 属性 | 继承自 FontAwesomeIconProps | —                                                           | —      |

## 继承的 FontAwesomeIconProps

| 常用参数   | 说明                                                 |
| ---------- | ---------------------------------------------------- |
| size       | 图标尺寸 (`'xs'`, `'sm'`, `'lg'`, `'xl'`, `'2x'`...) |
| spin       | 是否旋转动画                                         |
| pulse      | 是否脉冲动画                                         |
| border     | 是否显示边框                                         |
| fixedWidth | 是否固定宽度                                         |

## 类型定义

```typescript
interface IconProps extends FontAwesomeIconProps {
  color?: string;
  type?: "primary" | "success" | "warning" | "danger" | "info";
}
```
