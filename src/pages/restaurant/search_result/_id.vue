<template lang="pug">
.listsearchbox
  .condition(@click='isShowSearch = true')
    .search-texts
      .search-text
        Span(fontSize='small') {{ searchTexts[0] }}
      .search-text(v-if='!whenever')
        Span(fontSize='small') {{ searchTexts[1] }}
    search-icon.search-icon
  restaurant-search(
    :isShow='isShowSearch',
    :search-info='query',
    :whenever='whenever',
    @update-query='updateQuery',
    @close='isShowSearch = false',
    title='再検索'
  )
  hr.showline
    //- clickでモーダル
  .searchlists(v-if='storeResponse')
    search-list-grid(
      v-if='storeResponse',
      :stores='storeResponse.stores',
      gourmetType='RT'
    )
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
        Heading.moretext.fs-18(fontSize='m') おすすめのレストラン
        nuxt-link.more(:to='`/restaurant/recommend/${recommendQuery}`')
          paragraph.linksText(fontSize='medium') すべて見る
    carousel-nav.carousel(:List='Recommend', :is-takeout='false')
  template(v-if='storys.length > 0')
    hr.sectionLast
    section.ampstories
      Heading.fs-18.storyHead(fontSize='m') おすすめの最新ストーリー
      carousel-amp-nav.carousel(:List='storys')
  hr.sectionLast
  .contents
    a(href='https://skyticket.jp/campaign/gourmet_sale.php')
      .banner
</template>
<script lang="ts">
import { Watch, Component, Vue } from 'nuxt-property-decorator'
import { parseISO, format } from 'date-fns'
import ja from 'date-fns/locale/ja'
import omit from 'lodash/omit'
import cloneDeep from 'lodash/cloneDeep'
import { Heading, Paragraph, ParagraphBold, Span, SpanBold } from '~/components/atoms/typography'
import { setUrlQuery, propertyFormat, formatDateTime, initVisitProperty } from '~/plugins/util'
import { searchBoxRS } from '~/store/modules/search_store/index'
import CarouselAmpNav from '~/components/organisms/CarouselAmpNav.vue'
import CarouselNav from '~/components/organisms/CarouselNav.vue'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
import FullLoading from '~/components/molecules/loading/FullLoading.vue'
import ListIcon from '~/assets/icon/list.svg'
import Pagination from '~/components/molecules/pagination/Pagination.vue'
import RestaurantSearch from '~/components/molecules/select/RestaurantSearch.vue'
import SearchIcon from '~/assets/icon/search.svg'
import SearchListGrid from '~/components/atoms/grid/SearchListGrid.vue'
import ThumbnailIcon from '~/assets/icon/thumbnail.svg'
@Component({
  components: {
    CarouselAmpNav,
    CarouselNav,
    CTAButton,
    FullLoading,
    Heading,
    ListIcon,
    Pagination,
    Paragraph,
    ParagraphBold,
    RestaurantSearch,
    SearchIcon,
    SearchListGrid,
    Span,
    SpanBold,
    ThumbnailIcon
  }
})
export default class SearchListsRestaurantIndex extends Vue {
  // URLクエリで表示するデータ
  query: { [key: string]: string | number | null } = {
    visitTime: '',
    visitDate: '',
    visitPeople: 0,
    appCd: searchBoxRS.appCd
  }

  isShowSearch = false
  reloadFlag = true
  recommendQuery = ''
  routerReplace = false

  head() {
    return {
      title: this.metaPrefix + 'レストラン・飲食店を予約',
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' },
        {
          hid: 'description',
          name: 'description',
          content:
            this.metaPrefix +
            'おすすめのレストランを検索・予約するならスカイチケット！焼肉・イタリアン・中華・ハンバーガー・寿司・ステーキ・食べ放題・ご当地グルメなど、様々なジャンルの飲食店を掲載。'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            this.metaPrefix +
            'おすすめのレストランを検索・予約するならスカイチケット！焼肉・イタリアン・中華・ハンバーガー・寿司・ステーキ・食べ放題・ご当地グルメなど、様々なジャンルの飲食店を掲載。'
        }
      ]
    }
  }

  fetch({ store }) {
    store.dispatch('modules/layout/setHeaderInfo', {
      layoutType: 2,
      returnPath: '/restaurant/',
      headerTitle: 'レストラン一覧'
    })
  }

  updated() {
    if (this.$router.currentRoute.fullPath.includes('map_result') && !this.areaName) {
      this.$store.dispatch('modules/layout/setHeaderInfo', {
        layoutType: 2,
        returnPath: '/restaurant/',
        headerTitle: '現在地から近い店舗一覧'
      })
    } else if (this.areaName) {
      this.$store.dispatch('modules/layout/setHeaderInfo', {
        layoutType: 2,
        returnPath: '/restaurant/',
        headerTitle: `${this.areaName}のレストラン一覧`
      })
    } else {
      this.$store.dispatch('modules/layout/setHeaderInfo', {
        layoutType: 2,
        returnPath: '/restaurant/',
        headerTitle: 'レストラン一覧'
      })
    }
  }

  async asyncData({ route, store, query }) {
    let reloadFlag = true
    let routerReplace = false
    let queryInfo: { [key: string]: string | number | null } = {
      visitTime: '',
      visitDate: '',
      visitPeople: 0,
      appCd: searchBoxRS.appCd
    }
    let recommendQuery = ''
    let whenever = store.getters['modules/search_store/getWhenever']

    /**
     * queryデータ内にvisitDate,visitTime,visitPeopleがあるかどうか判別
     * 一つでも欠けていた場合はwheneverをtrueにする
     */
    function initWhenever(query) {
      if (['visitDate', 'visitTime', 'visitPeople'].every((name) => query[name])) {
        whenever = false
      } else {
        whenever = true
      }
    }

    function mountedQueryData() {
      const formatQuery = propertyFormat(searchBoxRS, setUrlQuery(route.query))
      initWhenever(formatQuery)

      if (whenever) {
        // 日付未定の場合はvuexの値を初期化して入れる
        // eslint-disable-next-line prettier/prettier
        store.dispatch(
          'modules/search_store/setSearchBoxRS',
          initVisitProperty(store.getters['modules/search_store/getSearchBoxRS'])
        )
        // eslint-disable-next-line prettier/prettier
        const { visitDate, visitTime, visitPeople } = store.getters['modules/search_store/getSearchBoxRS']

        Object.assign(formatQuery, {
          visitDate,
          visitTime,
          visitPeople
        })
      }
      queryInfo = Object.assign(
        {},
        queryInfo,
        formatDateTime({
          date: String(formatQuery.visitDate),
          time: String(formatQuery.visitTime)
        })
      )
      Object.keys(searchBoxRS).forEach((key) => {
        // 日付と時間は先に上で処理する
        if (['visitDate', 'visitTime'].includes(key)) {
          return
        }
        if (key === 'visitPeople') {
          let people
          if (!Number(formatQuery[key])) {
            people = searchBoxRS[key]
          } else if (Number(formatQuery[key]) < 1) {
            people = 1
          } else if (Number(formatQuery[key]) > 99) {
            people = 99
          } else {
            people = formatQuery[key]
          }
          queryInfo = Object.assign({}, queryInfo, {
            [key]: people
          })
        } else if (key === 'appCd') {
          // 必須項目(固定値なので上書き)
          queryInfo = Object.assign({}, queryInfo, {
            [key]: searchBoxRS[key]
          })
        } else {
          queryInfo = Object.assign({}, queryInfo, { [key]: formatQuery[key] })
        }
      })
    }

    function mightRemoveVisitProperty(query) {
      if (whenever) {
        return omit(cloneDeep(query), ['visitDate', 'visitTime', 'visitPeople'])
      }
      return query
    }

    async function fetchRecommend() {
      const { suggestCd, suggestText } = queryInfo
      let pickupRecommend = {}
      if (suggestCd && suggestText) {
        pickupRecommend = suggestCd === 'AREA' ? { areaCd: suggestText } : { stationCd: suggestText }
        recommendQuery = `?suggestCd=${suggestCd}&suggestText=${suggestText}`
      } else {
        recommendQuery = ''
      }
      await store.dispatch('modules/recommend/InitRecommendRS', pickupRecommend)
    }

    await store.dispatch('modules/area/SearchBoxRS')
    if (query.cookingGenreCd) {
      await store.dispatch('modules/suggest_search/ResetChild')
    }
    const areaCd = route.params.id
    mountedQueryData()
    if (areaCd === 'map_result') {
      // Do not hit if it comes from the map
      reloadFlag = false
    } else {
      const query = mightRemoveVisitProperty(queryInfo)
      // eslint-disable-next-line
      await store.dispatch('modules/search_store/storeSearch', mightRemoveVisitProperty(query)).catch((err) => {
        // If an error is returned, remove the relevant parameter and search again
        const params = err.response.data.errors
        Object.keys(params).forEach((param) => (queryInfo = omit(queryInfo, [`${param}`])))
        routerReplace = true
      })
    }
    // store update
    await store.dispatch('modules/search_store/setSearchBoxRS', queryInfo)
    await fetchRecommend()
    await store.dispatch('modules/story/InitAmpsRS')
    routerReplace = true

    // Recommend
    const Recommend = store.getters['modules/recommend/getRecommendRS'].result
      ? store.getters['modules/recommend/getRecommendRS'].result
      : []

    return {
      reloadFlag,
      routerReplace,
      query: queryInfo,
      recommendQuery,
      Recommend
    }
  }

  // urlクエリが変わった時にstoreSearchを叩く（戻る、進む対策）
  @Watch('$route.query')
  async search() {
    this.mountedQueryData()
    this.reloadFlag = true
    this.fetchRecommend()
    await this.$store.dispatch('modules/search_store/storeSearch', this.mightRemoveVisitProperty(this.query))
    this.$store.dispatch('modules/search_store/setSearchBoxRS', this.query)
    this.reloadFlag = false
  }

  // 位置情報からデータを取得
  get storeResponse() {
    const data = this.$store.getters['modules/search_store/getStoreList']
    if (data) {
      if (data.sumCount === 0) {
        return { stores: 'notStore' }
      }
      return data
    } else {
      return false
    }
  }

  updateDisplayPage(value: number) {
    window.scrollTo(0, 0)
    this.query = Object.assign({}, this.query, { page: value })
    this.$store.dispatch('modules/search_store/setSearchBoxRS', this.query)
    this.$router
      .push({
        path: '/restaurant/search_result/',
        query: setUrlQuery(this.mightRemoveVisitProperty(this.query))
      })
  }

  get whenever() {
    return this.$store.getters['modules/search_store/getWhenever']
  }

  set whenever(whenever) {
    this.$store.dispatch('modules/search_store/setWhenever', whenever)
  }

  get storys() {
    return this.$store.getters['modules/story/getAmpsRS']
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

  get preferences() {
    return this.$store.getters['modules/search_store/getPreference'].genres
  }

  get areaName(): string {
    if (this.$store.getters['modules/area/getSearchBoxRS'].areas) {
      const area = this.$store.getters['modules/area/getSearchBoxRS'].areas.filter(
        (area) => area.areaCd === this.query.suggestText
      )
      return area.length === 0 ? '' : area[0].name
    }
    return ''
  }

  get cookingGenreName() {
    if (this.$store.getters['modules/suggest_search/getResearchGenre']) {
      const genre = this.$store.getters['modules/suggest_search/getResearchGenre'].filter(
        (genre) => genre.genreCd === this.query.cookingGenreCd
      )
      return genre.length === 0 ? '' : genre[0].name
    }
    return ''
  }

  // menuのoptionリストを取得
  get cookingMenuName() {
    if (this.$store.getters['modules/suggest_search/getResearchGenreChild']) {
      const genreChild = this.$store.getters['modules/suggest_search/getResearchGenreChild'].filter(
        (genre) => genre.genreCd === this.query.menuGenreCd
      )
      return genreChild.length === 0 ? '' : genreChild[0].name
    }
    return ''
  }

  get metaPrefix() {
    let prefix = ''
    if (this.areaName) {
      prefix += this.areaName + 'の'
    }
    if (this.cookingGenreName) {
      prefix += '『' + this.cookingGenreName
      if (this.cookingMenuName) {
        prefix += '・' + this.cookingMenuName + '』'
      } else {
        prefix += '』'
      }
    }
    if (this.query.details) {
      if (prefix.length > 0) {
        prefix += '、『' + this.formatPreferenceName(this.convertPreferenceAry(this.query.details.toString())) + '』'
      } else {
        prefix += '『' + this.formatPreferenceName(this.convertPreferenceAry(this.query.details.toString())) + '』'
      }
    }

    return prefix || '『すべての料理ジャンル』'
  }

  /**
   * 配列で作る。未設定の場合はトルツメ
   * 1段目は
   *  エリア名・料理ジャンル・メニュージャンル・こだわり条件
   * 2段目は
   *  日付（1/1（金））・時間（13:00）・人数
   */
  get searchTexts() {
    const firstLine = [this.areaName, this.cookingGenreName, this.cookingMenuName, this.query.details]
      .reduce((ret: string[], line, index) => {
        if (!line) {
          return ret
        }
        const str = String(line)
        if (str) {
          if (index === 3) {
            // detailsの時は処理を変える
            const detailName = this.formatPreferenceName(this.convertPreferenceAry(str))
            if (detailName) {
              ret.push(detailName)
            }
          } else {
            ret.push(str)
          }
        }
        return ret
      }, [])
      .join('、')
    const secondLine = [
      this.query.visitDate
        ? format(parseISO(String(this.query.visitDate)), 'MM/dd(eee)', {
          locale: ja
        })
        : '',
      this.query.visitTime,
      `${this.query.visitPeople}名`
    ].join(' ')

    return [firstLine === '' ? 'すべての料理ジャンル' : firstLine, secondLine]
  }

  mountedQueryData() {
    const formatQuery = propertyFormat(searchBoxRS, setUrlQuery(this.$route.query))
    this.initWhenever(formatQuery)

    if (this.whenever) {
      // 日付未定の場合はvuexの値を初期化して入れる
      // eslint-disable-next-line prettier/prettier
      this.$store.dispatch(
        'modules/search_store/setSearchBoxRS',
        initVisitProperty(this.$store.getters['modules/search_store/getSearchBoxRS'])
      )
      // eslint-disable-next-line prettier/prettier
      const { visitDate, visitTime, visitPeople } = this.$store.getters['modules/search_store/getSearchBoxRS']

      Object.assign(formatQuery, {
        visitDate,
        visitTime,
        visitPeople
      })
    }
    this.query = Object.assign(
      {},
      this.query,
      formatDateTime({
        date: String(formatQuery.visitDate),
        time: String(formatQuery.visitTime)
      })
    )
    Object.keys(searchBoxRS).forEach((key) => {
      // 日付と時間は先に上で処理する
      if (['visitDate', 'visitTime'].includes(key)) {
        return
      }
      if (key === 'visitPeople') {
        let people
        if (!Number(formatQuery[key])) {
          people = searchBoxRS[key]
        } else if (Number(formatQuery[key]) < 1) {
          people = 1
        } else if (Number(formatQuery[key]) > 99) {
          people = 99
        } else {
          people = formatQuery[key]
        }
        this.query = Object.assign({}, this.query, {
          [key]: people
        })
      } else if (key === 'appCd') {
        // 必須項目(固定値なので上書き)
        this.query = Object.assign({}, this.query, {
          [key]: searchBoxRS[key]
        })
      } else {
        this.query = Object.assign({}, this.query, { [key]: formatQuery[key] })
      }
    })
  }

  /**
   * queryデータ内にvisitDate,visitTime,visitPeopleがあるかどうか判別
   * 一つでも欠けていた場合はwheneverをtrueにする
   */
  initWhenever(query) {
    if (['visitDate', 'visitTime', 'visitPeople'].every((name) => query[name])) {
      this.whenever = false
    } else {
      this.whenever = true
    }
  }

  updateQuery({ query, whenever }) {
    this.whenever = whenever
    this.query = propertyFormat(searchBoxRS, setUrlQuery(query))
    if (this.$route.params.id === 'map_result') {
      this.$router
        .push({
          path: '/restaurant/search_result/',
          query: setUrlQuery(this.mightRemoveVisitProperty(this.query))
        })
        .catch(() => {
          // promiseをキャッチ
        })
      this.$store.dispatch('modules/search_store/setSearchBoxRS', this.query)
    } else {
      // 再検索の時は叩く
      this.$store.dispatch('modules/search_store/setSearchBoxRS', this.query)

      const research = async () => {
        this.reloadFlag = true
        this.fetchRecommend()
        await this.$store.dispatch('modules/search_store/storeSearch', this.mightRemoveVisitProperty(this.query))
        this.$store.dispatch('modules/search_store/setSearchBoxRS', this.query)
        this.reloadFlag = false
      }
      research()

      this.$router.push({ query: setUrlQuery(this.mightRemoveVisitProperty(this.query)) })
    }
  }

  mightRemoveVisitProperty(query) {
    if (this.whenever) {
      return omit(cloneDeep(query), ['visitDate', 'visitTime', 'visitPeople'])
    }
    return query
  }

  convertPreferenceAry(preferences: string): number[] {
    if (!preferences) {
      return []
    }
    return preferences.split(',').reduce((retAry: number[], preference) => {
      if (preference !== '' && !isNaN(Number(preference))) {
        retAry.push(+preference)
      }
      return retAry
    }, [])
  }

  // idからこだわりの名前を取得する
  formatPreferenceName(ids: number[]): string {
    return this.preferences
      .reduce((ret, preference) => {
        if (ids.includes(preference.id)) {
          ret.push(preference.name)
        }
        return ret
      }, [])
      .join('、')
  }

  fromMaps() {
    // mapからきたら20件以上出さない
    const areaCd = this.$route.params.id
    return areaCd === 'map_result'
  }

  fetchRecommend() {
    const { suggestCd, suggestText } = this.query
    let pickupRecommend = {}
    if (suggestCd && suggestText) {
      pickupRecommend = suggestCd === 'AREA' ? { areaCd: suggestText } : { stationCd: suggestText }
      this.recommendQuery = `?suggestCd=${suggestCd}&suggestText=${suggestText}`
    } else {
      this.recommendQuery = ''
    }
    this.$store.dispatch('modules/recommend/InitRecommendRS', pickupRecommend)
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
      .moretext
        padding-top: 5px
      .more
        margin-left: auto
        .linksText
          color: #0896ff
          text-decoration: underline
          text-decoration-color: #0896ff
        .linksText:hover
          text-decoration-color: #ffffff
  .ampstories
    padding: 20px 0 0 7px
    width: 100%
  .carousel
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
    .carousel
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
