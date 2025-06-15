---
title: Tooltip | V-Element
description: Tooltip 组件的文档
---

# Tooltip 文字提示

用于展示鼠标悬停时的提示信息。

## 基础用法

使用 `content` 属性定义提示内容，`placement` 控制弹出位置。

<preview path="../demo/Tooltip/Basic.vue" title="基础用法" description="Tooltip 组件的基础用法"></preview>

## 触发方式

通过 `trigger` 属性可以设置不同的触发方式。

<!-- <preview path="../demo/Tooltip/Trigger.vue" title="触发方式" description="hover/click 两种触发方式"></preview> -->

## 高级配置

使用 `popperOptions` 进行更复杂的弹窗配置。

<!-- <preview path="../demo/Tooltip/Advanced.vue" title="高级配置" description="自定义 Popper.js 配置"></preview> -->

## Tooltip 组件属性说明

| 参数          | 说明             | 类型                                                                                                                                                                 | 默认值    |
| ------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| content       | 提示内容         | `string`                                                                                                                                                             | —         |
| trigger       | 触发方式         | `'hover' \| 'click'`                                                                                                                                                 | `'hover'` |
| placement     | 弹出位置         | `'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | `'top'`   |
| manual        | 是否手动控制     | `boolean`                                                                                                                                                            | `false`   |
| popperOptions | Popper.js 配置项 | `Partial<Options>`                                                                                                                                                   | `{}`      |
| transition    | 过渡动画名称     | `string`                                                                                                                                                             | —         |
| openDelay     | 打开延迟(ms)     | `number`                                                                                                                                                             | `0`       |
| closeDelay    | 关闭延迟(ms)     | `number`                                                                                                                                                             | `0`       |

## Tooltip 插槽

| Name    | Description                         |
| ------- | ----------------------------------- |
| default | 触发 Tooltip 的内容                 |
| content | 自定义提示内容（替代 content 属性） |
