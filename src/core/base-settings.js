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
  /** Display dialog header */
  header: { type: Boolean, default: true },
  title: { type: String, default: '' },
  message: { type: [String, Object], default: '' },
  /** Dialog width */
  width: { type: Number, default: 0 },
  /** Dialog height */
  height: { type: Number, default: 0 },
  shake: { type: Boolean, default: false },
  language: { type: String, default: EN },
  callback: { type: Function, default: undefined }
}

export const baseEmits = [EMIT_CLOSE, EMIT_RENDER_DIALOG]

/**
 * Component properties that cannot be overridden
 */
export const alertEnforcedSettings = {
  backdrop: true
}
export const modalEnforcedSettings = {
  backdrop: true,
  backdropClose: false
}
export const maskEnforcedSettings = {
  backdrop: true,
  backdropClose: false,
  shake: false
}
export const drawerEnforcedSettings = {
  shake: false
}
