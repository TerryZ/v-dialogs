<template>
    <div class="vDialogContainer" v-show="dialogs.length">
        <!--<transition-group name="animated" enter-class="bounce" enter-active-class="bounce">-->
        <!--<transition enter-class="vDialogOpen">-->
        <vDialog v-for="(dlg,index) in dialogs"
                 :setting="dlg"
                 :dialogIndex="index"
                 :key="index"
                 :dialogKey="keyPrefix + keyNum"
                 @close="closeDialog"></vDialog>
        <!--</transition>-->
        <!--</transition-group>-->
    </div>
</template>

<script>
    import vDialog from './vDialog';
    import constant from './vDialogConstants';
    let {dialogDefaults, messageTypes, alertIconClass, toastConstants,languages} = constant;
    export default {
        name: "v-dialog",
        components: {
            vDialog
        },
        data(){
            return {
                dialogs: [],
                keyPrefix: 'v-dialog-',
                keyNum: 0
            };
        },
        methods: {
            /**
             * Merge user options and default options
             * @param config - user options
             * @return merged options
             */
            buildDialogConfig(config){
                let merged = Object.assign({}, dialogDefaults, config);
                return merged;
            },
            /**
             * String cut
             * @param str [string] src string
             * @param n   [number] save string length
             * @returns string
             */
            stringSub(str,n){
                if(typeof(str) !== 'string') return;
                let r=/[^\x00-\xff]/g;
                if(str.replace(r,"mm").length<=n){ return str; }
                let m=Math.floor(n / 2);
                for(let i = m; i < str.length; i++){
                    if(str.substr(0,i).replace(r,"mm").length >= n){
                        return str.substr(0,i) + "...";
                    }
                }
                return str;
            },
            /**
             * Init default options
             */
            buildDialog(config){
                this.keyNum++;
                let key = this.keyPrefix + this.keyNum;
                config.dialogKey = key;
                this.dialogs.push(config);
                return key;
            },
            /**
             * Open a Modal dialog
             * @param p - options
             */
            addModal(p){
                let config = this.buildDialogConfig(p);
                config.type = 'modal';
                return this.buildDialog(config);
            },
            /**
             * Open a message alert dialog, types including info, warning, error, success, confirm
             * @param p - options
             */
            addAlert(p){
                let config = this.buildDialogConfig(p);
                //console.log('Alert');
                //console.table(config);
                config.type = 'alert';
                config.iconClassName = alertIconClass[config.messageType];
                config.i18n = languages[config.language];
                let title = config.i18n.titleInfo;
                switch(config.messageType){
                    case messageTypes.warning:
                        title = config.i18n.titleWarning;
                        break;
                    case messageTypes.error:
                        title = config.i18n.titleError;
                        break;
                    case messageTypes.success:
                        title = config.i18n.titleSuccess;
                        break;
                    case messageTypes.confirm:
                        title = config.i18n.titleConfirm;
                        break;
                }
                config.title = title;
                config.dialogCloseButton = false;
                config.dialogMaxButton = false;
                config.width = config.message.length > 70 ? 700 : 450;
                config.height = config.message.length > 70 ? 400 :  typeof(config.title)==='undefined'||typeof(config.title)==='string' ? 210 : 180;

                return this.buildDialog(config);
            },
            /**
             * Open a full screen mask
             * @param p - options
             */
            addMask(p){
                let config = this.buildDialogConfig(p);
                config.type = 'mask';
                config.i18n = languages[config.language];
                config.message = config.message || config.i18n.maskText;
                config.message = this.stringSub(config.message, 65);
                config.title = false;
                config.width = 300;
                config.height = 50;

                return this.buildDialog(config);
            },
            /**
             * Open a Toast dialog (corner dialog)
             *
             * @param p - options
             *
             * @enum position
             * 'topLeft'
             * 'topCenter'
             * 'topRight'
             * 'bottomLeft'
             * 'bottomCenter'
             * 'bottomRight'
             */
            addToast(p){
                let config = this.buildDialogConfig(p);
                config.type = 'toast';
                config.iconClassName = toastConstants.iconClass[config.messageType];
                config.i18n = languages[config.language];
                config.message = this.stringSub(config.message, 56);
                config.title = false;
                config.width = 300;
                config.height = 80;
                let titleStr = config.i18n.titleInfo, contentClass = '';
                switch(config.messageType){
                    case messageTypes.warning:
                        titleStr = config.i18n.titleWarning;
                        contentClass = toastConstants.contentClass.warning;
                        break;
                    case messageTypes.error:
                        titleStr = config.i18n.titleError;
                        contentClass = toastConstants.contentClass.error;
                        break;
                    case messageTypes.success:
                        titleStr = config.i18n.titleSuccess;
                        contentClass = toastConstants.contentClass.success;
                        break;
                }
                config.titleStr = titleStr;
                config.contentClass = contentClass;

                return this.buildDialog(config);
            },
            /**
             * Close dialog, last one or specified key dialog (Modal, Alert, Mask, Toast)
             * @param data - the data return to caller
             * @param key - the dialog key, you can get it like this: let key = this.$vDialog.alert('your msg');
             */
            close(data, key){
                if(this.dialogs.length === 0) return;
                let idx = -1;
                if(key){
                    idx = this.dialogs.findIndex(function(row, index){
                        return row.dialogKey === key;
                    });
                }else idx = this.dialogs.length -1;
                if(idx >= 0){
                    this.dialogs[idx].returnData = data;
                    this.closeDialog(idx);
                }
            },
            /**
             * Close dialog (remove dialogs array item) and call user callback function
             * @param index - dialog index
             */
            closeDialog(index){
                let dlg = this.dialogs[index];
                if(dlg){
                    this.dialogs.splice(index, 1);
                    if(dlg.callback && typeof(dlg.callback) === 'function') dlg.callback();
                }
            }
        }
    }
</script>

<style scoped>
    div.vDialogContainer{
        /*width: 100%;
        height: 100%;*/
        width: 0;
        height: 0;
        position: fixed;
        /*left: 0;top: 0;*/
        z-index: 1030;
    }
</style>