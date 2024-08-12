# Changelog

英文 changelog 内容请访问 [CHANGELOG](CHANGELOG.md)

## [3.0.3](https://github.com/TerryZ/v-dialogs/compare/v3.0.2...v3.0.3) (2024-08-12)

### 新特性

- 添加 **土耳其语**，语言编码为 `TR`

## [3.0.2](https://github.com/TerryZ/v-dialogs/compare/v3.0.1...v3.0.2) (2024-07-06)

### 问题修复

- 修复 `DialogMask` 在 SSR 环境中构建失败的情况(HTMLElement is undefined)

## [3.0.1](https://github.com/TerryZ/v-dialogs/compare/v3.0.0...v3.0.1) (2024-07-06)

### 问题修复

- 修复 `DialogMask` 在 SSR 环境中构建失败的情况(HTMLElement is undefined)

## [3.0.0](https://github.com/TerryZ/v-dialogs/compare/v2.2.0...v3.0.0) (2024-07-06)

### 新特性

#### 公共内容

- 新增 **Message**、**Drawer** 两种对话框类型
- 新增 `header` prop 用于设置标题栏的显示，`title` prop 则仅用于标题栏文本内容设置
- **Alert**、**Message**、**Toast** 增加消息类型快速入口函数
- 新增 `shake` prop 用于设置窗口以外的区域操作，是否应用抖动动画提醒
- 默认语言使用英文
- `closeTime` 更名为 `duration`

#### Alert

- 新增 `colorfulShadow` prop 用于指定在 `warning`、`error` 与 `success` 消息类型时是否显示相应配色的阴影

#### Mask

- 新增 `pill` prop 用于设置内容面板是否使用胶囊圆角样式
- 新增 `icon` prop 用于设置是否显示 Loading 动画图标
- 新增 `panel` prop 用于是否显示内容面板，关闭则内容直接显示在遮罩上
- 新增 `appendTo` prop 用于指定遮罩覆盖的目标区域

#### Toast

- 新增 `offset` prop 用于指定对话框与屏幕边缘的间距
- `position` 更名为 `placement`，并移除显示于屏幕中间区域的两个位置

#### Modal

- 新增 `DialogModalBox` 的组件式的使用形态
