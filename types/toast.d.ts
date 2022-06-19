import { DialogBaseOption } from './helper'

declare interface ToastOption extends DialogBaseOption {
  /**
   * The title text displayed in header
   * - set to false to close header
   */
  title?: boolean | string
  /**
   * Toast message type
   * - `info` default
   * - `warning`
   * - `error`
   * - `success`
   */
  messageType?: string
  /** Message type icon */
  icon?: boolean
  /**
   * The time(second) to automatically close dialog
   */
  closeTime?: boolean | number
  /** Display close button */
  closeButton?: boolean
  /**
   * Toast dialog display position
   *
   * - `topLeft`
   * - `topCenter`
   * - `topRight`
   * - `bottomLeft`
   * - `bottomCenter`
   * - `bottomRight` default
   */
  position?: string
}

/**
 * Display a toast dialog
 * @param message - The message to display
 * @param callback - respond the dialog close
 * @param options - custom options
 */
export function DialogToast (
  message: string,
  callback?: Function,
  options?: ToastOption
)
