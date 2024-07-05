# [v-dialogs](https://terryz.github.io/vue/#/dialog)
<!-- &middot; -->
[![CircleCI](https://circleci.com/gh/TerryZ/v-dialogs/tree/master.svg?style=svg)](https://circleci.com/gh/TerryZ/v-dialogs/tree/master)
[![code coverage](https://codecov.io/gh/TerryZ/v-dialogs/branch/master/graph/badge.svg)](https://codecov.io/gh/TerryZ/v-dialogs)
[![npm version](https://img.shields.io/npm/v/v-dialogs.svg)](https://www.npmjs.com/package/v-dialogs)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://mit-license.org/)
[![npm](https://img.shields.io/npm/dy/v-dialogs.svg)](https://www.npmjs.com/package/v-dialogs)

A simple and clean instructional dialog plugin for **Vue2**, dialog type including **Modal**, **Alert**, **Mask** and **Toast**

## Examples and Documentation

Documentation and examples please visit below sites

- [Github pages](https://terryz.github.io/docs-vue3/dialog/)

## Features

- Provides 6 types of dialogs: **Modal**, **Drawer**, **Alert**, **Message**, **Mask** and **Toast**
- Functional form of use
- **Modal** and **Drawer** provide `DialogModalBox` and `DialogDrawerBox` component form
- **Alert**, **Message** and **Toast** types provides message type quick access function
- Built-in 4 languages: `Chinese`, `English`, `Japanese` and `Portuguese`
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

DialogAlert(message?: MessageContent, callback?: Function, options?: AlertOptions): Function
DialogMessage(message?: MessageContent, callback?: Function, options?: MessageOptions): Function
DialogToast(message?: MessageContent, callback?: Function, options?: ToastOptions): Function
DialogMask(message?: MessageContent, callback?: Function, options?: MaskOptions): Function
DialogModal(component: ComponentContent, options?: ModalOptions): Function
DialogDrawer(component: ComponentContent, options?: DrawerOptions): Function
```

## Usage

### Confirm and Message

```ts
import { DialogAlert, DialogMessage } from 'v-dialogs'

function deleteUser (userId) {
  DialogAlert('Deleted data cannot be recovered, are you sure?', () => {
    executeDeleteUser(userId).then(() => {
      DialogMessage('Delete complete.', { messageType: 'success' })
    })
  }, { messageType: 'confirm' })
}
```

### Fetch data

```ts
import { DialogMask, DialogMessage, DialogAlert } from 'v-dialogs'

function loadDataList () {
  const destroy = DialogMask('Data loading...')

  fetchData()
    .then(data => {
      list.value = data.list
      // Dismiss mask overlay
      destroy()
      DialogMessage('Data loaded successfully', { messageType: 'success' })
    })
    .catch(() => {
      DialogAlert('Data Load Failure', { messageType: 'error' })
    })
}
```

### Message type quick access

**Alert**, **Message** and **Toast** types provides message type quick access function

```ts
import {
  DialogMessage
  DialogMessageWarning,
  DialogMessageError,
  DialogMessageSuccess
} from 'v-dialogs'

DialogMessageSuccess('Saved successfully!')
// Equivalent to
DialogMessage('Saved successfully!', { messageType: 'success' })
```

### Alert

```js
// Functional open alert dialog
DialogAlert(message, [callback], [option])
// Open alert dialog with globally v-dialogs instance
this.$dlg.alert(message, [callback], [options])

// Examples
import { DialogAlert } from 'v-dialogs'
function deleteUser (userId) {
  DialogAlert('Deleted data cannot be recovered, are you sure?', () => {
    executeDeleteUser(userId).then(() => {
      DialogAlert('Delete complete.', { messageType: 'success' })
    })
  }, { messageType: 'confirm' })
}
```

### Modal

```js
// Functional open modal dialog
DialogModal(component, [options])
// Open modal dialog with globally v-dialogs instance
this.$dlg.modal(component, [options])

// Examples
import { DialogModal, DialogAlert } from 'v-dialogs'
import Page from './Page.vue'

DialogModal(Page, {
  width: 400,
  height: 300,
  title: 'User Profile',
  params: {
    userId: 1,
    userName: 'Terry Zeng'
  },
  callback: data => {
    DialogAlert(`Received message: ${data}`)
  }
})

// Globally instance example
this.$dlg.modal(Page, {
  ...
  callback: data => {
    this.$dlg.alert(`Received message: ${data}`)
  }
})
```

### Toast

```js
// Functional open toast dialog
DialogToast(message, [callback], [option])
// Open toast dialog with globally v-dialogs instance
this.$dlg.toast(message, [callback], [options])

// Examples
import { DialogToast } from 'v-dialogs'
// Display message in toast
DialogToast(message)
// Display message with callback
DialogToast(message, callback)
// Display message with options
DialogToast(message, options)
// Display message with callaback and options
DialogToast(message, callback, options)
```

### Mask

```js
// Functional open mask dialog
DialogMask([message], [callback], [options])
// Open mask dialog with globally v-dialogs instance
this.$dlg.mask([message], [callback], [options])

import { DialogMask } from 'v-dialogs'
// Display default message
DialogMask()
// Display specify message
DialogMask('Data loading, please hold on a moment...')
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
