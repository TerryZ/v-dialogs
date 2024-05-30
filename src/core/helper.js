import {
  MESSAGE_TYPE_CONFIRM,
  MESSAGE_TYPE_WARNING,
  MESSAGE_TYPE_ERROR,
  MESSAGE_TYPE_SUCCESS
} from '../constants'
import { commonProps } from '../utils/dialog'

export const isConfirmType = type => MESSAGE_TYPE_CONFIRM === type

export function mergeDialogProps (props) {
  return {
    ...commonProps,
    ...props
  }
}

/**
 * Get default title
 *
 * @param {string} type - message type
 * @param {object} lang
 * @returns
 */
export function getDefaultTitle (type, lang) {
  switch (type) {
    case MESSAGE_TYPE_WARNING: return lang.titleWarning
    case MESSAGE_TYPE_ERROR: return lang.titleError
    case MESSAGE_TYPE_SUCCESS: return lang.titleSuccess
    case MESSAGE_TYPE_CONFIRM: return lang.titleConfirm
    default: return lang.titleInfo
  }
}
