// import Vue from 'vue'
// import VueI18n from 'vue-i18n'

// Vue.use(VueI18n)

// export default ({ app, store }) => {
//   // Set i18n instance on app
//   // This way we can use it in middleware and pages asyncData/fetch
//   app.i18n = new VueI18n({
//     locale: store.state.internationalize.locale,
//     fallbackLocale: 'ja',
//     messages: {
//       en: require('~/locales/locale/en'),
//       ja: require('~/locales/locale/ja')
//     }
//   })

//   app.i18n.path = (link) => {
//     if (app.i18n.locale === app.i18n.fallbackLocale) {
//       return `/${link}`
//     }

//     return `/${app.i18n.locale}/${link}`
//   }
// }
