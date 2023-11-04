import Vue from 'vue'
Vue.use({
  install(Vue) {
    const $window = Vue.observable({
      width: 0
    })

    if (process.browser) {
      const onResize = () => {
        $window.width = window.innerWidth
      }
      global.addEventListener('resize', onResize)
      onResize()
    }

    Vue.prototype.$window = $window
  }
})
