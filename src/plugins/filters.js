import Vue from 'vue'
import moment from 'moment'
// vue3からfilterが消えるので、utils/filter.tsにmethodとして定義して、それをimportする形に変更
Vue.filter('date-format', (v) => {
  moment.locale('ja')
  return moment(v, 'YYYY/MM/DD').format('YY/M/D (ddd)')
})
Vue.filter('rentacar-search', (a, b) => `貸出：${a}-返却：${b}`)
