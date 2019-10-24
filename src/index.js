import { getContainer } from './Dialog'

export default {
  install (Vue, options = {}) {
    /**
     * Merge options
     * @param {object} p
     */
    const merge = p => {
      const params = {}
      const { language, closeButton, maxButton, icon } = options
      params.language = typeof language === 'string' ? language : 'cn'
      if (typeof closeButton === 'boolean') params.closeButton = closeButton
      if (typeof maxButton === 'boolean') params.maxButton = maxButton
      if (typeof icon === 'boolean') params.icon = icon
      return Object.assign({}, params, p)
    }
    /**
     * Handle the arguments
     * @param {array} args
     *
     * use alert for example
     *
     * this.$dlg.alert('some text')
     * this.$dlg.alert('some text', callback)
     * this.$dlg.alert('some text', options)
     * this.$dlg.alert('some text', callback, options)
     */
    const paramSet = args => {
      let params = {}

      if (args.length === 3 && typeof args[2] === 'object') params = args[2]
      if (args.length === 2 && typeof args[1] === 'object') params = args[1]
      if (typeof args[1] === 'function') params.callback = args[1]

      params = merge(params)
      params.message = typeof args[0] === 'string' ? args[0] : ''
      return params
    }

    /**
     * Define v-dialogs api
     */
    Object.defineProperty(Vue.prototype, options.instanceName || '$dlg', {
      value: {
        modal (component, params = {}) {
          if (!component) return
          params = merge(params)
          params.component = component
          return getContainer().addModal(params)
        },
        /**
         * Open a Alert dialog
         *
         * @param message [string] (required)
         * @param callback [function] (optional)
         * @param params [object] (optional)
         *
         * @returns dialog key [string]
         *
         * open a information type Alert dialog
         * this.$dlg.alert('some message...')
         *
         * open a information type Alert dialog and do something after dialog close
         * this.$dlg.alert('some message...', ()=>{ do something... })
         *
         * open a Alert dialog with options
         * this.$dlg.alert('some message...', { messageType: 'error' })
         *
         * open a Alert dialog with callback and options
         * this.$dlg.alert('some message...', ()=>{ do something... }, { messageType: 'error' })
         */
        alert () {
          if (!arguments.length || !arguments[0]) return
          return getContainer().addAlert(paramSet(arguments))
        },
        mask () {
          return getContainer().addMask(paramSet(arguments))
        },
        toast () {
          if (!arguments.length || !arguments[0]) return
          return getContainer().addToast(paramSet(arguments))
        },
        close (key) {
          getContainer().close(key)
        },
        closeAll (callback) {
          getContainer().closeAll(callback)
        }
      }
    })
  }
}
