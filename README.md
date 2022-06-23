# [v-dialogs](https://terryz.github.io/vue/#/dialog)
<!-- &middot; -->
[![CircleCI](https://circleci.com/gh/TerryZ/v-dialogs/tree/master.svg?style=svg)](https://circleci.com/gh/TerryZ/v-dialogs/tree/master)
[![code coverage](https://codecov.io/gh/TerryZ/v-dialogs/branch/master/graph/badge.svg)](https://codecov.io/gh/TerryZ/v-dialogs)
[![npm version](https://img.shields.io/npm/v/v-dialogs.svg)](https://www.npmjs.com/package/v-dialogs)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://mit-license.org/)
[![npm](https://img.shields.io/npm/dy/v-dialogs.svg)](https://www.npmjs.com/package/v-dialogs)

A simple and clean instructional dialog plugin for **Vue2**, dialog type including **Modal**, **Alert**, **Mask** and **Toast**

## Examples and Documentation

Explorer on

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
// Globally instance open alert dialog
this.$dlg.alert(message, [callback], [options])

// Examples
import { DialogAlert } from 'v-dialogs'
// alert message
DialogAlert(message)
// alert message with callback
DialogAlert(message, callback)
// alert message with options
DialogAlert(message, option)
// alert message with callaback and options
DialogAlert(message, callback, option)
```

### Modal

```js
// Functional open modal dialog
DialogModal(component, [options])
// Globally instance open modal dialog
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
// Globally instance open toast dialog
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
// Globally instance open mask dialog
// show default message
this.$dlg.mask()
// show specify message
this.$dlg.mask('Data loading, please hold on a moment...')

// Functional open mask dialog
import { DialogMask } from 'v-dialogs'

DialogMask([message], [callback])
```

### DialogHelper

#### close (key?: string): void

Close a dialog, when no specified `key` parameter, will close the last on opened dialog

```js
import { DialogMask, DialogHelper } from 'v-dialogs'

const key = DialogMask()
// do your job stuff
job().then(() => {
  // close mask with key
  DialogHelper.close(key)
})
```

#### closeAll (): void

Close all dialogs at once

```js
import { DialogHelper } from 'v-dialogs'

fetchData()
  .then(() => {
    // do fetch data success work
    ...
  })
  .catch(error => {
    // login state timeout for example
    if (error.isLoginTimeout) {
      // close all opened dialogs
      DialogHelper.closeAll()
      // redirect to login page
      router.push({ path: '/login' })
    }
  })
```
