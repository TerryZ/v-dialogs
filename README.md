# v-dialog

> A simple and powful dialog, dialog type including Modal, Alert, Mask and Toast, based on Vue2.x

## Install

``` bash
# install dependencies
npm i v-dialog --save
```

Include plugin in your `main.js` file.

```js
import Vue from 'vue'
import vDialog from 'v-dialog';
...

Vue.use(vDialog);
```

## Use case

### Modal

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

### Alert

### Mask

### Toast
