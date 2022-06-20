export interface DialogBaseOption {
  /** Plugin language */
  language?: 'cn'
  /** Custom class name */
  customClass?: string
  /** Only one singleton key dialog can be open at a time */
  singletonKey?: string
}

export declare class DialogHelper {
  /**
   * Close the specified key dialog
   *
   * if no key is specified, the last opened dialog will be closed
   *
   * @param key - The key of the dialog
   */
  close (key?: string): void
  /**
   * Close all dialogs
   */
  closeAll (): void
}
