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
        warning: 'toast-warning',
        success: 'toast-success',
        error: 'toast-error'
    },
    iconClass : {
        info: 'dlg-icon-toast--info',
        warning: 'dlg-icon-toast--warn',
        success: 'dlg-icon-toast--success',
        error: 'dlg-icon-toast--error'
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
        titleInfo : 'Information',
        titleWarning : 'Warning',
        titleError : 'Error',
        titleSuccess : 'Success',
        titleConfirm : 'Confirmation',
        btnOk : 'OK',
        btnCancel : 'Cancel',
        maskText : 'Loading……'
    },
    pt: {
        titleInfo : 'Aviso',
        titleWarning : 'Alerta',
        titleError : 'Erro',
        titleSuccess : 'Sucesso',
        titleConfirm : 'Confirmaço',
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

const commonConstants = {
    baseZIndex: 5100
};

export { messageTypes };
export { toastConstants };
export { alertIconClass };
export { languages };
export { commonConstants };