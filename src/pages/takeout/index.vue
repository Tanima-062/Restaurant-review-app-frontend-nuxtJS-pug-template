<template lang="pug">
.top
  .topimages
    .topindex
      heading.thema(:number='1', fontSize='m') {{ `${$feature("phase1") ? "" : "【東京】"}テイクアウトを簡単に検索・予約！` }}
      two-switch-tab.box(
        fontSizeLeft='small',
        typeLeft='default',
        textLeft='レストラン',
        colorLeft='dark_gray',
        backgroundcolorLeft='#f4f4f4',
        fontSizeRight='small',
        typeRight='default',
        textRight='テイクアウト',
        colorRight='white',
        backgroundcolorRight='#1c5db5',
        stating=2
      )
      area-form.rectbox(@searchPushes='goOtherPage()')
  .content
    .news(v-if="infomation")
      notification-top.infomation(
        :noticebox='infomation',
        icon='info',
        appCd='TO',
      )
    hr.sectionLast(v-if="infomation")
    div.spaceForNotExistNotification(v-if="!infomation")
    .recommendStore
      Heading#storeText.fs-18.recommendHead(fontSize='m') 一覧からお店を探す
      .threeIcons
        nuxt-link.mapIcon(to='/takeout/area-list')
          map-jp-icon
          paragraph.-area(fontSize='tiny') エリア一覧
        nuxt-link.menuIcon(to='/takeout/genre-list')
          menu-icon
          paragraph.-menu(fontSize='tiny') 料理ジャンル一覧
    div(v-if='Recommend.length > 0')
      hr.sectionLast
      section.recommendlists
        .listtop
          Heading#moretext.fs-18(fontSize='m') おすすめのテイクアウト
          nuxt-link#more(to='/takeout/recommend')
            paragraph#linksText(fontSize='medium') すべて見る
      carousel-nav#carousel(:List='Recommend' :is-takeout="true")
    div(v-if='storys.length > 0')
      hr#section.sectionLast
      section.ampstories
        Heading.fs-18.storyHead(fontSize='m') おすすめの最新ストーリー
        carousel-amp-nav#carousel(:List='storys')
    hr.sectionLast
    section.contents
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
import { Heading, SpanBold, Paragraph, ParagraphBold } from '~/components/atoms/typography'
import { urlQueryFormat } from '~/plugins/util'
import AreaForm from '~/components/atoms/form/AreaForm.vue'
import TwoSwitchTab from '~/components/atoms/tab/TwoSwitchTab.vue'
import ItemNav from '~/components/organisms/ItemNav.vue'
import CircleNav from '~/components/organisms/CircleNav.vue'
import CarouselNav from '~/components/organisms/CarouselNav.vue'
import CarouselAmpNav from '~/components/organisms/CarouselAmpNav.vue'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
import Pagination from '~/components/molecules/pagination/Pagination.vue'
import ListGrid from '~/components/atoms/grid/ListGrid.vue'
import ThumbnailIcon from '~/assets/icon/thumbnail.svg'
import ListIcon from '~/assets/icon/list.svg'
import MapJpIcon from '~/assets/icon/map-jp.svg'
import MenuIcon from '~/assets/icon/menu.svg'
import SpoonKnifeIcon from '~/assets/icon/spoon-knife.svg'
import NotificationTop from '~/components/molecules/card/NotificationTop.vue'
import ApiLoading from '~/components/atoms/loading/ApiLoading.vue'
@Component({
  components: {
    AreaForm,
    Heading,
    SpanBold,
    Paragraph,
    ParagraphBold,
    TwoSwitchTab,
    NotificationTop,
    ApiLoading,
    ItemNav,
    CircleNav,
    CTAButton,
    Pagination,
    CarouselNav,
    CarouselAmpNav,
    ListGrid,
    ThumbnailIcon,
    ListIcon,
    MapJpIcon,
    MenuIcon,
    SpoonKnifeIcon
  }
})
export default class NewTopIndex extends Vue {
  head() {
    return {
      title: 'テイクアウト・持ち帰りを多彩なメニューから予約',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'テイクアウト・持ち帰りを予約するならスカイチケットグルメ！焼き鳥、寿司、中華、ピザ、焼肉、海鮮などの多彩なメニューから選んで、事前に予約。お店ですぐに持ち帰り！人気の東京 池袋、新宿、渋谷エリアや大阪 阪南エリアのお店も多数掲載。'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'テイクアウト・持ち帰りを予約するならスカイチケットグルメ！焼き鳥、寿司、中華、ピザ、焼肉、海鮮などの多彩なメニューから選んで、事前に予約。お店ですぐに持ち帰り！人気の東京 池袋、新宿、渋谷エリアや大阪 阪南エリアのお店も多数掲載。'
        }
      ]
    }
  }

  async asyncData({ store }) {
    if (store.getters['modules/search_store/getSearchBoxTO'].cookingGenreCd === '') {
      await store.dispatch('modules/recommend/InitRecommendTO')
      await store.dispatch('modules/story/InitAmpsTO')
      await store.dispatch('modules/suggest_search/ResetChild')
      // recommends
      const recommends = store.getters['modules/recommend/getRecommendTO'].result
        ? store.getters['modules/recommend/getRecommendTO'].result
        : []

      // stories
      const stories = store.getters['modules/story/getAmpsTO']
      return { Recommend: recommends, storys: stories }
    }
  } // asyncData for server-side-rendering

  fetch({ store }) {
    store.dispatch('modules/layout/setHeaderInfo', {
      layoutType: 0,
      headerTitle: 'グルメ'
    })
    // const storeBox = store.getters['modules/search_store/getSearchBoxTO']
    // if (storeBox.cookingGenreCd === '') {
    //   await store.dispatch('modules/recommend/InitRecommendTO')
    //   await store.dispatch('modules/story/InitAmpsTO')
    //   store.dispatch('modules/suggest_search/ResetChild')
    // }
  }

  // お知らせ
  get infomation() {
    return Object.keys(this.$store.getters['modules/notification/getNotificationTO']).length > 0
      ? this.$store.getters['modules/notification/getNotificationTO']
      : ''
  }

  // 結果のページに飛ばす
  goOtherPage() {
    // this.$store.dispatch('modules/search_store/storeSearch', this.getSearchBox).then()
    this.$store.dispatch('modules/search_store/setSearchBoxTO', { page: null })
    this.$router.push('/takeout/search_result/' + urlQueryFormat((this.$store.getters['modules/search_store/getSearchBoxTO'])))
  } // おすすめページに飛ばす

  goReccomendPage() {
    this.$router.push('/takeout/recommend')
  } // アンプ取得
}
</script>
<style lang="sass" scoped>
.top
  background-size: 100% 250px
  .topimages
    width: 100vw
    height: 250px
    padding: 0 16px
    margin-left: calc(-50vw + 50%)
    margin-right: calc(-50vw + 50%)
    background: url('~@/static/img/take_img/bg_takeout.jpg')top left no-repeat
    background-size: cover
    position: relative
    .topindex
      width: 100%
      max-width: 1000px
      margin: 0 auto
  .content
    max-width: 1000px
    padding: 0
    margin: 0 auto
    .morebutton
      text-align: center
      margin: 30px 0
    .spaceForNotExistNotification
      height: 56px
      @media screen and (min-width: 768px)
        height: 32px
  .rectbox
    height: 230px
    min-width: 320px
    @media screen and (max-width: 320px)
      min-width: 290px
      margin-top: -3px
  .notfound
    text-align: center
    margin-bottom: 50px
  .fs-18
    font-size: 18px
  .ampstories
    padding-top: 20px
    width: 100%
    min-width: 320px
  .thema
    color: white
    text-align: left
    padding-top: 20px
  .sectionLast
    margin: 10px calc(50% - 50vw)
    height: 8px
    background-color: #f4f4f4
  #section
    margin-top: 16px
    @include pc_view
      margin-top: 0px
  .oneLineList
    display: flex
    height: auto
    width: 100vw
    margin-left: calc(-50vw + 50%)
    margin-right: calc(-50vw + 50%)
    .-imgs-list
      width: 35%
    .-areas-list
      width: 65%
      .graybox
        background-color: #f4f4f4
        padding: 0 5px
        margin: 5px
  .infomation
    margin-bottom: 10px
    margin-top: 40px
  .recommendStore
    min-width: 320px
    .recommendHead
      padding-bottom: 5px
    .threeIcons
      display: flex
      padding: 20px 20px 0 20px
      .mapIcon
        width: 50px
        margin: 0 auto
        .-area
          width: 80px
          margin: 10px auto
      .mapIcon:hover
        opacity: 0.6
      .menuIcon
        width: 39px
        margin: 0 auto
        .-menu
          width: 110px
          margin: 10px auto
          margin-left: -20px
      .menuIcon:hover
        opacity: 0.6
  .recommendlists
    background-color: $white
    padding: 10px 0px
    padding-bottom: 0px
    margin-bottom: 0px
    width: 100%
    .listtop
      padding: 10px 0px
      width: 100%
      margin: 0 auto
      display: flex
      #moretext
        padding-top: 5px
      #more
        margin-left: auto
        #linksText
          color: #0896ff
          text-decoration: underline
        #linksText:hover
          text-decoration: none
  #carousel
    margin-bottom: 10px
    width: 100%
  .contents
    padding: 20px 0px 24px 0px
    .banner
      width: 330px
      height: 108px
      background: url('~@/static/img/lp/banner_sp.png')no-repeat
      background-size: cover
      margin: 0 auto
    .banner:hover
      opacity: 0.6
#storeText
  @include sp_view
    margin-top: 32px
.news
  padding-top: 37px
  @include pc_view
    padding-top: 16px
  @media screen and (min-width: 450px) and (max-width: 768px)
    padding-top: 10px
@include pc_view
  .top
    .topindex
      width: 1000px
      margin: 0 auto
    .fs-18
      font-size: 20px
    .rectbox
      height: 200px
      margin-bottom: 32px
    .thema
      font-size: 32px
      margin: 0 auto
      text-align: left
      padding-top: 32px
    .infomation
      margin-bottom: 32px
    .-pagination
      width: 30%
      margin: 0px auto
      margin-top: 24px
      margin-bottom: 32px
    .oneLineList
      margin: 0 auto
    .recommendStore
      min-width: 320px
      padding: 32px 0
      .recommendHead
        padding-bottom: 5px
      .threeIcons
        display: flex
        padding: 20px 20px 0 20px
        margin-right: 100px
        .mapIcon
          width: 50px
          margin: 0 auto
          position: relative
          .-area
            position: absolute
            width: 80px
            margin: 10px auto
            left: 140%
            top: 10%
            font-size: 14px
        .menuIcon
          width: 40px
          margin: 0 auto
          position: relative
          .-menu
            font-size: 14px
            position: absolute
            left: 200%
            top: 10%
            width: 130px
            margin: 10px auto
            margin-left: -20px
    .recommendlists
      margin: 0 auto
    .ampstories
      margin: 0px auto
    .sectionLast
      margin: 0 auto
    #carousel
      margin: 0 auto
      margin-bottom: 10px
    .contents
      .banner
        width: 100%
        height: 80px
        background: url('~@/static/img/lp/banner_pc.png')no-repeat
        background-size: 100%
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
