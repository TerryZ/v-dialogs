import { DialogBaseOption, DialogMessageType, MessageDialog } from './base'

declare interface AlertOption extends DialogBaseOption {
  /**
   * Display the header
   * @default true
   */
  header?: boolean
  /**
   * The title text displayed in header
   */
  title?: string
  /**
   * Message type
   * - `info` default
   * - `warning`
   * - `error`
   * - `success`
   * - `confirm`
   */
  messageType?: DialogMessageType | 'confirm'
  /**
   * Message type icon
   * @default true
   */
  icon?: boolean
  /** Shake the dialog when operating outside the dialog */
  shaking?: boolean
  /**
   * Use colorful shadow
   * @default false
   */
  colorfulShadow?: boolean
  /**
   * Respond the cancel button click in `confirm` type alert
   */
  cancelCallback?: Function
  /**
   * The dialog background overlay
   * @default true
   */
  backdrop?: boolean
  /**
   * Click outside the dialog to close dialog
   * @default false
   */
  backdropClose?: boolean
}

/**
 * Open an alert dialog
 * @param message - The message to display
 * @param callback - respond the dialog close
 * @param options - dialog options
 * @returns the method to close dialog
 */
export declare const DialogAlert: typeof MessageDialog<AlertOption>
/**
 * Open an warning type alert dialog
 * @param message - The message to display
 * @param callback - respond the dialog close
 * @param options - dialog options
 * @returns the method to close dialog
 */
export declare const DialogAlertWarning: typeof MessageDialog<AlertOption>
/**
 * Open an error type alert dialog
 * @param message - The message to display
 * @param callback - respond the dialog close
 * @param options - dialog options
 * @returns the method to close dialog
 */
export declare const DialogAlertError: typeof MessageDialog<AlertOption>
/**
 * Open an success type alert dialog
 * @param message - The message to display
 * @param callback - respond the dialog close
 * @param options - dialog options
 * @returns the method to close dialog
 */
export declare const DialogAlertSuccess: typeof MessageDialog<AlertOption>
/**
 * Open an confirm type alert dialog
 * @param message - The message to display
 * @param callback - respond the dialog close
 * @param options - dialog options
 * @returns the method to close dialog
 */
export declare const DialogAlertConfirm: typeof MessageDialog<AlertOption>
