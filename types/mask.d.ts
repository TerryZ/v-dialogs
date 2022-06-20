import { DialogBaseOption } from './helper'

declare interface MaskOption extends DialogBaseOption {
  /** Shake the dialog when operating outside the dialog */
  shaking?: boolean
  /**
   * The time(second) to automatically close dialog
   */
  closeTime?: boolean | number
}

/**
 * Display a mask layer
 * @param message - The message to display
 * @param callback - respond the dialog close
 * @param options - custom options
 * @returns the dialog key
 */
export function DialogMask (
  message?: string,
  callback?: Function,
  options?: MaskOption
): string
