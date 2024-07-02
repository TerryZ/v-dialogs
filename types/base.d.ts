import {
  AllowedComponentProps,
  ComponentCustomProps,
  VNodeProps,
  VNode
} from 'vue'

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

declare interface ContainerBoxOption {
  /**
   * Whether to display the dialog
   * @default false
   */
  visible?: boolean
}

export declare type DialogMessageType = 'info' | 'warning' | 'error' |'success'

export declare type MessageContent = string | VNode

export declare type ComponentContent = VNode | (() => VNode)

declare type EmitUpdateVisible = (event: "update:visible", value: boolean) => void
declare type EmitClose = (event: "close") => void

export declare function MessageDialog<T> (
  message?: MessageContent,
  callback?: Function,
  options?: T
): Function
export declare function MessageDialog<T> (
  message: MessageContent,
  options?: T
): Function

export declare function ContainerDialog<T> (
  component: ComponentContent,
  options?: T
): Function

export declare interface ContainerDialogBox<T> {
  new (): {
    $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & T & ContainerBoxOption
    $emit: EmitClose & EmitUpdateVisible
    $slots: {
      default?: () => VNode[]
    }
  }
}
