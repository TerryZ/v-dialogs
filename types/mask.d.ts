import { DialogBaseOption, MessageDialog } from './base'

declare interface MaskOption extends DialogBaseOption {
  /**
   * The element that mask append to
   * @default `body`
   */
  appendTo?: string
  /**
   * Pill style border
   * @default true
   */
  pill?: boolean
  /**
   * Display spinner icon
   * @default true
   */
  icon?: boolean
  /**
   * Display the content panel
   * @default true
   */
  panel?: boolean
}

/**
 * Display a overlay mask
 * @param message - The message to display
 * @param callback - respond the dialog close
 * @param options - custom options
 * @returns the method to close dialog
 */
export declare const DialogMask: typeof MessageDialog<MaskOption>
