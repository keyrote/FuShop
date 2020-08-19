<template>
  <div id="app">
    <router-view/>
    <FooterGuite v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import FooterGuite from './components/FooterGuide/FooterGuide'
export default {
  components: {
    FooterGuite
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app
  width 100%
  height 100%
  background #f5f5f5
</style>