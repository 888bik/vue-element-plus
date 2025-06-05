---
title: Collapse | V-Element
description: Collapse 折叠面板组件的文档
---

# Collapse 折叠面板

可以折叠/展开的内容区域，支持手风琴模式。

## 基础用法

通过 `v-model` 控制展开的面板，`CollapseItem` 定义每个折叠项。

<preview path="../demo/Collapse/Basic.vue" title="基础用法" description="Collapse 组件的基础用法"></preview>

## 手风琴模式

设置 `accordion` 属性实现每次只展开一个面板。

<!-- <preview path="../demo/Collapse/Accordion.vue" title="手风琴模式" description="每次只展开一个面板的效果"></preview> -->

### Collapse Attributes

| 参数       | 说明                     | 类型         | 默认值  |
| ---------- | ------------------------ | ------------ | ------- |
| modelValue | 当前展开的面板 name 数组 | `NameType[]` | —       |
| accordion  | 是否手风琴模式           | `boolean`    | `false` |

### CollapseItem Attributes

| 参数     | 说明       | 类型       | 默认值  |
| -------- | ---------- | ---------- | ------- |
| name     | 唯一标识符 | `NameType` | —       |
| title    | 面板标题   | `string`   | —       |
| disabled | 是否禁用   | `boolean`  | `false` |

### Collapse Emits

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
