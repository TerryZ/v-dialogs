# v-dialogs

A simple and powerful dialog for **Vue2**, dialog type including **Modal**, **Alert**, **Mask** and **Toast**
[![npm version](https://img.shields.io/npm/v/v-dialogs.svg)](https://www.npmjs.com/package/v-dialogs)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://mit-license.org/)
[![npm](https://img.shields.io/npm/dy/v-dialogs.svg)](https://www.npmjs.com/package/v-dialogs)

<br><br>

## Demos and Documents
Explorer on

- [English site](https://terryz.github.io/vue/#/dialog)
- [国内站点](https://terryz.gitee.io/vue/#/dialog)

The jQuery version: [bDialog](https://github.com/TerryZ/bDialog)

<br><br>

### The Dialog Icon

the icons in alert dialog used are made by [Elegant Themes](http://www.elegantthemes.com/blog/freebie-of-the-week/beautiful-flat-icons-for-free)

and control icon, toast icon used are come from [IconFont](http://www.iconfont.cn)

<br><br>

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

<br><br>

## Install

``` bash
npm i v-dialogs --save
```

Include plugin in your `main.js` file.

```js
import Vue from 'vue'
import vDialog from 'v-dialogs';
Vue.use(vDialog);
```

## Use case

### Modal

<p align="center"><img src="https://terryz.github.io/image/v-dialogs/v-dialogs-modal.png" alt="v-dialogs-modal" height="411px"></p>

```js
import myComponent from './myComponent';//import component you want to open in Modal dialog

new Vue({
  el: '#app',
  methods: {
    click(){
      //open component in Modal, and passing params to component
      this.$vDialog.modal(myComponent, {
        params: {
          a: 1,
          b: 2
        }
      });
    }
  }
});
```

receive params in component

```js
export default {
  name: 'myComponent',
  props: ['params']
  data(){
    console.log(this.params);//{a:1, b:2}
    return {};
  }
}
```

close dialog and return data in component

```js
export default {
  name: 'myComponent',
  props: ['params']
  data(){
    console.log(this.params);//{a:1, b:2}
    return {};
  },
  methods: {
    closeDialog(){
      let data = {
        a: 2,
        b: 4
      };
      //close current Modal dialog and return data to caller
      this.$vDialog.close(data);
    }
  }
}
```

### Alert

<p align="center"><img src="https://terryz.github.io/image/v-dialogs/v-dialogs-alert.png" alt="v-dialogs-alert" height="290px"></p>

```js
//call a message alert dialog
this.$vDialog.alert('This is a <b>Vue</b> dialog plugin: vDialog!');

//call a message alert dialog with dialog close callback
this.$vDialog.alert('This is a <b>Vue</b> dialog plugin: vDialog!',function(){
  //your callback code
});

//call a custom type message alert dialog with dialog close callback
this.$vDialog.alert('This is a <b>Vue</b> dialog plugin: vDialog!',function(){
  //your callback code
},{
  messageType: 'error',
  closeTime: 2,// auto close alert dialog in 2 second,
  language: 'en'// i18n support 'cn', 'en', 'jp'
});
```

### Mask

<p align="center"><img src="https://terryz.github.io/image/v-dialogs/v-dialogs-mask.png" alt="v-dialogs-mask" height="307px"></p>

```js
//open a full screen mask
this.$vDialog.mask();

//use custom message
this.$vDialog.mask('my data loading...');

//use mask with callback
this.$vDialog.mask('my data loading...', function(){
  // do something when mask close
});
```

some time, you can use mask like this:
```js
let that = this;
let dialogKey = this.$vDialog.mask();
// do some http request
axios.post(...).then(resp){
  // do your business
  that.$vDialog.close(null, dialogKey);
};
```


### Toast

<p align="right"><img src="https://terryz.github.io/image/v-dialogs/v-dialogs-toast.png" alt="v-dialogs-toast" height="322px"></p>

open a Toast dialog in a corner
```js
//open a Toast dialog with message, default show to right bottom position
this.$vDialog.toast('This is a Vue <b>vDialog</b> Toast!');

//open a Toast dialog with a close callback
this.$vDialog.toast('This is a Vue <b>vDialog</b> Toast!', function(){
  // do something...
});

//open a Toast with some options
this.$vDialog.toast('This is a Vue <b>vDialog</b> Toast!',null, {
  messageType: 'warning',//theme set
  position: 'topLeft',// show position
  dialogCloseButton: false, // show dialog without close button
  closeTime: 3 // auto close toast times(second)
});
```

messageType:

- 'info'(default)
- 'warning'
- 'error'
- 'success'

position:

- 'topLeft'
- 'topCenter'
- 'topRight'
- 'bottomLeft'
- 'bottomCenter'
- 'bottomRight'
