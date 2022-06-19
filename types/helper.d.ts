export interface DialogBaseOption {
  /** Plugin language */
  language?: 'cn'
  /** Custom class name */
  customClass?: string
  /** Only one singleton key dialog can be open at a time */
  singletonKey?: string
}
