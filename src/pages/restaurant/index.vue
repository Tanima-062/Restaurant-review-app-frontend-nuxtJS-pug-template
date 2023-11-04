<template lang="pug">
.top
  .cover-image
  .container
    .top-wrapper
      heading.title(:number='1', fontSize='l') レストランの比較・予約検索
      two-switch-tab.switch(
        fontSizeLeft='small',
        typeLeft='default',
        textLeft='レストラン',
        colorLeft='white',
        backgroundcolorLeft='#1c5db5',
        fontSizeRight='small',
        typeRight='default',
        textRight='テイクアウト',
        colorRight='dark_gray',
        backgroundcolorRight='#f4f4f4',
        stating=1
      )
      restaurant-form.form
      notification-top.notice(
        v-if='infomation',
        :noticebox='infomation',
        icon='info',
        appCd='RS'
      )
      hr(v-if='infomation')
    .buffet-banner(@click="$router.push('/restaurant/campaign/hotel_buffet/')")
      img(:src="buffetBannerImgSrc" alt="ホテルビュッフェ,アフタヌーンディー特集へ")
    .category
      heading.category-title(fontSize='m') 一覧からお店を探す
      .category__icon
        nuxt-link.category__icon--first(to='/takeout/area-list/?pl=res')
          map-jp-icon.icon
          paragraph.text(fontSize='tiny', letterSpacing='none') エリア一覧
        nuxt-link.category__icon--second(to='/takeout/genre-list/?pl=res')
          menu-icon.icon
          paragraph#text.text(fontSize='tiny', letterSpacing='none') 料理ジャンル一覧
        nuxt-link.category__icon--third(to='/takeout/commitment-list?pl=res')
          spoon-knife.icon
          paragraph#textLast.text(fontSize='tiny', letterSpacing='none') こだわり検索一覧
    //- template()
    //-   hr
    //-   .recommend
    //-     Heading.recommend-title(fontSize='m') 特集
    //-   carousel-nav.recommend-carousel(:List='campaignList', :is-takeout='false')
    template(v-if='Recommend.length > 0')
      hr
      .recommend
        Heading.recommend-title(fontSize='m') おすすめのレストラン
        nuxt-link.recommend-more(to='/restaurant/recommend')
          paragraph.recommend-more-text(fontSize='small', letterSpacing='none') すべて見る
      carousel-nav.recommend-carousel(:List='Recommend', :is-takeout='false')
    template(v-if='storys.length > 0')
      hr
      .ampstories
        heading.ampstories-title(fontSize='m') レストランの最新ストーリー
        carousel-amp-nav.ampstories-carousel(:List='storys')
    hr
    .banner-wrapper
      a(href='/campaign/gourmet_sale.php')
        .banner
    nav.service-links
      ul
        li
          a(href="/") 国内航空券
        li
          a(href="/international-flights/") 海外航空券
        li
          a(href="/tour/") 国内ツアー
        li
          a(href="/tour/train/") 新幹線＋ホテル
        li
          a(href="/dp/") 国内航空券＋ホテル
        li
          a(href="/dp/international/") 海外航空券＋ホテル
        li
          a(href="/hotel/") 国内・海外ホテル
        li
          a(href="/rentacar/") 国内レンタカー
        li
          a(href="/gourmet/restaurant/") レストラン
        li
          a(href="/gourmet/takeout/") テイクアウト
        li
          a(href="/bus/") 高速バス
        li
          a(href="/ferry/") フェリー
        li
          a(href="/wifi/") WiFiレンタル
        li
          a(href="/guide/") 観光ガイド
        li
          a(href="/premium/") プレミアム
        li.-last
          a(href="/insurance/") 旅行保険
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Heading, Paragraph, ParagraphBold, SpanBold } from '~/components/atoms/typography'
import CarouselAmpNav from '~/components/organisms/CarouselAmpNav.vue'
import CarouselNav from '~/components/organisms/CarouselNav.vue'
import CircleNav from '~/components/organisms/CircleNav.vue'
import MapJpIcon from '~/assets/icon/map-jp.svg'
import MenuIcon from '~/assets/icon/menu.svg'
import NotificationTop from '~/components/molecules/card/NotificationTop.vue'
import RestaurantForm from '~/components/atoms/form/RestaurantForm.vue'
import SpoonKnife from '~/assets/icon/spoon-knife.svg'
import TwoSwitchTab from '~/components/atoms/tab/TwoSwitchTab.vue'
import { CampaignInfo } from '~/types/hotelRestaurantTypes'
@Component({
  components: {
    CarouselAmpNav,
    CarouselNav,
    CircleNav,
    Heading,
    MapJpIcon,
    MenuIcon,
    NotificationTop,
    Paragraph,
    ParagraphBold,
    RestaurantForm,
    SpanBold,
    SpoonKnife,
    TwoSwitchTab
  }
})
export default class TopRestaurantIndex extends Vue {
  head() {
    return {
      title: 'レストラン・飲食店・近くのお店を予約',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'レストランを検索・予約するならスカイチケット！近くで食事ができるお店、ご当地グルメ、食べ放題、焼肉・イタリアン・中華・ハンバーガー・寿司など、様々なジャンルの飲食店を掲載。'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'レストランを検索・予約するならスカイチケット！近くで食事ができるお店、ご当地グルメ、食べ放題、焼肉・イタリアン・中華・ハンバーガー・寿司など、様々なジャンルの飲食店を掲載。'
        }
      ]
    }
  }

  fetch({ store }) {
    store.dispatch('modules/layout/setHeaderInfo', {
      layoutType: 10,
      headerTitle: 'グルメ'
    })
  }

  mounted() {
    this.$store.dispatch('modules/recommend/InitRecommendRS')
    this.$store.dispatch('modules/story/InitAmpsRS')
  }

  buffetBannerImgSrc = this.$device.isDesktop
    ? require('~/static/img/top/top_buffet_pc.jpg')
    : require('~/static/img/top/top_buffet_sp.jpg')

  get storys() {
    return this.$store.getters['modules/story/getAmpsRS']
  }

  // おすすめ取得
  get Recommend() {
    const recommends = this.$store.getters['modules/recommend/getRecommendRS'].result
      ? this.$store.getters['modules/recommend/getRecommendRS'].result
      : []
    return recommends
  }

  // お知らせ
  get infomation() {
    return Object.keys(this.$store.getters['modules/notification/getNotificationRS']).length > 0
      ? this.$store.getters['modules/notification/getNotificationRS']
      : ''
  }

  campaignList: CampaignInfo[] = [
    {
      id: 0,
      name: 'ホテルビュッフェ特集',
      description: 'これはホテルビュッフェ特集これはホテルビュッフェ特集これはホテルビュッフェ特集',
      pageUrl: '/restaurant/campaign/hotel_buffet/',
      thumbImage: {
        id: 3569,
        imageCd: 'OTHER',
        imageUrl: 'https://jp.skyticket.jp/gourmet/images/seascapeterrace/store/phpaXsym1.png'
      }
    }
  ]
}
</script>
<style lang="sass" scoped>
.page
  padding: 0 !important
  max-width: none
hr
  margin: 24px -16px
  height: 8px
  background-color: $light_gray
.top
  background-size: 100% 250px
  .cover-image
    position: absolute
    height: 250px
    width: 100vw
    background: url('~@/static/img/take_img/bg_restaurant-min.jpg')top left no-repeat
    background-size: cover
    z-index: -1
  .container
    max-width: 1024px
    padding: 0 16px
    margin: 0 auto
  .top-wrapper
    width: 100%
    max-width: 1024px
    margin: 0 auto
    z-index: 1
    .title
      color: $white
      letter-spacing: 0
      padding-top: 24px
    .form
      padding-bottom: 16px
      margin-bottom: 24px
      border-radius: 4px;
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15)
  .buffet-banner
    margin-bottom: 16px
    &:hover
      opacity: 0.7
      cursor: pointer
    img
      width: 100%
      height: 100%
      object-fit: cover
  .category
    &__icon
      display: flex
      justify-content: center
      margin-top: 32px
      text-align: center
      &--first
        width: 36px
        margin-right: 56px
        .icon
          width: 50px
      &--second
        width: 72px
        margin-right: 38px
        .icon
          width: 39px
          height: 50px
      &--third
        width: 72px
        .icon
          width: 39px
          height: 50px
  .recommend
    display: grid
    grid-template-columns: 1fr max-content
    grid-gap: 24px
    &-more
      white-space: nowrap
      &-text
        color: $link_color
        text-decoration: underline
        &:hover
          text-decoration: none
    &-carousel
      margin-top: 24px
  .ampstories
    &-carousel
      margin-top: 24px
  .banner-wrapper
    padding-bottom: 32px
    .banner
      width: 100%
      height: 121px
      margin: 0 auto
      background: url('~@/static/img/lp/banner_sp.png')no-repeat center
      background-size: contain
@include pc_view
  .page
    padding: 0 !important
  hr
    margin: 0
    margin-bottom: 32px
    height: 8px
    background-color: $light_gray
  .top
    background-size: 100% 250px
    .cover-image
      position: absolute
      height: 250px
      width: 100vw
      background: url('~@/static/img/take_img/bg_restaurant-min.jpg')top left no-repeat
      background-size: cover
      z-index: -1
    .container
      padding: 0 16px
    .top-wrapper
      width: 100%
      max-width: 1024px
      margin: 0 auto
      z-index: 1
      .title
        color: $white
        letter-spacing: 0
        padding-top: 24px
      .notice
        margin-bottom: 40px
      .form
        padding-bottom: 16px
        margin-bottom: 32px
    .buffet-banner
      margin-bottom: 24px
    .category
      &-title
        font-size: 20px
      &__icon
        display: flex
        justify-content: center
        width: 620px
        margin: 32px auto 40px auto
        text-align: center
        &--first
          display: flex
          justify-content: center
          align-items: center
          width: 100%
          margin-right: 56px
          &:hover
            opacity: 0.6
          .icon
            width: 50px
            margin-right: 16px
          .text
            font-size: 14px
        &--second
          display: flex
          justify-content: center
          align-items: center
          width: 100%
          margin-right: 38px
          &:hover
            opacity: 0.6
          .icon
            width: 39px
            height: 50px
            margin-right: 16px
          .text
            font-size: 14px
        &--third
          display: flex
          justify-content: center
          align-items: center
          width: 100%
          &:hover
            opacity: 0.6
          .icon
            width: 39px
            height: 50px
            margin-right: 16px
          .text
            font-size: 14px
    .recommend
      display: grid
      grid-template-columns: 1fr max-content
      grid-gap: 24px
      &-title
        font-size: 20px
      &-more
        white-space: nowrap
        &-text
          font-size: 16px
      &-carousel
        margin-top: 16px
        margin-bottom: 32px
    .ampstories
      &-title
        font-size: 20px
      &-carousel
        margin-top: 16px
        margin-bottom: 32px
    .banner-wrapper
      padding-bottom: 32px
      .banner
        width: 100%
        height: 80px
        background: url('~@/static/img/lp/banner_pc.png')no-repeat
        background-size: 100%
        &:hover
          opacity: 0.6
.service-links
  display: none
@media screen and (max-width: 767px)
  .service-links
    display: block
    border-top: solid 1px #e4e4e4
    background-color: #fff
    ul
      margin: 16px 0 0 10px
      display: flex
      flex-wrap: wrap
      li
        margin: 0 4px 16px 0
        padding-right: 4px
        border-right: solid 1px #e4e4e4
        height: 14px
        line-height: 12px
        a
          font-size: 12px
          text-decoration: underline
          color: #1ba1ff
          letter-spacing: 1px
          text-align: left
          line-height: 12px;
      li.-last
        border-right: 0px
</style>
