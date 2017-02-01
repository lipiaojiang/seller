<template>
    <div class="addctrl">
		<transition name="move">
			 <span v-show="food.count>0" class="pre" @click.stop.prevent="preFood">
				<span class="inner icon-remove_circle_outline"></span>
			 </span>
		</transition>
        <span class="count" v-show="food.count>0">{{ food.count }}</span>
        <span class="add icon-add_circle" @click.stop.prevent="addFood"></span>
    </div>
</template>
<script>
	import Vue from 'vue'

    export default {
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            addFood (event) {
				if(!event._constructed){
					return
				}
				if (!this.food.count) {
					Vue.set(this.food,'count',1)
				}else {
					this.food.count++
				}
				//goods父组件监听此事件
				this.$emit('addFood',event.target)
			},
			preFood (event) {
				if(!event._constructed){
					return
				}
				if(this.food.count) {
					this.food.count--
				}
			}
        }
    }
</script>
<style lang='stylus'>
    @import 'addctrl.styl'
</style>