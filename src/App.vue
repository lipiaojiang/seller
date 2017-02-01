<template>
  <div id="app">
    <v-head :seller = "seller"></v-head>
    <div class="item-nav">
      <router-link to='/' exact>商品</router-link>
      <router-link to='/ratings'>评价</router-link>
      <router-link to='/seller'>商家</router-link>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import vHead from 'components/vHead/vHead'
const ERR_OK = 0

export default {
  components: {
    vHead
  },
  data() {
    return {
      seller: {

      }
    }
  },
  created() {
    this.$http.get('/api/seller').then((response) => {
      response = response.body
      if(response.errno === ERR_OK) {
        this.seller = response.data
      }
      
    })
  }
}
</script>

<style lang="stylus" scoped>
  .item-nav
    display: flex
    height: 40px
    justify-content: center
    align-items: center
    position: relative
    &::after
        display: block
        content: ''
        width: 100%
        height: 1px
        position: absolute
        left: 0
        bottom: 0
        background: rgba(7, 17, 27, .1)
    & > a
      flex: 1
      text-align: center
      font-size: 14px
      color: rgb(77, 85, 93)
    .active
          color: rgb(240, 20, 20)
</style>
