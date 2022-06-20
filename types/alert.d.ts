import { DialogBaseOption } from './helper'

declare interface AlertOption extends DialogBaseOption {
  /**
   * The title text displayed in header
   * - set to false to close header
   */
  title?: boolean | string
  /**
   * Alert message type
   * - `info` default
   * - `warning`
   * - `error`
   * - `success`
   * - `confirm`
   */
  messageType?: 'info' | 'warning' | 'error' | 'success' | 'confirm'
  /** Message type icon */
  icon?: boolean
  /** Shake the dialog when operating outside the dialog */
  shaking?: boolean
  /**
   * The time(second) to automatically close dialog
   */
  closeTime?: boolean | number
  /**
   * Respond the cancel button click in `confirm` type alert
   */
  cancelCallback?: Function
  /**
   * The dialog background overlay
   */
  backdrop?: boolean
  /** Click outside the dialog to close dialog */
  backdropClose?: boolean
}

/**
 * Display a alert dialog
 * @param message - The message to display
 * @param callback - respond the dialog close
 * @param options - custom options
 * @returns the dialog key
 */
export function DialogAlert (
  message: string,
  callback?: Function,
  options?: AlertOption
): string
