import { DialogBaseOptions, ContainerDialog, ContainerDialogBox } from './base'

export declare interface DrawerOptions extends DialogBaseOptions {
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
   */
  width?: number
  /**
   * Dialog height
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
   * The drawer dialog placement
   * @default `right`
   */
  placement?: 'left' | 'right' | 'top' | 'bottom'
  /**
   * Display drawer dialog backdrop
   * @default true
   */
  backdrop?: boolean
  /**
   * Backdrop click to close dialog
   * @default true
   */
  backdropClose?: boolean
}

/**
 * Display a drawer dialog
 * @param component - The component to display
 * @param options - custom options
 * @returns the method to close dialog
 */
export declare const DialogDrawer: typeof ContainerDialog<DrawerOptions>
/**
 * Use component to display content in a drawer dialog
 */
export declare const DialogDrawerBox: ContainerDialogBox<DrawerOptions>
