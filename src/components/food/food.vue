<template>
    <transition name="foodSlideLeft">
        <div class="food-wrap" v-show="showFlag">
            <div class="back-wrap">
                <div class="back" @click="_back">
                    <span class="icon-arrow_lift"></span>
                    <span class="text">返回</span>
                </div>
            </div>
            <div class="scroll" ref="foodDetail">
                <div class="container">
                    <div class="pic">
                        <img :src="food.image" width="100%" alt="">
                    </div>
                    <div class="mation">
                        <h2 class="name">{{food.name}}</h2>
                        <p class="description">{{food.description}}</p>
                        <div class="extra">
                            <span class="sellCount">月售{{food.sellCount}}份</span>
                            <span class="rating">好评率{{food.rating}}%</span>
                        </div>
                        <div class="price">
                            <span class="now-price"><i class="rmb">￥</i>{{food.price}}</span>
                            <span v-if="food.oldPrice" class="old-price">￥{{food.oldPrice}}</span>
                        </div>
                        <div class="car-btn">
                            <transition name="fadeOutBtn" mode="out-in">
                                <div class="btn" v-show="food.count===0 || !food.count" @click="add()">加入购物车</div>
                            </transition>
                            <transition name="fadeInBtn">
                                <addctrl v-show="food.count>0" :food="food" @addFood="addFood"></addctrl>
                            </transition>
                        </div>
                        
                    </div>
                    <div class="margin" v-show="food.info"></div>
                    <div class="info-wrap" v-show="food.info">
                        <h1 class="title">商品介绍</h1>
                        <p class="text">{{ food.info }}</p>
                    </div>
                    <div class="margin"></div>
                    <div class="rating-wrap">
                        <selectrate :ratings="food.ratings"
                         :onlyContent="this.onlyContent" 
                         :selectType="this.selectType" 
                         @checked="checked" 
                         @checkedAll="checkedAll" 
                         @checkedGood="checkedGood" 
                         @checkedBad="checkedBad">
                        </selectrate>
                        <ul class="rating-list" v-if="food.ratings && food.ratings.length>0">
                            <li v-for="rating in food.ratings" v-show="rateType(rating.rateType, rating.text)">
                                <div class="tit">
                                    <span class="time">{{ rating.rateTime | fmtDate(rating.rateTime)}}</span>
                                    <span class="name">{{ rating.username}}</span>
                                    <div class="avatar">
                                        <img :src="rating.avatar" alt="">
                                    </div>
                                </div>
                                <div class="text"><span :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></span>{{ rating.text}}</div>
                            </li>
                        </ul>
                        <div class="noratings" v-else>暂无评价</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    import Vue from 'vue'
    import BScroll from 'better-scroll'
    import {formatDate} from 'assets/js/filter'
    import addctrl from 'components/addctrl/addctrl'
    import selectrate from 'components/selectrate/selectrate'

    const ALL = 2
    const GOOD = 0
    const BAD = 1

    export default {
        props: {
            food: {
                type: Object
            }
        },
        data() {
            return {
                showFlag: false,
                selectType: ALL,
                onlyContent: false
            }
        },
        components: {
            addctrl,selectrate
        },
        methods: {
            show() {
                this.showFlag = true
                this.$nextTick(() => {
                    if(!this.detailScroll){
                        this.detailScroll = new BScroll(this.$refs.foodDetail,{
                            click: true
                        }) 
                    }else {
                        this.detailScroll.refresh()
                    }
                    
                })
            },
            // 返回
            _back() {
                this.showFlag = false
            },
            // 添加按钮
            add() {
                if(!event._constructed){
                    return
                }
                Vue.set(this.food,'count',1)
            },
            //监听子组件addFood方法并传递给父组件触发小球动画
            addFood(target) {
                this.$emit('addFood',event.target)
            },
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
                    this.detailScroll.refresh()
                })
            },
            // 监听点选评价类型
            checkedAll() {
                this.selectType = ALL
                this.$nextTick(() => {
                    this.detailScroll.refresh()
                })
            },
            checkedGood() {
                this.selectType = GOOD
                this.$nextTick(() => {
                    this.detailScroll.refresh()
                })
            },
             checkedBad() {
                this.selectType = BAD
                this.$nextTick(() => {
                    this.detailScroll.refresh()
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
<style lang="stylus">
    @import 'food.styl'
</style>