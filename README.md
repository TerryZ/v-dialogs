# [v-dialogs](https://terryz.github.io/docs-vue3/dialog/)
<!-- &middot; -->
<!-- [![CircleCI](https://circleci.com/gh/TerryZ/v-dialogs/tree/master.svg?style=svg)](https://circleci.com/gh/TerryZ/v-dialogs/tree/master) -->
[![GithubActions](https://github.com/TerryZ/v-dialogs/actions/workflows/npm-publish.yml/badge.svg?branch=master)](https://github.com/TerryZ/v-dialogs/actions/workflows/npm-publish.yml)
[![code coverage](https://codecov.io/gh/TerryZ/v-dialogs/branch/master/graph/badge.svg)](https://codecov.io/gh/TerryZ/v-dialogs)
[![npm version](https://img.shields.io/npm/v/v-dialogs.svg)](https://www.npmjs.com/package/v-dialogs)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://mit-license.org/)
[![npm](https://img.shields.io/npm/dy/v-dialogs.svg)](https://www.npmjs.com/package/v-dialogs)

A simple command-style pop-up dialog components for **Vue3**

- **Alert** Interactive dialog boxes, for notifications that require explicit feedback from the user
- **Modal** Modal container dialog, It is displayed at the center of the screen
- **Drawer** Another modal container dialog, It is displayed at the edge of the screen, and it is the better choice for quickly viewing details
- **Message** Silent message notification, displayed in the vertical center area of ​​the screen
- **Toast** Silent message notification, displayed in the corner of the screen
- **Mask** A screen mask that blocks user actions

If you are using vue 2.x version, please use [v-dialogs 2.x](https://github.com/TerryZ/v-dialogs/tree/dev-vue-2) version instead

## Examples and Documentation

Documentation and examples please visit below sites

- [Github pages](https://terryz.github.io/docs-vue3/dialog/)

## Features

- Simple style, makes it easier to apply in more UI
- Provides 6 types of dialogs: **Modal**, **Drawer**, **Alert**, **Message**, **Mask** and **Toast**
- Command-based call pop-up dialogs
- **Modal** and **Drawer** provide `DialogModalBox` and `DialogDrawerBox` component form
- **Alert**, **Message** and **Toast** types provides message type quick access function
- Built-in 5 languages: `Chinese`, `English`, `Japanese`, `Portuguese` and `Turkish`
- Globally instance(not recommended)

## Installation

```sh
# npm
npm i v-dialogs
# yarn
yarn add v-dialogs
# pnpm
pnpm add v-dialogs
```

## API

```ts
type MessageContent = string | VNode
type ComponentResult = VNode | Component
type ComponentContent = ComponentResult | (() => ComponentResult)

function DialogAlert(
  message?: MessageContent,
  callback?: Function,
  options?: AlertOptions
): Function
function DialogMessage(
  message?: MessageContent,
  callback?: Function,
  options?: MessageOptions
): Function
function DialogToast(
  message?: MessageContent,
  callback?: Function,
  options?: ToastOptions
): Function
function DialogMask(
  message?: MessageContent,
  callback?: Function,
  options?: MaskOptions
): Function
function DialogModal(
  component: ComponentContent,
  options?: ModalOptions
): Function
function DialogDrawer(
  component: ComponentContent,
  options?: DrawerOptions
): Function
```

## Usage

### Confirm and Message

```ts
import { DialogAlert, DialogAlertConfirm, DialogMessage } from 'v-dialogs'

function deleteUser (userId) {
  const message = 'Deleted data cannot be recovered, are you sure?'
  const handleConfirm = () => {
    executeDeleteUser(userId).then(() => {
      DialogMessage('Delete complete.', { messageType: 'success' })
    })
  }
  DialogAlert(message, handleConfirm, { messageType: 'confirm' })
  // or use quick access way
  // DialogAlertConfirm(message, handleConfirm)
}
```

### Modal dialog

```ts
import { DialogModal, DialogAlert } from 'v-dialogs'
import UserProfile from './UserProfile.vue'

DialogModal(UserProfile, {
  width: 900,
  height: 600,
  title: 'User Profile',
  params: {
    userId: 1,
    userName: 'Terry Zeng'
  },
  callback: (name: string, data: unknown[]) => {
    // close Modal dialog and return data
    if (name === 'close') {
      DialogAlert(`Received message: ${data?.[0]}`)
    }
  }
})
```

### Component form

```vue
<template>
  <div>
    <DialogDrawerBox v-model:visible="visible" >
      <UserProfile />
    </DialogDrawerBox>

    <button
      type="button"
      @click="openDialog"
    >Open Drawer</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DialogDrawerBox } from 'v-dialogs'

import UserProfile from './UserProfile.vue'

const visible = ref(false)

function openDialog () {
  visible.value = true
}
</script>
```

### Fetch data

A example for fetch data scenario

```ts
import { DialogMask, DialogMessageSuccess, DialogAlertError } from 'v-dialogs'

function loadDataList () {
  const destroy = DialogMask()

  fetchData()
    .then(data => {
      list.value = data.list
      // Dismiss mask overlay
      destroy()
      DialogMessageSuccess('Data loaded successfully')
    })
    .catch(() => {
      DialogAlertError('Data Load Failure')
    })
}
```

### Message type quick access

**Alert**, **Message** and **Toast** types provides message type quick access function

```ts
import {
  DialogMessage
  DialogMessageSuccess
} from 'v-dialogs'

DialogMessageSuccess('Saved successfully!')
// Equivalent to
DialogMessage('Saved successfully!', { messageType: 'success' })
```

## Globally instance

`v-dialogs` also provides a globally instance to open dialogs, you can use it in any component

The default instance name is `$dlg`

```js
import { createApp } from 'vue'
import dialogs from 'v-dialogs'
import App from 'App.vue'

createApp(App).use(dialogs).mount('#app')
```

> The global instance are only supported as a feature and are not recommended for use

### Option API

```js
export default {
  mounted () {
    this.$dlg.message('Saved successfully!')
  }
}
```

### Composition API

```js
import { getCurrentInstance } from 'vue'

// const $dlg = getCurrentInstance().appContext.config.globalProperties.$dlg
const $dlg = getCurrentInstance().proxy.$dlg

$dlg.message('Saved successfully!')
```
