<template lang="pug">
.container(:class='{ entrance: headerInfo.layoutType === 0 }')
  template(
    v-if='headerInfo.layoutType === 0 || headerInfo.layoutType === 1 || headerInfo.layoutType === 4'
  )
    Header(service="takeout")
  template(
    v-else-if='headerInfo.layoutType === 8'
  )
    Header(service="restaurant", :showBanner="false", :showLineMenu="$device.isDesktop")
  template(
    v-else-if='headerInfo.layoutType === 9'
  )
    Header(service="restaurant", :showBanner="false")
  template(
    v-else-if='headerInfo.layoutType === 10'
  )
    Header(:service="$route.query.type === 'take' ? 'takeout' : 'restaurant'")
  template(v-else)
    no-ssr
      ReservationHeader(
        :path='headerInfo.returnPath',
        :title='headerInfo.headerTitle'
      )
  Nuxt.page
  Footer(

    v-if='headerInfo.layoutType === 0 || headerInfo.layoutType === 1 || headerInfo.layoutType === 2 || headerInfo.layoutType === 3 || headerInfo.layoutType === 8 || headerInfo.layoutType === 9 || headerInfo.layoutType === 10'
  )
  reservation-footer(v-else-if='headerInfo.layoutType === 5')
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Header from '../components/organisms/Header.vue'
import ReservationHeader from '../components/organisms/ReservationHeader.vue'
import Footer from '../components/organisms/Footer.vue'
import ReservationFooter from '../components/organisms/ReservationFooter.vue'
import Navigation from '../components/organisms/Navigation.vue'

/**
 * @概要 JST環境でもUTC環境でも正確なJST日本時間を取得する
 * https://neos21.net/blog/2020/12/09-01.html
 */
const jstToday = new Date(Date.now() + (new Date().getTimezoneOffset() + 60 * 9) * 60 * 1000)

const year = jstToday.getFullYear()
const month = jstToday.getMonth() + 1
const date = jstToday.getDate()
const hour = jstToday.getHours()

const webcomponentsLoaderLink =
  'https://wc.skyticket.jp/js/webcomponents-loader.js?gourmet=' +
  year.toString() +
  '-' +
  month.toString() +
  '-' +
  date.toString() +
  '-' +
  hour.toString()
const skyticketFooterLink =
  'https://wc.skyticket.jp/js/skyticket-footer.js?gourmet=' +
  year.toString() +
  '-' +
  month.toString() +
  '-' +
  date.toString() +
  '-' +
  hour.toString()
const skyticketHeaderLink =
  'https://wc.skyticket.jp/js/skyticket-header.js?gourmet=' +
  year.toString() +
  '-' +
  month.toString() +
  '-' +
  date.toString() +
  '-' +
  hour.toString()

@Component({
  components: {
    Header,
    ReservationHeader,
    Footer,
    ReservationFooter,
    Navigation
  }
})
export default class extends Vue {
  head() {
    return {
      link: [
        {
          rel: 'canonical',
          href: `${process.env.BASE_URL}/gourmet${this.currentPage}`
        }
      ],
      script: [
        {
          src: webcomponentsLoaderLink,
          type: 'text/javascript'
        },
        {
          src: skyticketFooterLink,
          type: 'text/javascript',
          defer: true
        },
        {
          src: skyticketHeaderLink,
          type: 'text/javascript'
        }
      ]
    }
  }

  get currentPage() {
    return this.$route.path
  }

  get headerInfo() {
    return this.$store.getters['modules/layout/headerInfo']
  }

  mounted() {
    this.$store.dispatch('modules/user/getUserData')
  }
}
</script>

<style lang="sass">
body
  margin: 0
  .container, .entrance
    min-height: 100vh
  .page
    min-width: $container_min_width_pc
    max-width: $container_max_width_pc
    margin: 0 auto !important // commmon.sassに上書きされてしまうので、!importantとした
    padding: 0 16px !important // commmon.sassに上書きされてしまうので、!importantとした
    min-height: 80vh
    @include sp_view
      min-width: $container_min_width_sp
      max-width: $container_max_width_sp
</style>
