import { ref, h, nextTick, defineComponent } from 'vue'

import './styles/icon.scss'
import './styles/animated.sass'
import './styles/dialog.sass'

import { DIALOG_KEY_PREFIX } from './constants'
import { generateDialogRenderOption } from './utils/options'
import { restoreDocumentBodyOverflow } from './utils/instance'

import DialogModal from './components/Modal'
import DialogAlert from './components/Alert'
import DialogToast from './components/Toast'
import DialogMask from './components/Mask'

export default defineComponent({
  name: 'VDialogsContainer',
  components: {
    DialogModal,
    DialogAlert,
    DialogToast,
    DialogMask
  },
  setup (props, { expose }) {
    const dialogs = ref([])
    let serialNumber = 0

    function addDialog (option) {
      const { singletonKey } = option
      if (singletonKey) {
        if (dialogs.value.some(val => val.singletonKey === singletonKey)) {
          return
        }
      }

      serialNumber++
      const key = DIALOG_KEY_PREFIX + serialNumber
      option.dialogKey = key
      // console.dir(option)
      dialogs.value.push(option)
      return key
    }
    /**
     * Close dialog, the last one or specified key dialog (Modal, Alert, Mask, Toast)
     *
     * @param {string} key - the dialog key
     *
     * @example
     * const key = this.$dlg.mask('your msg')
     * this.$dlg.close(key)
     */
    function close (key) {
      if (!dialogs.value.length) return
      closeDialog(key || dialogs.value[dialogs.value.length - 1].dialogKey)
    }
    /**
     * Close dialog (remove dialogs array item) and call user callback function
     * @private
     *
     * @param {string} key - dialog key
     * @param {boolean} cancel - trigger cancelCallback or not
     * @param {object} data - return data when close dialog(Modal)
     */
    function closeDialog (key, cancel, data) {
      if (!key) return
      const dlg = dialogs.value.find(val => val.dialogKey === key)
      if (!dlg) return

      // if (this.$refs[dlg.dialogKey]) {
      //   this.$refs[dlg.dialogKey].show = false
      // }
      // waiting for dialog close animation finish
      window.setTimeout(() => {
        // remove current dialog from list
        dialogs.value = dialogs.value.filter(val => val.dialogKey !== key)
        nextTick(() => {
          const { callback, cancelCallback } = dlg

          if (cancel) {
            if (typeof cancelCallback === 'function') cancelCallback()
          } else {
            if (typeof callback === 'function') callback(data)
          }
          restoreDocumentBodyOverflow()
        })
      }, 200)
    }
    /**
     * Close all dialogs
     * @param {function} callback - the callback fired when all of dialogs closed
     */
    function closeAll (callback) {
      if (dialogs.value.length) {
        dialogs.value = []
      }

      restoreDocumentBodyOverflow()

      nextTick(() => {
        if (typeof callback === 'function') callback()
      })
    }

    expose({ addDialog, close, closeAll })

    return () => {
      const dialogList = dialogs.value.map((val, index) => {
        const option = generateDialogRenderOption(val, index, closeDialog)
        return h(`dialog-${val.type}`, option)
      })
      return h('div', { class: 'v-dialogs-container' }, dialogList)
    }
  }
})
