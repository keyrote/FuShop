import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button } from 'mint-ui'
import './mock/mockServer'
import moment from 'moment'// 导入文件

Vue.prototype.$moment = moment// 赋值使用

moment.locale('zh-cn')// 需要汉化
Vue.component(Button.name, Button)
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
