# v-dialogs

> A simple and powerful dialog, dialog type including Modal, Alert, Mask and Toast, based on Vue2.x

## Install

``` bash
# install dependencies
npm i v-dialogs --save
```

Include plugin in your `main.js` file.

```js
import Vue from 'vue'
import vDialog from 'v-dialogs';
...

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

<p align="center"><img src="https://terryz.github.io/image/v-dialogs/v-dialogs-toast.png" alt="v-dialogs-toast" height="322px"></p>

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
