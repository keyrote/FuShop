import Vue from 'vue'
import moment from 'moment'
Vue.filter('date-format', function (value) {
  return moment(value).format('YYYY-MM-DD HH:mm')
})
