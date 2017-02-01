<template>
    <ul class="support" :class="iconSize">
        <li v-if="supports" v-for="(item, index) in supports" v-show="num?index<num:true">
            <span class="icon" :class="classMap[supports[index].type]"></span>
            <span class="text">{{ supports[index].description }}</span>
        </li>
    </ul>
</template>
<script>
    export default {
        props: {
            supports: {
                type: Array
            },
            num: Number,
            size: Number
        },
        created () {
            this.classMap = ['decrease','discount','special','invoice','guarantee']
        },
        computed: {
            iconSize() {
                return 'size-'+this.size
            }
        }
    }
</script>
<style lang="stylus">
    @import 'support.styl'
</style>