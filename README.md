# [v-dialogs](https://terryz.github.io/vue/#/dialog)
<!-- &middot; -->
[![CircleCI](https://circleci.com/gh/TerryZ/v-dialogs/tree/master.svg?style=svg)](https://circleci.com/gh/TerryZ/v-dialogs/tree/master)
[![code coverage](https://codecov.io/gh/TerryZ/v-dialogs/branch/master/graph/badge.svg)](https://codecov.io/gh/TerryZ/v-dialogs)
[![npm version](https://img.shields.io/npm/v/v-dialogs.svg)](https://www.npmjs.com/package/v-dialogs)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://mit-license.org/)
[![npm](https://img.shields.io/npm/dy/v-dialogs.svg)](https://www.npmjs.com/package/v-dialogs)

A simple and clean instructional dialog plugin for **Vue2**, dialog type including **Modal**, **Alert**, **Mask** and **Toast**

## Examples and Documentation

Live Examples on [CodePen](https://codepen.io/terry05/pen/JjLoxMN), more examples and documentation please visit below

- [English site](https://terryz.github.io/vue/#/dialog)
- [国内站点](https://terryz.gitee.io/vue/#/dialog)

The jQuery version: [bDialog](https://github.com/TerryZ/bDialog)

## The Dialog Icon

The icons in alert dialog used are made by [Elegant Themes](http://www.elegantthemes.com/blog/freebie-of-the-week/beautiful-flat-icons-for-free)

The control icon, toast icon used are come from [IconFont](http://www.iconfont.cn)

## Installation

```sh
npm i -S v-dialogs
```

Include plugin in your project

```js
import Vue from 'vue'
import Dialogs from 'v-dialogs'
Vue.use(Dialogs, {
  // global config options...
})
```

## Usage

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

### DialogHelper

Dialog helper collection

#### close(key?: string): void

Close a dialog, when no specified `key` parameter, will close the last one opened dialog

```js
import { DialogMask, DialogHelper } from 'v-dialogs'

const key = DialogMask()
// do your job stuff
doSomeJobStuff().then(() => {
  // close mask with key
  DialogHelper.close(key)
})
```

#### closeAll(): void

Close all dialogs at once

```js
import { DialogHelper } from 'v-dialogs'

fetchData()
  .then(() => {
    // Do fetch data success work
    ...
  })
  .catch(error => {
    // Login state timeout for example
    if (error.isLoginTimeout) {
      // Close all opened dialogs
      DialogHelper.closeAll()
      // Redirect to login page
      router.push({ path: '/login' })
    }
  })
```
