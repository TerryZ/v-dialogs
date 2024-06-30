import { VNode } from 'vue'

export interface DialogBaseOption {
  /**
   * Plugin language
   * @default `en`
   */
  language?: string
  /** Custom class name */
  customClass?: string
  /** Only one singleton key dialog can be open at a time */
  singletonKey?: string
}

export declare type DialogMessageType = 'info' | 'warning' | 'error' |'success'

export declare type MessageContent = string | VNode

export declare type ComponentContent = VNode | (() => VNode)

export declare type MessageDialog<T> = (
  message: MessageContent,
  callback?: Function,
  options?: T
) => Function

export declare type ContainerDialog<T> = (
  component: ComponentContent,
  options?: T
) => Function
