<template>
  <section class="search">
    <HeaderTop title="搜索" />
    <form class="search_form"
          @submit.prevent="search">
      <input type="search"
             placeholder="请输入商家名称"
             class="search_input"
             v-model="keyword">
      <input type="submit"
             class="search_submit">
    </form>
    <section class="list">
      <ul class="list_container">
        <router-link :to="{path:'/shop', query:{id:item.id}}"
                     tag="li"
                     v-for="item in searchShops"
                     :key="item.id"
                     class="list_li">
          <section class="item_left"> <img src="http://cube.elemecdn.com/9/f6/dca6ae0d2c743a68e66ba0dca5f01JPEG.JPEG"
                 class="restaurant_img">
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p> <span>{{item.name}}</span>
              </p>
              <p>月售 {{item.month_sales||item.recent_order_num}} 单</p>
              <p>{{item.delivery_fee||item.float_minimum_order_amount}} 元起送 / 距离
                {{item.distance}}</p>
            </div>
          </section>
        </router-link>
      </ul>
    </section>
    <div class="search_none"
         v-show="noSearchShops">
      找不到搜索商家
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import HeaderTop from '../../components/HeaderTop/HeaderTop'
export default {
  components: {
    HeaderTop
  },
  data () {
    return {
      keyword: '',
      noSearchShops: false
    }
  },
  computed: {
    ...mapState(['searchShops'])
  },
  methods: {
    search () {
      const keyword = this.keyword.trim()
      if (keyword) {
        this.noSearchShops = false
        this.$store.dispatch('searchShops', keyword)
      }
    }
  },
  watch: {
    searchShops (value) {
      if (!value.length) {
        this.noSearchShops = true
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'
.search
  width 100%
  height 100%
  overflow hidden
  .search_form
    clearFix()
    margin-top 45px
    background-color #fff
    padding 12px 8px
    input
      height 35px
      padding 0 4px
      border-radius 2px
      font-weight bold
      outline none
      &.search_input
        float left
        width 79%
        border 4px solid #f2f2f2
        font-size 14px
        color #333
        background-color #f2f2f2
      &.search_submit
        float right
        width 18%
        border 4px solid #4a258d
        font-size 16px
        color #fff
        background-color #4a258d
  .list
    .list_container
      background-color #fff
      .list_li
        display flex
        justify-content center
        padding 10px
        border-bottom 1px solid $bc
        .item_left
          margin-right 10px
          .restaurant_img
            width 50px
            height 50px
            display block
        .item_right
          font-size 12px
          flex 1
          .item_right_text
            p
              line-height 12px
              margin-bottom 6px
              &:last-child
                margin-bottom 0
  .search_none
    margin 0 auto
    color #333
    background-color #fff
    text-align center
    margin-top 0.125rem
</style>
