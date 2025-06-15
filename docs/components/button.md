---
title: Button | V-Element
description: Button 组件的文档
---

# Button 按钮

常用的操作按钮。

## 基础用法

使用 `type`、`plain`、`round` 和 `circle` 来定义按钮的样式。

<preview path="../demo/Button/Basic.vue" title="基础用法" description="Button 组件的基础用法"></preview>

## 禁用状态

你可以使用 `disabled` 属性来定义按钮是否被禁用。
使用 `disabled` 属性来控制按钮是否为禁用状态。 该属性接受一个 `Boolean` 类型的值。

<preview path="../demo/Button/Disabled.vue" title="禁用状态" description="Button 组件的禁用状态"></preview>

## Icon

<preview path="../demo/Button/Icon.vue"></preview>

## 加载状态按钮

<preview path="../demo/Button/Loading.vue"></preview>

## 大小不同的按钮

<preview path="../demo/Button/Size.vue"></preview>

## Button 属性说明

| Name        | Description                            | Type                                                             | Default |
| ----------- | -------------------------------------- | ---------------------------------------------------------------- | ------- |
| size        | button size                            | `enum` - `'large'\| 'small'`                                     | —       |
| type        | button type                            | `enum` - `'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'` | —       |
| plain       | determine whether it's a plain button  | `boolean`                                                        | false   |
| round       | determine whether it's a round button  | `boolean`                                                        | false   |
| circle      | determine whether it's a circle button | `boolean`                                                        | false   |
| loading     | determine whether it's loading         | `boolean`                                                        | false   |
| disabled    | disable the button                     | `boolean`                                                        | false   |
| icon        | icon component                         | `string`                                                         | —       |
| autofocus   | same as native button's `autofocus`    | `boolean`                                                        | false   |
| native-type | same as native button's `type`         | `enum` - `'button'\| 'submit'\| 'reset'`                         | button  |
