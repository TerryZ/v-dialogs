export const types = {
  MODAL: "modal",
  ALERT: "alert",
  MASK: "mask",
  TOAST: "toast"
};

export const messageTypes = {
  info: "info",
  success: "success",
  warning: "warning",
  error: "error",
  confirm: "confirm"
};

export const toastConstants = {
  contentClass: {
    info: "",
    warning: "toast-warning",
    success: "toast-success",
    error: "toast-error"
  },
  iconClass: {
    info: "dlg-icon-toast--info",
    warning: "dlg-icon-toast--warn",
    success: "dlg-icon-toast--success",
    error: "dlg-icon-toast--error"
  }
};

export const alertIconClass = {
  info: "alertInfo",
  warning: "alertWarning",
  success: "alertSuccess",
  error: "alertError",
  confirm: "alertConfirm"
};

export const commonConstants = {
  baseZIndex: 5100,
  MAX_CONTENT_LENGTH: 70,
  DEFAULT_DLG_WIDTH: 700,
  DEFAULT_DLG_HEIGHT: 400
};
