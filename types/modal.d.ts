import { Component } from 'vue'
import { DialogBaseOption } from './helper'

declare interface ModalOption extends DialogBaseOption {
  /**
   * The title text displayed in header
   * - set to false to close header
   */
  title?: boolean | string
  /** Dialog width */
  width?: number
  /** Dialog height */
  height?: number
  /** The parameters pass to component */
  params?: any
  /** Close dialog button in header */
  closeButton?: boolean
  /** Maximize dialog button in header */
  maxButton?: boolean
  /** Open and maximize the modal dialog */
  fullscreen?: boolean
  /** Shake the dialog when operating outside the dialog */
  shaking?: boolean
  /** The dialog background overlay */
  backdrop?: boolean
  /** Click outside the dialog to close dialog */
  backdropClose?: boolean
  /** Dialog close callback */
  callback?: Function
}

/**
 * Display a modal dialog
 * @param component - The component to display
 * @param options - custom options
 * @returns the dialog key
 */
export function DialogModal (
  component: Component,
  options?: ModalOption
): string
