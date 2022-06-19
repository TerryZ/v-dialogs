import { DialogBaseOption } from './helper'

declare interface MaskOption extends DialogBaseOption {
  /** Shake the dialog when operating outside the dialog */
  shaking?: boolean,
  /**
   * The time(second) to automatically close dialog
   */
  closeTime?: boolean | number
}

export function DialogMask (
  message?: string,
  callback?: Function,
  options?: MaskOption
)
