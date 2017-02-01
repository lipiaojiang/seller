<template>
    <div class="star" :class="starType">
        <span v-for="(star, index) in stars" :class="stars[index]" class="star-icon"></span>
    </div>
</template>
<script>    
    const LENGTH = 5;

    export default {
        props: {
            score: Number,
            size: Number
        },
        computed: {
            starType() {
                return 'star' + this.size
            },
            stars() {
                const reslut = []
                const score = Math.floor(this.score)
                const float = this.score%1 !==0
                for(let i = 0; i < score; i++){
                    reslut.push('on')
                }
                if(float) {
                    reslut.push('half')
                }
                while(reslut.length < LENGTH) {
                    reslut.push('off')
                }
                return reslut
            }

        }
    }
</script>
<style lang="stylus">
    @import 'star.styl'
</style>