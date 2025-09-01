# Changelog

Please refer to [CHANGELOG-CN](CHANGELOG-CN.md) for Chinese changelog

## [3.1.0](https://github.com/TerryZ/v-dialogs/compare/v3.0.3...v3.1.3) (2025-09-02)

### Features

- `DialogAlert` content height adaptive
- `DialogModal` minimum width is adjusted to `280px`
- Optimize animation performance and effects
- `DialogModal` and `DialogDrawer`'s `callback` response event `(data: unknown) => void` is adjusted to `(name: string, data: unknown[]) => void`, and responds to all events triggered by component inside dialog and dialog operation events
- `DialogDrawer` adds `rounded` prop to set the rounded border style of the drawer

## [3.0.3](https://github.com/TerryZ/v-dialogs/compare/v3.0.2...v3.0.3) (2024-08-12)

### Features

- Add **Turkish** , the language key is `TR`

## [3.0.2](https://github.com/TerryZ/v-dialogs/compare/v3.0.1...v3.0.2) (2024-07-06)

### Bug Fixes

- Fixed `DialogMask` build failure in SSR(HTMLElement is undefined)

## [3.0.1](https://github.com/TerryZ/v-dialogs/compare/v3.0.0...v3.0.1) (2024-07-06)

### Bug Fixes

- Fixed `DialogMask` build failure in SSR(HTMLElement is undefined)

## [3.0.0](https://github.com/TerryZ/v-dialogs/compare/v2.2.0...v3.0.0) (2024-07-06)

### Features

#### Public content

- Added **Message**、**Drawer** dialog types
- Added `header` prop to set the display of the header, `title` prop is only used to set the header text content
- **Alert**、**Message**、**Toast** dialog types added message type quick access function
- Added `shake` prop to set whether to apply the shaking animation reminder for area operations outside the dialog
- The default language change to English
- `closeTime` rename to `duration`

#### Alert

- Added `colorfulShadow` prop to specify whether to display the corresponding color shadow for `warning`、`error` and `success` message types

#### Mask

- Added `pill` prop to set whether to apply pill style to content panel
- Added `icon` prop to set whether display loading icon
- Added `panel` prop to set whether to display the content panel. If it is turned off, the content will be displayed directly on the mask
- Added `appendTo` prop to specify the target area to be covered by the mask

#### Toast

- Added `offset` prop set the distance between the dialog box and the edge of the screen
- `position` rename to `placement`, and removed two center placement options

#### Modal

- Added `DialogModalBox` component form of use
