import { NuxtConfig } from '@nuxt/types'
import { ContextReplacementPlugin, Configuration } from 'webpack'
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin'
import i18n from './nuxt-i18n.config'
const envDir = (() => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return '/config/.env.prod'
    case 'test':
      return '/config/.env.test'
    case 'test-fe01':
      return '/config/.env.test-fe01'
    case 'development':
      return '/config/.env.dev'
    case 'development-fe01':
      return '/config/.env.dev-fe01'
    case 'development-fe02':
      return '/config/.env.dev-fe02'
    default:
      return '/config/.env.local'
  }
})()
const srcDir = './src'
/* eslint-disable */
require('dotenv').config({ path: `${srcDir + envDir}` }).parsed
/* eslint-enable */
const BASE_URL = process.env.BASE_URL

const config: NuxtConfig = {
  srcDir: './src',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: { lang: 'ja' },
    title: 'おすすめの人気テイクアウト・レストランをウェブ予約',
    titleTemplate: '%s | スカイチケットグルメ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          '旅行総合予約サイトの「skyticket（スカイチケット）」がおすすめする飲食店を検索からウェブ予約まで簡単に行えるグルメサービスです！ランチやディナーなどいつでも近くの飲食店を検索でき、人気のテイクアウトメニューやレストランプランをご予約いただけます。'
      },
      {
        name: 'mobile-web-app-capable',
        content: 'yes'
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'スカイチケットグルメ'
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://skyticket.jp/gourmet/'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'スカイチケットグルメ'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          '旅行総合予約サイトの「skyticket（スカイチケット）」がおすすめする飲食店を検索からウェブ予約まで簡単に行えるグルメサービスです！ランチやディナーなどいつでも近くの飲食店を検索でき、人気のテイクアウトメニューやレストランプランをご予約いただけます。'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://skyticket.jp/img/ogp/ogp_jp.png'
      }
      // { hid: 'article:publisher', name: 'article:publisher', content: '{facebook_url}' },
      // { hid: 'fb:app_id', name: 'fb:app_id', content: '{app_id}' },
      // { hid: 'fb:admins', name: 'fb:admins', content: '{admin_id}' },
      // { hid: 'twitter:card', name: 'twitter:card', content: '{card_type}' },
      // { hid: 'twitter:site', name: 'twitter:site', content: '{twitter_id}' }
    ],
    link: [
      // { rel: 'stylesheet', type: 'text/css', href: '/gourmet/Hide.css' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        hid: 'gtm',
        innerHTML: 'window.dataLayer = window.dataLayer || [];',
        type: 'text/javascript',
        async: true
      },
      {
        src: 'https://www.googleoptimize.com/optimize.js?id=OPT-TT9ZT2W',
        type: 'text/javascript',
        async: true
      },
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=UA-1062858-39',
        type: 'text/javascript',
        async: true
      },
      { src: '/gourmet/ga.js', type: 'text/javascript', async: true },
      { src: '/gourmet/gtm.js', type: 'text/javascript', async: true }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#000' },
  /*
   ** Global CSS
   */
  css: ['element-ui/lib/theme-chalk/index.css'],
  router: {
    base: '/gourmet/',
    middleware: ['i18n', 'redirect']
  },
  generate: {
    routes: ['/', '/en']
  },
  // TODO: 開発環境のみにしたいので後で環境変数呼ぶ
  serverMiddleware: [{ path: '~~/api', handler: '~~/api/index.js' }],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '@/plugins/axios', ssr: false },
    '~/plugins/filters',
    '~/plugins/vee-validate',
    '~/plugins/element-ui',
    '~/plugins/window',
    '~/plugins/cookie',
    { src: '~/plugins/vue-carousel', ssr: false },
    { src: '~/plugins/persistedstate', ssr: false },
    '~/plugins/vueselect.js',
    '~/plugins/vue-scrollto',
    '~/plugins/util.ts',
    { src: '~/plugins/vue2-google-maps.js' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build',
    '@nuxtjs/device',
    '@nuxtjs/composition-api/module'
  ],
  /*
   ** Nuxt.js modules
   ** Doc: https://axios.nuxtjs.org/usage
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    'nuxt-svg-loader',
    'nuxt-user-agent',
    ['nuxt-i18n', i18n],
    [
      '@nuxtjs/dotenv',
      {
        filename: envDir
      }
    ]
  ],
  styleResources: {
    sass: ['~/assets/sass/base.sass']
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    retry: { retries: 0 },
    baseURL: BASE_URL,
    credentials: true
  },
  output: {
    publicPath: '/'
  },
  /*
   ** Build configuration
   */
  build: {
    filenames: {
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[id].[contenthash].js')
    },
    plugins: [
      new ContextReplacementPlugin(/moment[/\\]locale$/, /ja/),
      new LodashModuleReplacementPlugin({ shorthands: true })
    ],
    babel: {
      // babelrc: false,
      // compact: false,
      // /* eslint-disable-next-line */
      // presets(env, [preset, options]) {
      //   return [['@babel/preset-env', options]]
      // },
      plugins: [
        ['lodash'],
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ]
    },
    transpile: ['vee-validate', 'persistedstate', /^vue2-google-maps($|\/)/],
    /*
     ** You can extend webpack config here
     */
    extend(config: Configuration): void {
      if (config.module) {
        config.module.rules.push({
          resourceQuery: /blockType=i18n/,
          type: 'javascript/auto',
          loader: ['@kazupon/vue-i18n-loader', 'yaml-loader'],
          resolve: { extensions: ['.ts', '.js', '.vue', '.json'] }
        })
      }
    }
  },
  dev: process.env.NODE_ENV !== 'production'
}
export default config
