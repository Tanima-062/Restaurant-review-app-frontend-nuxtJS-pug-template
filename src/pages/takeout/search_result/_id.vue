<template lang="pug">
.listsearchbox
  .condition(@click='isShowSearch = true')
    .search-texts
      .search-text
        Span(fontSize='small') {{ getSearchBox.suggestTextName }}
      .search-text
        Span(fontSize='small', v-if='getSearchBox.cookingGenreCdName') {{ getSearchBox.cookingGenreCdName }} {{ getSearchBox.menuGenreCdName }}
        Span(fontSize='small', v-else) すべての料理ジャンル
    search-icon.search-icon
  take-out-search(
    :isShow='isShowSearch',
    @close='isShowSearch = false',
    title='再検索'
  )
  hr.showline
  .mapsearch
    button.circle_mapSearchicon(
      @click='clickmapSearch()',
      :disabled='storeResponse.stores === "notStore" || !storeResponse'
    )
      map-mark.-mapSearchicon
    paragraph-bold.mapSearchText(fontSize='tiny') 地図検索
    //- clickでモーダル
  .searchlists(v-if='storeResponse !== false')
    search-list-grid(v-if='storeResponse', :stores='storeResponse.stores')
  full-loading(:isLoading='reloadFlag')
  pagination.-pagination(
    v-if='storePage && storePage.pageMax > 1',
    v-show='!fromMaps()',
    :nowPage='Number(storePage.page)',
    :pageMax='storePage.pageMax',
    @updateDisplayPage='updateDisplayPage'
  )
  template(v-if='Recommend.length > 0')
    hr.sectionLast
    section.recommendlists
      .listtop
        Heading#moretext.fs-18(fontSize='m') おすすめのテイクアウト
        nuxt-link#more(to='/takeout/recommend')
          paragraph#linksText(fontSize='medium') すべて見る
    carousel-nav#carousel(:List='Recommend' :is-takeout="true")
  template(v-if='storys.length > 0')
    hr.sectionLast
    section.ampstories
      Heading.fs-18.storyHead(fontSize='m') おすすめの最新ストーリー
      carousel-amp-nav#carousel(:List='storys')
  hr.sectionLast
  .contents
    a(href='https://skyticket.jp/campaign/gourmet_sale.php')
      .banner
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Heading, Paragraph, ParagraphBold, Span, SpanBold } from '~/components/atoms/typography'
import CarouselAmpNav from '~/components/organisms/CarouselAmpNav.vue'
import CarouselNav from '~/components/organisms/CarouselNav.vue'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
import FullLoading from '~/components/molecules/loading/FullLoading.vue'
import ListIcon from '~/assets/icon/list.svg'
import MapMark from '~/assets/icon/location-here.svg'
import Pagination from '~/components/molecules/pagination/Pagination.vue'
import SearchIcon from '~/assets/icon/search.svg'
import SearchListGrid from '~/components/atoms/grid/SearchListGrid.vue'
import TakeOutSearch from '~/components/molecules/select/TakeOutSearch.vue'
import ThumbnailIcon from '~/assets/icon/thumbnail.svg'
@Component({
  components: {
    CarouselAmpNav,
    CarouselNav,
    CTAButton,
    FullLoading,
    Heading,
    ListIcon,
    MapMark,
    Pagination,
    Paragraph,
    ParagraphBold,
    SearchIcon,
    SearchListGrid,
    TakeOutSearch,
    Span,
    SpanBold,
    ThumbnailIcon
  }
})
export default class SearchListsTakeoutIndex extends Vue {
  head() {
    return {
      title: this.metaPrefix + 'テイクアイト・持ち帰り',
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' },
        {
          hid: 'description',
          name: 'description',
          content:
            this.metaPrefix +
            'おすすめのテイクアウト・持ち帰りを予約するならスカイチケット グルメ！焼き鳥、寿司、中華、ピザ、など様々な料理ジャンルの多彩なメニューから選んで、事前に予約し、お店ですぐに持ち帰り！人気のお店も多数掲載。'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            this.metaPrefix +
            'おすすめのテイクアウト・持ち帰りを予約するならスカイチケット グルメ！焼き鳥、寿司、中華、ピザ、など様々な料理ジャンルの多彩なメニューから選んで、事前に予約し、お店ですぐに持ち帰り！人気のお店も多数掲載。'
        }
      ]
    }
  }

  fetch({ store }) {
    store.dispatch('modules/layout/setHeaderInfo', {
      layoutType: 2,
      returnPath: '/takeout',
      headerTitle: 'グルメ/検索結果'
    })
  }

  isDatepickerShow = false
  isShowSearch = false
  reloadFlag = false
  isListFlag = 1
  researchArea = ''
  storeResponse = []

  // 位置情報からデータを取得
  get getStoreResponse() {
    const data = this.$store.getters['modules/search_store/getStoreList']
    if (data) {
      if (data.sumCount === 0) {
        // this.poptype = 'error'
        // this.alertMessage = 'お近くの店舗が見つかりませんでした。'
        // this.isAlertPopShown = true
        return { stores: 'notStore' }
      }
      return data
    } else {
      return false
    }
  }

  get getSearchBox() {
    // 選択されているデータ
    return this.$store.getters['modules/search_store/getSearchBoxTO']
  }

  get metaPrefix() {
    let prefix = ''
    if (this.getSearchBox.suggestTextName) {
      prefix += this.getSearchBox.suggestTextName + 'の'
    }
    if (this.getSearchBox.cookingGenreCdName) {
      prefix += '『' + this.getSearchBox.cookingGenreCdName
      if (this.getSearchBox.menuGenreCdName) {
        prefix += '・' + this.getSearchBox.menuGenreCdName
      }
      prefix += '』'
    }
    return prefix || '『すべての料理ジャンル』'
  }

  async asyncData({ route, store }) {
    let storeResponseData
    if (store.getters['modules/search_store/getSearchBoxTO'].cookingGenreCd === '') {
      await store.dispatch('modules/area/SearchBoxTO')
      await store.dispatch('modules/suggest_search/ResetChild')
      await store.dispatch('modules/search_store/setSearchBoxTO', route.query)
    }
    await store.dispatch('modules/recommend/InitRecommendTO')
    await store.dispatch('modules/story/InitAmpsTO')

    let reloadFlag = true
    const areaCd = route.params.id
    if (areaCd === undefined) {
      await store.dispatch('modules/search_store/storeSearch', store.getters['modules/search_store/getSearchBoxTO'])
    } else if (areaCd === 'map_result') {
      // マップから来たら叩かない
      reloadFlag = false
    }

    // Get data from location information
    const data = store.getters['modules/search_store/getStoreList']

    if (data) {
      if (data.sumCount === 0) {
        storeResponseData = { stores: 'notStore' }
      }
      storeResponseData = data
    } else {
      storeResponseData = false
    }

    // stories
    const storys = store.getters['modules/story/getAmpsTO']

    // Recommend
    const Recommend = store.getters['modules/recommend/getRecommendTO'].result
      ? store.getters['modules/recommend/getRecommendTO'].result
      : []

    if (!process.server) {
      reloadFlag = false
    }

    return {
      reloadFlag,
      storys,
      Recommend,
      storeResponse: storeResponseData
    }
  }

  async updateDisplayPage(value) {
    window.scrollTo(0, 0)
    this.$store.dispatch('modules/search_store/setSearchBoxTO', { page: value })
    await this.$store.dispatch('modules/search_store/storeSearch', this.getSearchBox)
  }

  clickmapSearch() {
    if (this.getStoreResponse) {
      this.$router
        .push(
          '/map/?lat=' +
          this.getStoreResponse.stores[0].latitude +
          '&lng=' +
          this.getStoreResponse.stores[0].longitude +
          '&list=' +
          true +
          '&pl=take'
        )
        .catch(() => {
          // promiseをキャッチ
        })
    } else {
      this.$router.push('/map/')
    }
  }

  goReccomendPage() {
    this.$router.push('/takeout/recommend')
  }

  // 店舗一覧を出力する
  get storePage() {
    this.reloadFlag = false
    if (this.$store.getters['modules/search_store/getStoreList']) {
      return this.$store.getters['modules/search_store/getStoreList']
    }
  }

  fromMaps() {
    // mapからきたら20件以上出さない
    const areaCd = this.$route.params.id
    return areaCd === 'map_result'
  }
}
</script>
<style lang="sass" scoped>
.listsearchbox
  width: 100%
  .showline
    margin-left: calc(-50vw + 50%)
    margin-right: calc(-50vw + 50%)
    margin-top: 0px
    height: 4px
    box-shadow: inset 0px 4px 4px -4px #999
  .circle_mapSearchicon
    position: absolute
    border-radius: 50%
    background-color: white
    border: solid 1px #e4e4e4
    width: 40px
    height: 40px
    outline: none
    margin: 10px
    margin-top: 3px
    top: 0%
    right: 0%
    cursor: pointer
    &:hover
      opacity: 0.6
    .-mapSearchicon
      width: 26px
      height: 24px
      fill: $dark_gray
      margin-top: 3px
      z-index: 2
      &:hover
        fill: white
  .mapSearchText
    display: none
  .fs-18
    font-size: 18px
  .condition
    display: grid
    grid-auto-flow: column
    justify-content: space-between
    align-items: center
    cursor: pointer
    padding: 12px 0
    .search-texts
      overflow: hidden
      .search-text
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
    .search-icon:hover
      opacity: 0.6
  .sectionLast
    margin: 10px calc(50% - 50vw)
    height: 10px
    background-color: #f4f4f4
  .sortbox
    position: relative
    margin-top: 20px
    .-sort
      height: 15px
      position: absolute
      right: 0
      margin-top: 5px
      display: flex
      z-index: 1
      .-sorticon1
        width: 24px
        height: 20px
        margin: 0 10px
        fill: #a6a6a6
        z-index: 1
      .-sorticon2
        width: 24px
        height: 20px
        margin-left: 5px
        margin-right: 2px
        fill: #a6a6a6
        z-index: 1
      .-sorttext1
        color: #a6a6a6
      .-sorttext2
        color: #a6a6a6
      .fillBlue
        fill: #1c5db5
      .fillBlueText
        color: #1c5db5
  .searchlists
    margin: 10px 0
    width: 100vw
    margin-left: calc(-50vw + 50%)
    margin-right: calc(-50vw + 50%)
    background-color: $white
    padding: 10px 0px
    .listtop
      position: relative
      padding: 10px 20px
      margin-top: -22px
    .fleximage
      display: flex
      width: 100vw
      margin-left: calc(-50vw + 50%)
      margin-right: calc(-50vw + 50%)
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
    .btn
      width: 60%
      margin: 20px auto
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
          border-bottom: solid 1px #0896ff
        #linksText:hover
          border-bottom: solid 1px #ffffff
  .ampstories
    padding: 20px 0 0 7px
    width: 100%
  #carousel
    margin-bottom: 10px
    width: 100vw
    margin-left: calc(-50vw + 50%)
    margin-right: calc(-50vw + 50%)
  .contents
    padding: 20px 0px
    .banner
      width: 330px
      height: 108px
      background: url('~@/static/img/lp/banner_sp.png')no-repeat
      background-size: cover
      margin: 0 auto
    .banner:hover
      opacity: 0.6
@include pc_view
  .listsearchbox
    width: 100%
    .mapsearch
      height: 40px
      position: relative
      margin: 16px 0
      .circle_mapSearchicon
        position: absolute
        border-radius: 50%
        background-color: white
        border: solid 1px #e4e4e4
        width: 40px
        height: 40px
        outline: none
        margin: 10px
        margin-right: 60px
        top: 0%
        right: 0px
        &:hover
          opacity: 0.6
        .-mapSearchicon
          width: 26px
          height: 24px
      .mapSearchText
        display: block
        position: absolute
        top: 0%
        right: 0px
        margin-top: 20px
        &:hover
          opacity: 0.6
    .fs-18
      font-size: 20px
    .searchlists
      margin: 0 auto
      width: 100%
      .fleximage
        margin: 0 auto
        width: 100%
      .oneLineList
        margin: 0 auto
        width: 100%
    .recommendlists
      width: 100%
      margin: 0 auto
    .ampstories
      width: 100%
      margin: 0px auto
      padding: 20px 0 0 7px
    #carousel
      width: 100%
      margin: 0 auto
      margin-bottom: 10px
    .contents
      padding: 20px 0px
      .banner
        width: 992px
        height: 80px
        background: url('~@/static/img/lp/banner_pc.png')no-repeat
    .sectionLast
      width: 100%
      margin: 0 auto
    .sortbox
      position: relative
      margin-top: 20px
      .-sort
        height: 15px
        position: absolute
        right: 0
        margin-top: 5px
        display: flex
        .-sorticon1
          width: 24px
          height: 20px
          fill: #a6a6a6
          margin: 0
          margin-right: 3px
          z-index: 1
        .-sorticon2
          width: 24px
          height: 20px
          margin-left: 5px
          margin-right: 3px
          fill: #a6a6a6
          z-index: 1
        .-sorttext1
          color: #a6a6a6
          margin-right: 15px
          margin-top: -1px
        .-sorttext2
          color: #a6a6a6
          margin-top: -1px
        .fillBlue
          fill: #1c5db5
        .fillBlueText
          color: #1c5db5
  .-pagination
    width: 30%
    margin: 0 auto
    margin-top: 24px
    margin-bottom: 32px
</style>
