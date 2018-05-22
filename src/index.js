/**
 * v-dialogs
 */

import vDialog from './vDialogContainer';

const Plugin = {
    install(Vue, options = {}){
        let Dialog = Vue.component(vDialog.name, vDialog);
        let dlg = new Dialog();
        let vm = dlg.$mount();
        document.querySelector('body').appendChild(vm.$el);

        //dlg.$mount();
        Vue.prototype.$vDialog = {
            modal(component, params = {}){
                if(!component) return;
                params.component = component;
                return dlg.addModal(params);
            },
            alert(msg, callback, params = {}){
                if(!msg) return;
                params.message = msg;
                params.callback = callback;
                return dlg.addAlert(params);
            },
            mask(msg, callback, params = {}){
                params.message = msg;
                params.callback = callback;
                return dlg.addMask(params);
            },
            toast(msg, callback, params = {}){
                if(!msg) return;
                params.message = msg;
                params.callback = callback;
                return dlg.addToast(params);
            },
            close(data, key){
                dlg.close(data, key);
            },
            closeAll(callback){
                dlg.closeAll(callback);
            }
        };
    }
};

export default Plugin;