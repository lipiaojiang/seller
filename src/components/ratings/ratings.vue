<template>
    <div class="ratings" ref="ratingsScroll">
        <div class="rating-wrap">
            <div class="score-wrap"> 
                <div class="content-left">
                    <strong class="seller-score">{{ seller.score }}</strong>
                    <span class="txt">综合评分</span>
                    <span class="rank-rate">高于周边商家{{ seller.rankRate }}%</span>
                </div>
                <div class="content-right">
                    <div class="food-score">
                        <span class="txt">商品评价</span>
                        <star :score="seller.foodScore" :size="36"></star>
                        <span class="score">{{ seller.foodScore }}</span>
                    </div>
                    <div class="service-score">
                        <span class="txt">服务态度</span>
                        <star :score="seller.serviceScore" :size="36"></star>
                        <span class="score">{{ seller.serviceScore }}</span>
                    </div>
                    <div class="send-time">
                        <span class="txt">送达时间</span>
                        <span class="time">{{ seller.deliveryTime }}分钟</span>
                    </div>
                </div>
            </div>
            <div class="margin"></div>
            <div class="ratings-list-wrap">
                <selectrate :ratings="this.ratings"
                    :onlyContent="this.onlyContent" 
                    :selectType="this.selectType" 
                    :typeText="this.typeText"
                    @checked="checked" 
                    @checkedAll="checkedAll" 
                    @checkedGood="checkedGood" 
                    @checkedBad="checkedBad">
                </selectrate>
                <ul class="ratings-list"  v-if="this.ratings && this.ratings.length>0">
                    <li v-for="rating in ratings" v-show="rateType(rating.rateType, rating.text)">
                        <div class="user">
                            <div class="avatar"><img :src="rating.avatar" alt=""></div>
                            <div class="mation">
                                <div class="txt-wrap">
                                    <span class="username">{{ rating.username }}</span>
                                    <span class="time">{{ rating.rateTime | fmtDate(rating.rateTime)}}</span>
                                </div>
                                <div class="star-wrap">
                                    <star :score="rating.score" :size="36"></star>
                                    <span class="send-time" v-show="rating.deliveryTime">{{ rating.deliveryTime }}分钟送达</span>
                                </div>
                            </div>
                        </div>
                        <div class="text">{{ rating.text }}</div>
                        <div class="recommend">
                            <span class="icon" :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></span>
                            <span class="food-name" v-for="(food, index) in rating.recommend" v-show="index<3">{{ food }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    import star from 'components/stars/star'
    import {formatDate} from 'assets/js/filter'
    import selectrate from 'components/selectrate/selectrate'

    const ERR_OK = 0
    const ALL = 2
    const GOOD = 0
    const BAD = 1

    export default {
        props: {
            seller: {
                type: Object
            },

        },
        data() {
            return {
                ratings: [],
                selectType: ALL,
                onlyContent: false,
                typeText: ['全部','满意','不满意']
            }
        },
        components: {
            star,selectrate
        },
        created() {
            this.$http.get('/api/ratings').then((response) => {
                response = response.body
                if(response.errno === ERR_OK) {
                    this.ratings = response.data
                    this.$nextTick(() => {
                        this.ratingsScroll = new BScroll(this.$refs.ratingsScroll,{
                            click: true
                        })
                    })
                }
            })
        },
        methods: {
            //评价类型判断
            rateType(type, text) {
                if(this.onlyContent && !text) {
                    return false
                }
                if(this.selectType === ALL) {
                    return true
                }else {
                    return type === this.selectType
                }
            },
            // 监听是否点选有无评价内容按钮
            checked() {
                this.onlyContent = !this.onlyContent
                this.$nextTick(() => {
                    this.ratingsScroll.refresh()
                })
            },
            // 监听点选评价类型
            checkedAll() {
                this.selectType = ALL
                this.$nextTick(() => {
                    this.ratingsScroll.refresh()
                })
            },
            checkedGood() {
                this.selectType = GOOD
                this.$nextTick(() => {
                    this.ratingsScroll.refresh()
                })
            },
             checkedBad() {
                this.selectType = BAD
                this.$nextTick(() => {
                    this.ratingsScroll.refresh()
                })
            }
        },
        // 时间过滤
        filters: {
            fmtDate(time) {
                let date = new Date(time)
                return formatDate(date,'yyyy-MM-dd hh:mm')
            }
        }      
    }
</script>
<style lang='stylus'>
    @import 'ratings.styl'
</style>