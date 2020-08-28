import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueLazyload from 'vue-lazyload'

import store from './store'
import { Button } from 'mint-ui'
import './mock/mockServer'
import moment from 'moment'// 导入文件
import loading from './common/img/loading.gif'
import './filters' // 加载过滤器
Vue.prototype.$moment = moment// 赋值使用
Vue.use(VueLazyload, {
  loading
})
moment.locale('zh-cn')// 需要汉化
Vue.component(Button.name, Button)
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
