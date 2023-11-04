import Vue from 'vue'
import { ValidationProvider, ValidationObserver, configure, localize, extend } from 'vee-validate'
import ja from 'vee-validate/dist/locale/ja.json'
import {
  required,
  max,
  min,
  email,
  regex,
  alpha,
  alpha_spaces as alphaSpaces,
  alpha_num as alphaNum,
  numeric
} from 'vee-validate/dist/rules'
import cardfilter from '~/utils/cardfilter.js'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

configure({
  bails: false
})

extend('required', {
  ...required
})
extend('max', {
  ...max
})
extend('min', {
  ...min
})
extend('email', {
  ...email
})
extend('regex', {
  ...regex
})
extend('alpha', {
  ...alpha
})
extend('alpha_spaces', {
  ...alphaSpaces
})
extend('alpha_num', {
  ...alphaNum
})
extend('numeric', {
  ...numeric
})

extend('validCardnum', cardfilter.validCardNum)
ja.messages.email = '有効なメールアドレスではありません'

extend('validUpperName', cardfilter.validUpperName)

localize('ja', ja)
