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

let serialNumber = 0

export default {
  name: 'v-dialogs-container',
  components: {
    DialogModal,
    DialogAlert,
    DialogToast,
    DialogMask
  },
  data () {
    return {
      dialogs: []
    }
  },
  render (h) {
    const { dialogs, closeDialog } = this
    const dialogList = dialogs.map((val, index) => {
      const option = generateDialogRenderOption(val, index, closeDialog)
      return h(`dialog-${val.type}`, option)
    })
    return h('div', { class: 'v-dialogs-container' }, dialogList)
  },
  methods: {
    addDialog (option) {
      const { singletonKey } = option
      if (singletonKey) {
        if (this.dialogs.some(val => val.singletonKey === singletonKey)) {
          return
        }
      }

      serialNumber++
      const key = DIALOG_KEY_PREFIX + serialNumber
      option.dialogKey = key
      // console.dir(option)
      this.dialogs.push(option)
      return key
    },
    /**
     * Close dialog, the last one or specified key dialog (Modal, Alert, Mask, Toast)
     *
     * @param {string} key - the dialog key
     *
     * @example
     * const key = this.$dlg.mask('your msg')
     * this.$dlg.close(key)
     */
    close (key) {
      const { dialogs } = this
      if (!dialogs.length) return
      this.closeDialog(key || dialogs[dialogs.length - 1].dialogKey)
    },
    /**
     * Close dialog (remove dialogs array item) and call user callback function
     * @private
     *
     * @param {string} key - dialog key
     * @param {boolean} cancel - trigger cancelCallback or not
     * @param {object} data - return data when close dialog(Modal)
     */
    closeDialog (key, cancel, data) {
      if (!key) return
      const dlg = this.dialogs.find(val => val.dialogKey === key)
      if (!dlg) return

      if (this.$refs[dlg.dialogKey]) {
        this.$refs[dlg.dialogKey].show = false
      }
      // waiting for dialog close animation finish
      window.setTimeout(() => {
        // remove current dialog from list
        this.dialogs = this.dialogs.filter(val => val.dialogKey !== key)
        this.$nextTick(() => {
          const { callback, cancelCallback } = dlg

          if (cancel) {
            if (cancelCallback && typeof cancelCallback === 'function') {
              cancelCallback()
            }
          } else {
            if (callback && typeof callback === 'function') {
              callback(data)
            }
          }
          restoreDocumentBodyOverflow()
        })
      }, 200)
    },
    /**
     * Close all dialogs
     * @param {function} callback - the callback fired when all of dialogs closed
     */
    closeAll (callback) {
      if (this.dialogs.length) {
        this.dialogs = []
      }

      restoreDocumentBodyOverflow()

      this.$nextTick(() => {
        if (callback && typeof callback === 'function') callback()
      })
    }
  }
}
