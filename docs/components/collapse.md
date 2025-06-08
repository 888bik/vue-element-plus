---
title: Collapse | V-Element
description: Collapse 折叠面板组件的文档
---

# Collapse 折叠面板

Collapse 组件用于创建可折叠的内容区域。它允许用户点击标题或触发器来展开或收起相关内容，从而有效地管理页面上的信息和节省空间。

## 基础用法

在页面上展示大量内容时，Collapse 组件可以帮助节省空间，用户可以通过点击标题或触发器来展开或收起内容区域。

<preview path="../demo/Collapse/Basic.vue" title="基础用法" description="Collapse 组件的基础用法"></preview>

## 手风琴模式

同一时间只有一个折叠项处于展开状态的模式。当用户点击其中一个折叠项展开时，其他的折叠项会自动关闭，保持页面上只有一个折叠项是展开的状态。通过 `accordion` 属性来设置是否以手风琴模式显示。

<preview path="../demo/Collapse/Accordion.vue" title="手风琴模式" description="每次只展开一个面板的效果"></preview>

## Collapse 属性说明

| 参数       | 说明                     | 类型         | 默认值  |
| ---------- | ------------------------ | ------------ | ------- |
| modelValue | 当前展开的面板 name 数组 | `NameType[]` | —       |
| accordion  | 是否手风琴模式           | `boolean`    | `false` |

## CollapseItem 属性说明

| 参数     | 说明       | 类型       | 默认值  |
| -------- | ---------- | ---------- | ------- |
| name     | 唯一标识符 | `NameType` | —       |
| title    | 面板标题   | `string`   | —       |
| disabled | 是否禁用   | `boolean`  | `false` |

## Collapse 事件类型

| 事件名            | 说明               | 回调参数               |
| ----------------- | ------------------ | ---------------------- |
| update:modelValue | 同步展开状态变化   | `(values: NameType[])` |
| change            | 展开状态变化时触发 | `(values: NameType[])` |

### 类型定义

```typescript
type NameType = string | number;

interface CollapseProps {
  modelValue: NameType[];
  accordion?: boolean;
}

interface CollapseItemProps {
  name: NameType;
  title?: string;
  disabled?: boolean;
}

interface CollapseContext {
  activeNames: Ref<NameType[]>;
  handleItemClick: (name: NameType) => void;
}

interface CollapseEmits {
  (e: "update:modelValue", values: NameType[]): void;
  (e: "change", values: NameType[]): void;
}
```
