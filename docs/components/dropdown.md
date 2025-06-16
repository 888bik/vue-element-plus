---
title: Dropdown | V-Element
description: Dropdown 下拉菜单组件的文档
---

# Dropdown 下拉菜单

基于 Tooltip 扩展的下拉菜单组件，支持丰富的菜单项配置。

## 基础用法

使用 `menuOptions` 配置菜单项，支持多级菜单结构。

<preview path="../demo/Dropdown/Basic.vue" title="基础用法" description="Dropdown 组件的基础用法"></preview>

## Dropdown 组件属性说明

| 参数           | 说明                  | 类型           | 默认值 |
| -------------- | --------------------- | -------------- | ------ |
| menuOptions    | 菜单配置项数组        | `MenuOption[]` | —      |
| hideAfterClick | 点击后是否隐藏菜单    | `boolean`      | `true` |
| TooltipProps   | 继承全部 Tooltip 属性 | —              | —      |

## MenuOption 结构

| 参数     | 说明           | 类型               | 默认值  |
| -------- | -------------- | ------------------ | ------- |
| label    | 菜单项显示内容 | `string \| VNode`  | —       |
| key      | 唯一标识符     | `string \| number` | —       |
| disabled | 是否禁用       | `boolean`          | `false` |
| divided  | 是否显示分割线 | `boolean`          | `false` |

## Dropdown 事件

| 事件名         | 说明                 | 回调参数              |
| -------------- | -------------------- | --------------------- |
| visible-change | 下拉菜单显示状态变化 | `(value: boolean)`    |
| select         | 菜单项选择事件       | `(value: MenuOption)` |
