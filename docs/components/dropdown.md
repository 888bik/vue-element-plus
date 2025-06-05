---
title: Dropdown | V-Element
description: Dropdown 下拉菜单组件的文档
---

# Dropdown 下拉菜单

基于 Tooltip 扩展的下拉菜单组件，支持丰富的菜单项配置。

## 基础用法

使用 `menuOptions` 配置菜单项，支持多级菜单结构。

<preview path="../demo/Dropdown/Basic.vue" title="基础用法" description="Dropdown 组件的基础用法"></preview>

## 触发行为

通过 `hideAfterClick` 控制点击后是否自动隐藏菜单。

<!-- <preview path="../demo/Dropdown/Trigger.vue" title="触发行为" description="点击后隐藏菜单的配置"></preview> -->

### Dropdown Attributes

| 参数            | 说明                  | 类型           | 默认值 |
| --------------- | --------------------- | -------------- | ------ |
| menuOptions     | 菜单配置项数组        | `MenuOption[]` | —      |
| hideAfterClick  | 点击后是否隐藏菜单    | `boolean`      | `true` |
| ...TooltipProps | 继承全部 Tooltip 属性 | —              | —      |

### MenuOption 结构

| 参数     | 说明           | 类型               | 默认值  |
| -------- | -------------- | ------------------ | ------- |
| label    | 菜单项显示内容 | `string \| VNode`  | —       |
| key      | 唯一标识符     | `string \| number` | —       |
| disabled | 是否禁用       | `boolean`          | `false` |
| divided  | 是否显示分割线 | `boolean`          | `false` |

### Dropdown Emits

| 事件名         | 说明                 | 回调参数              |
| -------------- | -------------------- | --------------------- |
| visible-change | 下拉菜单显示状态变化 | `(value: boolean)`    |
| select         | 菜单项选择事件       | `(value: MenuOption)` |

### 类型定义

```typescript
interface MenuOption {
  label: string | VNode;
  key: string | number;
  disabled?: boolean;
  divided?: boolean;
}

interface DropdownProps extends TooltipProps {
  menuOptions: MenuOption[];
  hideAfterClick?: boolean;
}

interface DropdownEmits {
  (e: "visible-change", value: boolean): void;
  (e: "select", value: MenuOption): void;
}
```
