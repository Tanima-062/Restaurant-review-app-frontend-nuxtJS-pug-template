export default function ({ isHMR, app, store, params }) {
  //   const defaultLocale = app.i18n.fallbackLocale
  //   const defaultLocale = 'jp'
  if (isHMR) {
    return
  }
  if (app) {
    return
  }
  if (store) {
    return
  }
  if (params) {
    //
  }

  //   const locale = params.lang || defaultLocale
  //   if (!store.state.internationalize.locales.includes(locale)) {
  // return error({ message: 'This page could not be found.', statusCode: 404 })
  //   }
  //   store.commit('internationalize/SET_LANG', locale)
  //   app.i18n.locale = store.state.internationalize.locale
  // if (
  //   locale === defaultLocale &&
  //   route.fullPath.indexOf('/' + defaultLocale) === 0
  // ) {
  //   const toReplace = '^/' + defaultLocale
  //   const re = new RegExp(toReplace)
  //   return redirect(route.fullPath.replace(re, '/'))
  // }
}
