<template>
    <div class="header">
        <div class="seller-wrap">
            <div class="avatar">
                <img :src="seller.avatar" width="64" height="64" alt="">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{ seller.name }}</span>
                </div>
                <div class="description">
                    {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
                </div>
                <div class="support-wrap">
                    <support :supports = "seller.supports" :num = "1" :size="1"></support>
                </div>
            </div>
            <div v-if="seller.supports" class="support-count" @click="detailShow">
                <span class="count">{{ seller.supports.length }}个</span>
                <i class="icon icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrap" @click="detailShow">
            <div class="tit"></div>
            <div class="txt">{{ seller.bulletin }} </div>
            <i class="icon icon-keyboard_arrow_right"></i>
        </div>
        <transition name="slideLeft">
            <div class="detail-wrap"  v-show="detailStae">
                <div class="detail">
                    <div class="name">{{ seller.name }}</div>
                    <div class="star-wrap">
                        <star :score="seller.score" :size="48"></star>
                    </div>
                    <div class="container">
                        <div class="title-wrap">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <div class="supports-wrap">
                            <support :supports = "seller.supports" :size="2"></support>
                        </div>
                    </div>
                    <div class="container">
                        <div class="title-wrap">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="bulletin">
                            {{ seller.bulletin }}
                        </div>
                    </div>
                    <div class="icon-close" @click="detailHide"></div>
                </div>
                
            </div>
        </transition>
        <div class="background"></div>
    </div>
</template>
<script>
    import support from 'components/supports/support'
    import star from 'components/stars/star'

    export default {
        name: 'header',
        data() {
            return {
                detailStae: false
            }
            
        },
        components: {
            support,star
        },
        props: {
            seller: {
                type: Object
            }
        },
        methods: {
            detailShow() {
                this.detailStae = true
            },
            detailHide() {
                this.detailStae = false
            }
        }
    }
</script>
<style lang="stylus">
    @import 'vHead.styl'
</style>