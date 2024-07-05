import { DialogBaseOptions, ContainerDialog, ContainerDialogBox } from './base'

export declare interface ModalOptions extends DialogBaseOptions {
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
   * Dialog width
   * @default 700
   */
  width?: number
  /**
   * Dialog height
   * @default 400
   */
  height?: number
  /** The parameters pass to component as props */
  params?: Record<string, unknown>
  /**
   * The close dialog button in header
   * @default true
   */
  closeButton?: boolean
  /**
   * Maximize dialog button in header
   * @default true
   */
  maxButton?: boolean
  /**
   * Open and maximize the modal dialog
   * @default false
   */
  fullscreen?: boolean
  /**
   * Shake the dialog when operating outside the dialog
   * @default true
   */
  shaking?: boolean
}

/**
 * Display a modal dialog
 * @param component - The component to display
 * @param options - custom options
 * @returns the method to close dialog
 */
export declare const DialogModal: typeof ContainerDialog<ModalOptions>
/**
 * Use component to display content in a modal dialog
 */
export declare const DialogModalBox: ContainerDialogBox<ModalOptions>
