---
title: Tooltip | V-Element
description: Tooltip 组件文档
---

# Tooltip 文字提示

用于展示鼠标悬停时的提示信息。

## 基础用法

用`content`属性决定提示消息。
<preview path="../demo/Tooltip/Basic.vue" title="基础用法" description="Tooltip 组件的基础用法"></preview>

## 展示位置

通过`placement`属性决定提示展示的位置效果。

`placement`属性值为：[方向]-[对齐位置]；四个方向：top、left、right、bottom；三种对齐位置：start, end，默认为空。 如 placement="left-end"，则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐。
<preview path="../demo/Tooltip/Placement.vue" title="Hover触发" description="Hover触发Tooltip的显示"></preview>

## Hover 触发

通过`trigger`属性改变 Tooltip 的触发方式，可选值有 `hover | click`
<preview path="../demo/Tooltip/Trigger.vue" title="Hover触发" description="Hover触发Tooltip的显示"></preview>

## 更多内容的文字提示

展示多行文本或者是设置文本内容的格式

用具名 slot content，替代 tooltip 中的 content 属性。

<preview path="../demo/Tooltip/Content.vue" title="Hover触发" description="Hover触发Tooltip的显示"></preview>

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
