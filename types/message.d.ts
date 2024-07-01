import { DialogBaseOption, DialogMessageType, MessageDialog } from './base'

declare type MessageOption = DialogBaseOption & {
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
   * @default 32
   */
  offset?: string | number
  /**
   * The placement of the message dialog
   * @default `top`
   */
  placement?: 'top' | 'bottom'
  /**
   * Display pill rounded style
   * @default true
   */
  pill?: boolean
}

/**
 * Open a message dialog
 * @param message - The message to display
 * @param callback - respond the dialog close
 * @param options - dialog options
 * @returns the method to close dialog
 */
export declare const DialogMessage: typeof MessageDialog<MessageOption>
/**
 * Open an warning type message dialog
 * @param message - The message to display
 * @param callback - respond the dialog close
 * @param options - dialog options
 * @returns the method to close dialog
 */
export declare const DialogMessageWarning: typeof MessageDialog<MessageOption>
/**
 * Open an error type message dialog
 * @param message - The message to display
 * @param callback - respond the dialog close
 * @param options - dialog options
 * @returns the method to close dialog
 */
export declare const DialogMessageError: typeof MessageDialog<MessageOption>
/**
 * Open an success type message dialog
 * @param message - The message to display
 * @param callback - respond the dialog close
 * @param options - dialog options
 * @returns the method to close dialog
 */
export declare const DialogMessageSuccess: typeof MessageDialog<MessageOption>
