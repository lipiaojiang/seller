<template>
    <div class="seller" ref="sellerScroll">
        <div class="seller-scroll">
            <div class="seller-mation">
                <h1 class="name">{{ seller.name }}</h1>
                <div class="star-wrap">
                    <star :score="seller.score" :size="36"></star>
                    <span class="rating-count">({{ seller.ratingCount }})</span>
                    <span class="sell-count">月售{{ seller.sellCount }}单</span>
                </div>
                <div class="sevice-data">
                    <div class="min-price">
                        <h4 class="txt">起送价</h4>
                        <span class="num">{{ seller.minPrice }}<sup>元</sup></span>
                    </div>
                    <div class="delivery-price">
                        <h4 class="txt">商家配送</h4>
                        <span  class="num">{{ seller.deliveryPrice }}<sup>元</sup></span>
                    </div>
                    <div class="delivery-time">
                        <h4 class="txt">平均送达时间</h4>
                        <span  class="num">{{ seller.deliveryTime }}<sup>分钟</sup></span>
                    </div>
                </div>
            </div>
            <div class="margin"></div>
            <div class="bulletin-supports">
                <div class="title">公告与活动</div>
                <div class="bulletin">{{ seller.bulletin }}</div>
                <div class="supports-wrap">
                    <support :supports="seller.supports" :size=4></support>
                </div>               
            </div>
            <div class="margin"></div>
            <div class="seller-pics">
                <div class="title">商家实景</div>
                <div class="scroll-wrap"  ref="picScroll">
                    <ul class="clearfix" ref="picList">
                        <li v-for="pic in seller.pics"><img :src="pic" alt=""></li>
                    </ul>
                    
                </div>
            </div>
            <div class="margin"></div>
            <div class="seller-infos">
                <div class="title">商家信息</div>
                <ul>
                    <li v-for="info in seller.infos">{{ info }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    import  star from 'components/stars/star'
    import support from 'components/supports/support'

    export default {
        props: {
            seller: {
                type: Object
            }
        },
        components: {
            star,support
        },
        watch: {
            'seller'() {
                this._initScroll()
                this._picScroll()
            }
        },
        methods: {
            _initScroll() {
                this.$nextTick(() => {
                    if(!this.sellerScroll) {
                        this.sellerScroll = new BScroll(this.$refs.sellerScroll,{
                            click: true
                        })
                    }else {
                        this.sellerScroll.refresh()
                    }
                    
                })
            },
            _picScroll() {
                this.$nextTick(() => {
                    if(this.seller.pics) {
                        let picWidth = 120
                        let margin = 6
                        let width = (picWidth + margin) * this.seller.pics.length
                        this.$refs.picList.style.width = width + 'px'
                        if(!this.picScroll) {
                            this.picScroll = new BScroll(this.$refs.picScroll,{
                                scrollX: true,
                                eventPassthrough: 'vertical'
                            })
                        }else {
                            this.picScroll.refresh()
                        }
                    }
                    
                })
            }         
        },
        created() {
            this._initScroll()
            this._picScroll()        
        }
    }
</script>
<style lang='stylus'>
    @import 'seller.styl'
</style>