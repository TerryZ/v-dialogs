import { DialogBaseOption, DialogMessageType, MessageDialog } from './base'

declare interface ToastOption extends DialogBaseOption {
  /**
   * Message type
   * - `info` default
   * - `warning`
   * - `error`
   * - `success`
   */
  messageType?: DialogMessageType
  /**
   * Message type icon
   * @default true
   */
  icon?: boolean
  /**
   * Display close button
   * @default false
   */
  closeButton?: boolean
  /**
   * The number of milliseconds to automatically close the dialog
   *
   * set to 0 to disable auto close
   *
   * @default 3000
   */
  duration?: number
  /**
   * The distance to the top of viewport
   * @default 16
   */
  offset?: string | number
  /**
   * The placement of the toast dialog
   * @default `top-right`
   */
  placement?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

/**
 * Open a toast dialog
 * @param message - The message to display
 * @param callback - respond the dialog close
 * @param options - dialog options
 * @returns the method to close dialog
 */
export declare const DialogToast: typeof MessageDialog<ToastOption>
/**
 * Open an warning type toast dialog
 * @param message - The message to display
 * @param callback - respond the dialog close
 * @param options - dialog options
 * @returns the method to close dialog
 */
export declare const DialogToastWarning: typeof MessageDialog<ToastOption>
/**
 * Open an error type toast dialog
 * @param message - The message to display
 * @param callback - respond the dialog close
 * @param options - dialog options
 * @returns the method to close dialog
 */
export declare const DialogToastError: typeof MessageDialog<ToastOption>
/**
 * Open an success type toast dialog
 * @param message - The message to display
 * @param callback - respond the dialog close
 * @param options - dialog options
 * @returns the method to close dialog
 */
export declare const DialogToastSuccess: typeof MessageDialog<ToastOption>
