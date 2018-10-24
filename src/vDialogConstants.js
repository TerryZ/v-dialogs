const messageTypes = {
    info: 'info',
    success: 'success',
    warning: 'warning',
    error: 'error',
    confirm: 'confirm',
    inputConfirm: 'inputConfirm'
};

const toastConstants = {
    contentClass : {
        info: '',
        warning: 'toastWarning',
        success: 'toastSuccess',
        error: 'toastError'
    },
    iconClass : {
        info: 'vDialog-toast-info',
        warning: 'vDialog-toast-warn',
        success: 'vDialog-toast-success',
        error: 'vDialog-toast-error'
    }
};

const alertIconClass = {
    info: 'alertInfo',
    warning: 'alertWarning',
    success: 'alertSuccess',
    error: 'alertError',
    confirm: 'alertConfirm'
};

const languages = {
    cn : {
        titleInfo : '提示',
        titleWarning : '警告',
        titleError : '错误',
        titleSuccess : '成功',
        titleConfirm : '确认',
        btnOk : '确认',
        btnCancel : '取消',
        maskText : '数据加载中……'
    },
    en: {
        titleInfo : 'information',
        titleWarning : 'warning',
        titleError : 'error',
        titleSuccess : 'success',
        titleConfirm : 'confirmation',
        btnOk : 'OK',
        btnCancel : 'Cancel',
        maskText : 'Loading……'
    },
    pt: {
        titleInfo : 'aviso',
        titleWarning : 'alerta',
        titleError : 'erro',
        titleSuccess : 'sucesso',
        titleConfirm : 'confirmaço',
        btnOk : 'OK',
        btnCancel : 'Cancelar',
        maskText : 'Carregando……'
    },
    jp: {
        titleInfo : 'ヒント',
        titleWarning : '警告',
        titleError : '間違った',
        titleSuccess : '成功',
        titleConfirm : '確認',
        btnOk : '確認',
        btnCancel : 'キャンセル',
        maskText : 'データロード……'
    }
};

const dialogDefaults = {
    /**
     * Dialog type
     * @type string
     * @enum 'modal' Modal dialog
     * @enum 'alert' Alert dialog
     * @enum 'mask' Mask dialog
     * @enum 'toast' Toast(corner) dialog
     */
    type: 'modal',
    /**
     * The message show in dialog (work on alert, mask, toast mode)
     * @type string
     */
    message: undefined,
    /**
     * Dialog message type (work on alert, toast mode)
     * @type string
     * @enum 'info' - default
     * @enum 'warning'
     * @enum 'error'
     * @enum 'success'
     * @enum 'confirm'
     */
    messageType: messageTypes.info,
    /**
     * Dialog background layer
     * @type boolean
     */
    backdrop: true,
    /**
     * Dialog title bar text or title bar show control
     * @type string | boolean
     *
     * @example title: false// close title bar
     */
    title: 'vDialog',
    /**
     * Dialog width
     * @type number
     */
    width: 700,
    /**
     * Dialog height
     * @type number
     */
    height: 400,
    /**
     * Send parameters to Component
     * you need use props to receive this params in component
     * work on Modal mode
     */
    params:undefined,
    dialogCloseButton: true,
    dialogMaxButton: true,
    /**
     * Full screen dialog
     * @type boolean
     */
    fullWidth: false,
    /**
     * Dialog corner position type
     * @type string
     * work on Toast mode
     */
    position : 'bottomRight',
    /**
     * Specified a key to make dialog singleton
     * @type string
     */
    singletonKey: undefined,
    /**
     * Dialog inner key
     * @private
     */
    dialogKey: '',
    /**
     * Use custom class in Dialog
     * only work on Modal mode
     */
    customClass: '',
    iconClassName: '',
    /**
     * Dialog use language
     * @type string
     * @enum cn - default
     * @enum en
     * @enum jp
     */
    language: 'cn',
    i18n: {},
    returnData: undefined,
    /**
     * auto close dialog seconds
     * @type number | boolean
     */
    closeTime: false,
    /**
     * Just close dialog, don`t trigger callback but cancelCallback
     * @private
     * @type boolean
     */
    cancel: false,
    /**
     * Close dialog callback, trigger by some case:
     * click the close button in top right corner(Model,Toast mode)
     * click 'cancel' button in Alert mode ('confirm' message type)
     *
     * @type function
     */
    cancelCallback: undefined

};

const commonConstants = {
    baseZIndex: 1100
}

export default {
    dialogDefaults,
    messageTypes,
    toastConstants,
    alertIconClass,
    languages,
    commonConstants
};
