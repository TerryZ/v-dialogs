<template>
    <dlg-modal v-bind="$attrs" v-on="$listeners" v-if="type === 'modal'"></dlg-modal>
    <dlg-alert v-bind="$attrs" v-on="$listeners" v-else-if="type === 'alert'"></dlg-alert>
    <dlg-mask v-bind="$attrs" v-on="$listeners" v-else-if="type === 'mask'"></dlg-mask>
    <dlg-toast v-bind="$attrs" v-on="$listeners" v-else-if="type === 'toast'"></dlg-toast>
</template>

<script>
    import './dialog.scss';
    import modal from './components/Modal';
    import alert from './components/Alert';
    import mask from './components/Mask';
    import toast from './components/Toast';
    export default {
        components: {
            'dlg-modal': modal,
            'dlg-alert': alert,
            'dlg-mask': mask,
            'dlg-toast': toast
        },
        props:{
            /**
             * Dialog type
             * @type string
             * @enum 'modal' Modal dialog
             * @enum 'alert' Alert dialog
             * @enum 'mask' Mask dialog
             * @enum 'toast' Toast(corner) dialog
             */
            type: {
                type: String,
                default: 'modal',
                required: true
            }
        },
        provide(){
            return {
                type: this.type
            };
        }
    };
</script>