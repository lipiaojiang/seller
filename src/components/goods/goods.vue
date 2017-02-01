<template>
    <div class="goods">
        <div class="goods-menu" ref="menu">
            <ul class="menu-list">
                <li v-for="(menu, index) in goods" :class="{'cur': curIndex === index}" @click="selectMenu(index, $event)">
                    <span class="text">{{ menu.name }}</span>
                </li>
            </ul>
        </div>
        <div class="goods-list" ref="foods">
            <ul>
                <li v-for="item in goods" class="food-list">
                    <dl>
                        <dt class="goods-name">{{ item.name }}</dt>
                        <dd v-for="food in item.foods" class="food-item" >
                            <div class="icon" @click="selectFood(food, $event)">
                                <img :src="food.icon" alt="">
                            </div>
                            <div class="content">
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
                                
                            </div>
                            <div class="choose-wrap">
                                <addctrl :food="food" @addFood="addFood"></addctrl>
                            </div>
                        </dd>
                    </dl>

                </li>
            </ul>
        
        </div>
        <food :food="selectedFood" ref="foodDetail" @addFood="addFood"></food>
        
        <shopcar ref="shopcar" :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice" :selectFoods = "selectFoods"></shopcar>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    import addctrl from 'components/addctrl/addctrl'
    import shopcar from 'components/shopcar/shopcar'
    import food from 'components/food/food'

    const ERR_OK = 0

    export default {
        components: {
            addctrl,shopcar,food
        },
        props:{
            seller: {
                type: Object
            }
        },
        data() {
            return {
                goods: [],
                listHeight: [],
				scrollY: 0,
                selectedFood: {}
            }
        },
        created() {
            this.$http.get('/api/goods').then((response) => {
                response = response.body
                if(response.errno === ERR_OK) {
                    this.goods = response.data
                    this.$nextTick(() => {
						this._initScroll()
						this._height()
					})
                }
            })
        },
        computed: {
			curIndex () {
				for (let i = 0; i < this.listHeight.length; i++) {
					let height1 = this.listHeight[i]
					let height2 = this.listHeight[i + 1]
					if (this.scrollY >= height1 && this.scrollY <height2) {
						return i
					}
				}
				return 0
			},
			selectFoods () {
				let foods = []
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if(food.count) {
							foods.push(food)
						}
					})
				})
				return foods
			}
		},
        methods: {
            _initScroll () {
				this.menuScroll = new BScroll(this.$refs.menu, {
					click: true
				})
				this.foodScroll = new BScroll(this.$refs.foods, {
					probeType: 3,
					click: true
				})
				this.foodScroll.on('scroll', (pos) => {
					this.scrollY = Math.abs(Math.round(pos.y)) 
				})
			},
			_height () {
				let foodList = this.$refs.foods.querySelectorAll('.food-list')
				let height = 0
				this.listHeight.push(height)
				for (let i = 0; i < foodList.length; i++) {
					let item = foodList[i]
					height += item.clientHeight
					this.listHeight.push(height)
				}
			},
			selectMenu (index, event) {
				if (!event._constructed) {
					return
				}
				let foodList = this.$refs.foods.querySelectorAll('.food-list')
				let el = foodList[index]
				this.foodScroll.scrollToElement(el, 300)
			},
            _drop(target) {
                // 调用子组件shopcar的drop方法
                this.$refs.shopcar.drop(target)
            },
            //父组件监听addctrl子组件addFood事件传入触发事件的dom元素,调用父组件_drop()方法
            addFood(target) {
                this._drop(target)
            },
            selectFood(food, event) {
                if(!event._constructed) {
                    return
                }
                this.selectedFood = food
                this.$refs.foodDetail.show()
            }
        }

    }
</script>
<style lang='stylus'>
    @import 'goods.styl'
</style>