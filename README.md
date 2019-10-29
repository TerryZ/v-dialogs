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

```
npm i -S v-dialogs
```

Include plugin in your `main.js` file.

```js
import Vue from 'vue'
import Dialog from 'v-dialogs'
Vue.use(Dialog, { global config options... })
```

## Usage

### Modal

```js
import Profile from './Profile.vue'

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
```

### Alert

```js
// alert message
this.$dlg.alert('message')
// alert message with callback
this.$dlg.alert('message', () => { // do somthing })
// alert message with options
this.$dlg.alert('message', { ...options })
// alert message with callaback and options
this.$dlg.alert('message', callback, options)
```

### Mask

```js
const key = this.$dlg.mask('Data loading, please hold on a moment...')

// do some stuff
job().then(resp => {
  // close mark layer when job done
  this.$dlg.close(key)
})
```

### Toast

```js
// show message in corner
this.$dlg.taost('message')
// show message with callback
this.$dlg.taost('message', () => { // do somthing })
// show message with options
this.$dlg.taost('message', { ...options })
// show message with callaback and options
this.$dlg.taost('message', callback, options)
```

## Vue plugin series

| Plugin | Status | Description |
| :---------------- | :-- | :-- |
| [v-page](https://github.com/TerryZ/v-page) | [![npm version](https://img.shields.io/npm/v/v-page.svg)](https://www.npmjs.com/package/v-page) | A simple pagination bar, including length Menu, i18n support |
| [v-dialogs](https://github.com/TerryZ/v-dialogs) | [![npm version](https://img.shields.io/npm/v/v-dialogs.svg)](https://www.npmjs.com/package/v-dialogs) | A simple and powerful dialog, including Modal, Alert, Mask and Toast modes |
| [v-tablegrid](https://github.com/TerryZ/v-tablegrid) | [![npm version](https://img.shields.io/npm/v/v-tablegrid.svg)](https://www.npmjs.com/package/v-tablegrid) | A simpler to use and practical datatable |
| [v-uploader](https://github.com/TerryZ/v-uploader) | [![npm version](https://img.shields.io/npm/v/v-uploader.svg)](https://www.npmjs.com/package/v-uploader) | A Vue2 plugin to make files upload simple and easier, <br>you can drag files or select file in dialog to upload |
| [v-ztree](https://github.com/TerryZ/v-ztree) | [![npm version](https://img.shields.io/npm/v/v-ztree.svg)](https://www.npmjs.com/package/v-ztree) | A simple tree for Vue2, support single or multiple(check) select tree, <br>and support server side data |
| [v-gallery](https://github.com/TerryZ/v-gallery) | [![npm version](https://img.shields.io/npm/v/v-gallery.svg)](https://www.npmjs.com/package/v-gallery) | A Vue2 plugin make browsing images in gallery |
| [v-region](https://github.com/TerryZ/v-region) | [![npm version](https://img.shields.io/npm/v/v-region.svg)](https://www.npmjs.com/package/v-region) | A simple region selector, provide Chinese administrative division data |
| [v-selectpage](https://github.com/TerryZ/v-selectpage) | [![npm version](https://img.shields.io/npm/v/v-selectpage.svg)](https://www.npmjs.com/package/v-selectpage) | A powerful selector for Vue2, list or table view of pagination, <br>use tags for multiple selection, i18n and server side resources supports |
| [v-suggest](https://github.com/TerryZ/v-suggest) | [![npm version](https://img.shields.io/npm/v/v-suggest.svg)](https://www.npmjs.com/package/v-suggest) | A Vue2 plugin for input suggestions by autocomplete |
| [v-playback](https://github.com/TerryZ/v-playback) | [![npm version](https://img.shields.io/npm/v/v-playback.svg)](https://www.npmjs.com/package/v-playback) | A Vue2 plugin to make video play easier |
| [v-selectmenu](https://github.com/TerryZ/v-selectmenu) | [![npm version](https://img.shields.io/npm/v/v-selectmenu.svg)](https://www.npmjs.com/package/v-selectmenu) | A simple, easier and highly customized menu solution |
