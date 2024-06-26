import { EMIT_CLOSE, EMIT_RENDER_DIALOG } from '../constants'
import { EN } from '../language'

export const baseProps = {
  /** Dialog key */
  dialogKey: { type: String, default: '' },
  dialogIndex: { type: Number, required: true },
  singletonKey: { type: String, default: '' },
  customClass: { type: String, default: '' },
  /** Display dialog backdrop */
  backdrop: { type: Boolean, default: true },
  /** Click backdrop to close dialog */
  backdropClose: { type: Boolean, default: false },
  /** whether to display header */
  header: { type: Boolean, default: true },
  title: { type: String, default: '' },
  message: { type: [String, Object], default: '' },
  /** Dialog width */
  width: { type: Number, default: 0 },
  /** Dialog height */
  height: { type: Number, default: 0 },
  shake: { type: Boolean, default: false },
  /**
   * Auto close dialog milliseconds
   * - 0: disabled automatic close
   * - number of milliseconds: specify times to automatic close dialog
   */
  duration: { type: Number, default: 0 },
  language: { type: String, default: EN },
  callback: { type: Function, default: undefined }
}

export const baseEmits = [EMIT_CLOSE, EMIT_RENDER_DIALOG]
