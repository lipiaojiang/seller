<template>
    <div class="ratetype">
        <div class="tit">商品评价</div>
        <div class="type">
            <div class="all" :class="{'active':selectType===2}" @click.stop="checkedAll">
                <span class="txt">{{ typeText[0] }}</span>
                <span class="num">{{ allLength }}</span>
            </div>
            <div class="good" :class="{'active':selectType===0}" @click.stop="checkedGood">
                <span class="txt">{{ typeText[1] }}</span>
                <span class="num">{{ goodLength }}</span>
            </div>
            <div class="bad" :class="{'active':selectType===1}" @click.stop="checkedBad">
                <span class="txt">{{ typeText[2] }}</span>
                <span class="num">{{ badLength }}</span>
            </div>
        </div>
        <div class="onlycontent">
            <span class="icon-check_circle" :class="{'active':this.onlyContent}" @click="checked"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>
<script>
    const ALL = 2
    const GOOD = 0
    const BAD = 1

    export default {
        props: {
            ratings:{
                type: Array,
                default() {
                    return []
                }
            },
            typeText: {
                type: Array,
                default() {
                    return ['全部','推荐','吐槽']
                }
            },
            onlyContent: {
                type: Boolean,
                default: false
            },
            selectType: {
                type: Number,
                default: 2
            }
        },
        methods: {
            checked() {
                this.$emit('checked')
            },
            checkedAll() {
                this.$emit('checkedAll')
            },
            checkedGood() {
                this.$emit('checkedGood')
            },
            checkedBad() {
                this.$emit('checkedBad')
            }
        },
        computed: {
           allLength() {
               return this.ratings.length
           },
           goodLength() {
               return this.ratings.filter((rating) => {
                   return rating.rateType === GOOD
               }).length
           },
           badLength() {
               return this.ratings.filter((rating) => {
                   return rating.rateType === BAD
               }).length
           }
        }
    }
</script>
<style lang='stylus'>
    @import 'selectrate.styl'
</style>