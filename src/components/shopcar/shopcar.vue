<template>
    <div class="shopcar">
        <div class="content">
            <div class="content-left" @click="toggleShopCarList">
                <div class="car-icon" >
                    <span class="icon-shopping_cart" :class="{'high-light':totalCount>0}"></span>
                    <span class="num" v-show="totalCount>0">{{ totalCount }}</span>
                </div>
                <div class="price">￥{{ totalPrice }}</div>
                <div class="desc">另需配送费{{ deliveryPrice }}元</div>
            </div>
            <div class="content-right" :class="payClass">{{ payDesc }}</div>
        </div>
        <div class="ball-container">
            <transition-group name="drop" tag="div" @before-enter="dropBeforeEnter" @enter="dropEnter" @afterEnter="dropAfterEnter">
                <div class="ball" v-for="(ball, index) in balls" v-show="ball.show" :key="index">
                    <div class="inner inner-hook"></div>
                </div>
            </transition-group>
        </div>
        <transition name="slideUp"> 
            <div class="shopcar-list" v-show="shopCarListShow">
                <div class="container">
                    <div class="title">
                        <h1>购物车</h1>
                        <span class="del" @click="delFood">清空</span>
                    </div>
                    <div class="selectfood-wrap"  ref="shopScroll">
                        <transition-group name="delet" tag="ul">
                            <li v-for="(food, index) in selectFoods" :key="index" class="food-item">
                                <span class="name">{{ food.name }}</span>
                                <span class="price"><i class="rmb">￥</i>{{ food.price * food.count }}</span>
                                <addctrl :food="food"></addctrl>
                            </li>
                        </transition-group>
                    </div>
                </div>           
            </div>
        </transition>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    import addctrl from 'components/addctrl/addctrl'

    export default {
        props: {
            selectFoods: {
                type: Array,
                default() {
                    return []
                }
            },
            minPrice: {
                type: Number,
                default: 0
            },
            deliveryPrice: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                balls: [
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    },
                    {
                        show: false
                    }
                ],
                dropBalls: [],
                shopCarListShow: false
            }
        },
        computed: {
            totalPrice() {
                let total = 0
                this.selectFoods.forEach((food) => {
                    total += food.price * food.count
                })
                return total
            },
            totalCount() {
                let count = 0
                this.selectFoods.forEach((food) => {
                    count += food.count
                })
                return count
            },
            payDesc() {
                if(this.totalPrice === 0){
                    return `￥${this.minPrice}元起送`
                }
                else if(this.totalPrice < this.minPrice) {
                    let diff = this.minPrice - this.totalPrice
                    return `还差￥${diff}元起送`
                }
                else {
                    return '去结算'
                }
            },
            payClass() {
                if(this.totalPrice < this.minPrice) {
                    return 'not-enough'
                }else {
                    return 'enough'
                }
            }
        },
        methods: {
            drop(el) {
                for(let i = 0; i < this.balls.length; i++) {
                    let ball = this.balls[i]
                    if(!ball.show) {
                        ball.show = true
                        ball.el = el
                        this.dropBalls.push(ball)
                        return
                    }
                }
            },
            dropBeforeEnter(el) {
                let count = this.balls.length
                while(count--) {
                    let ball = this.balls[count]
                    if(ball.show) {
                        let rect = ball.el.getBoundingClientRect()
                        let x = rect.left - 32
                        let y = -(window.innerHeight - rect.top - 22)
                        el.style.display = ''
                        el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
                        el.style.transform = `translate3d(0, ${y}px, 0)`
                        let inner = el.getElementsByClassName('inner')[0]
                        inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
                        inner.style.transform = `translate3d(${x}px, 0, 0)`
                    }
                }
            },
            dropEnter(el) {
                let rf = el.offsetHeight
                this.$nextTick(() => {
                    el.style.webkitTransform = 'translate3d(0, 0, 0)'
                    el.style.transform = 'translate3d(0, 0, 0)'
                    let inner = el.getElementsByClassName('inner')[0]
                    inner.style.webkitTransform = 'translate3d(0, 0, 0)'
                    inner.style.transform = 'translate3d(0, 0, 0)'
                })
            },
            dropAfterEnter(el) {
                let ball = this.dropBalls.shift()
                if(ball) {
                    ball.show = false
                    el.style.display = 'none'
                }
            },
            delFood() {
                this.selectFoods.forEach((food) => {
                    food.count = 0
                    
                })
                this.shopCarListShow = false
            },
            toggleShopCarList() {
                if(this.totalCount === 0) {
                    return
                }
                this.shopCarListShow = !this.shopCarListShow
                if(this.shopCarListShow) {
                    this.$nextTick(() => {
                        if(!this.scroll) {
                                this.scroll = new BScroll(this.$refs.shopScroll,{
                                click: true
                            }) 
                        }else {
                            this.scroll.refresh()
                        }
                        
                    })
                }
            }
        },
        components: {
            addctrl
        }
    }
</script>
<style lang="stylus">
    @import 'shopcar.styl'
</style>