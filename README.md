# [v-dialogs](https://terryz.github.io/vue/#/dialog) &middot; [![npm version](https://img.shields.io/npm/v/v-dialogs.svg)](https://www.npmjs.com/package/v-dialogs) [![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://mit-license.org/) [![npm](https://img.shields.io/npm/dy/v-dialogs.svg)](https://www.npmjs.com/package/v-dialogs)

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
// Globally instance open alert dialog
// alert message
this.$dlg.alert(message)
// alert message with callback
this.$dlg.alert(message, callback)
// alert message with options
this.$dlg.alert(message, options)
// alert message with callaback and options
this.$dlg.alert(message, callback, options)

// Functional open alert dialog
import { DialogAlert } from 'v-dialogs'

DialogAlert(message, [callback], [option])
```

### Modal

```js
import Profile from './Profile.vue'

// Globally instance open modal dialog
this.$dlg.modal(Profile, {
  width: 400,
  height: 300,
  title: 'User Profile',
  params: {
    userId: 1,
    userName: 'Terry Zeng'
  },
  callback: data => {
    this.$dlg.alert(`Received message: ${data}`)
  }
})

// Functional open modal dialog
import { DialogModal } from 'v-dialogs'

DialogModal(Profile, {
  ...options
})
```

### Toast

```js
// Globally instance open toast dialog
// show message in corner
this.$dlg.toast(message)
// show message with callback
this.$dlg.toast(message, callback)
// show message with options
this.$dlg.toast(message, options)
// show message with callaback and options
this.$dlg.toast(message, callback, options)

// Functional open toast dialog
import { DialogToast } from 'v-dialogs'

DialogToast(message, [callback], [option])
```

### Mask

```js
const key = this.$dlg.mask('Data loading, please hold on a moment...')

// do some stuff
job().then(() => {
  // close mask layer when job finish
  this.$dlg.close(key)
})
```

### DialogHelper

#### close

```js
import { DialogMask, DialogHelper } from 'v-dialogs'

const key = DialogMask()
// do your job stuff
job().then(() => {
  // close mask with key
  DialogHelper.close(key)
})
```

#### closeAll

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
