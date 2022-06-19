import { CN } from '../language'
import { ALERT, TOAST, START_Z_INDEX } from '../constants'
import { calculateDialogTop } from '../utils/helper'

export default {
  props: {
    type: { type: String, default: ALERT },
    /** Display dialog backdrop */
    backdrop: { type: Boolean, default: true },
    /** Click backdrop to close dialog */
    backdropClose: { type: Boolean, default: false },
    /**
     * The message show in dialog (work on alert, mask, toast mode)
     */
    message: { type: String, default: '' },
    /**
     * Dialog title bar text or title bar show control
     *
     * @example
     * titleContent: false // close title bar
     */
    titleContent: { type: [String, Boolean], default: 'Dialog' },
    contentClass: { type: String, default: '' },
    /** Dialog width */
    width: { type: Number, default: 700 },
    /** Dialog height */
    height: { type: Number, default: 400 },
    language: { type: String, default: CN },
    /**
     * Dialog inner key
     * @private
     */
    dialogKey: { type: String, default: '' },
    /**
     * auto close dialog seconds
     */
    closeTime: { type: [Boolean, Number], default: false },
    /**
     * Close dialog callback, trigger by some case:
     *
     * click the close button in top right corner(Modal,Toast mode)
     * click 'cancel' button in Alert mode ('confirm' message type)
     */
    cancelCallback: { type: [Boolean, Function], default: false },
    /**
     * dialog outside click with shaking animation
     */
    shaking: { type: Boolean, default: true },
    dialogIndex: { type: Number, required: true }
  },
  data () {
    return {
      bodyHeight: 50,
      dialogTop: 0,
      dialogZIndex: 0,
      backdropZIndex: 0,
      resizeTimeout: null,
      shake: false,
      show: false
    }
  },
  computed: {
    dialogStyles () {
      return {
        width: this.width + 'px',
        height: this.height + 'px',
        top: this.dialogTop + 'px'
      }
    }
  },
  methods: {
    /**
     * backdrop click animate
     */
    outsideClick () {
      if (!this.backdrop) return

      if (this.backdropClose) {
        this.closeDialog(true)
        return
      }

      if (!this.shaking) return

      this.shake = true
      setTimeout(() => { this.shake = false }, 750)
    },
    /**
     * Close current dialog
     *
     * @param {boolean} trigger whether close dialog and trigger callback function
     * @param {object} data return data when dialog close(only for modal)
     */
    closeDialog (trigger, data) {
      this.$emit('close', this.dialogKey, trigger, data)
    },
    calculateLayerLevel () {
      // setup dialog and backdrop z-index
      const step = 50
      this.dialogZIndex = START_Z_INDEX + (step * this.dialogIndex)
      this.backdropZIndex = this.dialogZIndex - 10
    },
    // auto close dialog in specify times
    autoClose () {
      const { closeTime } = this
      if (!closeTime) return

      const time = closeTime * 1000
      setTimeout(() => { this.closeDialog(false) }, time)
    },
    resizeHandler () {
      // ignore resize events as long as an actualResizeHandler execution is in the queue
      if (this.resizeTimeout) return

      this.resizeTimeout = setTimeout(() => {
        this.resizeTimeout = null
        this.dialogTop = calculateDialogTop(this.height)
        // The actualResizeHandler will execute at a rate of 15fps
      }, 100)
    }
  },
  mounted () {
    this.calculateLayerLevel()
    this.show = true

    this.autoClose()

    if (this.type === TOAST) return

    window.addEventListener('resize', this.resizeHandler, false)
  },
  destroyed () {
    if (this.type === TOAST) return

    window.removeEventListener('resize', this.resizeHandler, false)
  }
}
