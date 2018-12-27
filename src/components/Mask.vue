<template>
    <div>
        <div dialog="v-dialog" tabindex="-1" :class="['v-dialog', {'v-dialog--buzz-out': shake}]"
             :style="[{'z-index':dialogZIndex}]" @click.self="outsideClick" >

            <div class="v-dialog-dialog" :style="{width:width+'px',height:height+'px',top:dialogTop+'px'}">
                <transition name="v-dialog--candy" :appear="true" >
                    <div class="v-dialog-content" v-show="show">

                        <div class="v-dialog-body" :style="{height:bodyHeight+'px'}" >

                            <div class="v-dialog-mask__container" >
                                <div class="v-dialog-timer"></div>
                                <div class="v-dialog-mask__content" v-html="message"></div>
                            </div>

                        </div>

                    </div>
                </transition>
            </div>
        </div>

        <transition name="v-dialog--fade" :appear="true" >
            <div class="v-dialog-overlay" :style="{'z-index':backdropZIndex}" v-if="backdrop && show"></div>
        </transition>
    </div>
</template>

<script>
    import mixins from '../mixins';
    export default {
        name: "DialogMask",
        mixins: [mixins],
        mounted(){
            this.bodyHeight = this.height;
            this.adjust();
        }
    }
</script>