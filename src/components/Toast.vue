<template>
    <transition name="v-dialog--smooth" :appear="true" >
    <div dialog="v-dialog" tabindex="-1"
         :class="['v-dialog', 'v-dialog-toast', toastPosition]"
         :style="[{'z-index':dialogZIndex},dialogSize]" v-show="show" >

        <div class="v-dialog-dialog" :style="{width:width+'px',height:height+'px',top:dialogTop+'px'}">
            <div class="v-dialog-content" >

                <div class="v-dialog-body" :style="{height:bodyHeight+'px'}" >

                    <div :class="['v-dialog-toast__container', contentClass]" >
                        <button type="button" class="v-dialog-toast__close" v-if="dialogCloseButton"
                                @click="closeDialog(false)">×</button>
                        <div class="v-dialog-toast__icon">
                            <i :class="['dlg-icon-font', iconClassName]"></i>
                        </div>
                        <div class="v-dialog-toast__content">
                            <h3 v-text="titleBar"></h3>
                            <p v-html="message"></p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
    </transition>
</template>

<script>
    import {messageTypes} from "../constants";
    import mixins from '../mixins';

    export default {
        name: "DialogToast",
        mixins: [mixins],
        props: {
            /**
             * Dialog message type (work on alert, toast mode)
             * @type string
             * @enum 'info' - default
             * @enum 'warning'
             * @enum 'error'
             * @enum 'success'
             * @enum 'confirm' ( not available for toast )
             */
            messageType: {
                type: String,
                default: messageTypes.info
            },
            iconClassName: String,
            /**
             * Dialog corner position type
             * @type string
             */
            position : {
                type: String,
                default: 'bottomRight'
            },
            dialogCloseButton: {
                type: Boolean,
                default: true
            }
        },
        data(){
            return {
                dialogSize: {},
                toastPosition: this.position
            };
        },
        mounted(){
            this.dialogSize = {
                width: this.width + 'px',
                height: this.height + 'px'
            };
            this.bodyHeight = this.height;
        }
    }
</script>