<template lang="pug">
.recommendPage
  .pankuzu
    nuxt-link(:to='linkUrl')
      paragraph.-text(fontSize='tiny') {{ backPage }}
  paragraph-bold.-toptext(fontSize='big') エリアで絞り込む
  paragraph.description(fontSize='tiny') {{ message }}
  hr.sectionLast
  paragraph
  template(v-show='areaLists', v-for='(area, keys) in areaLists')
    ul.genre
      li.genre-list(ref='area', @click='getMinPref(keys)')
        next.-icon(:class='["svg" + keys, TFbox[keys] ? "-iconRev" : ""]')
        paragraph-bold.lines(fontSize='large') {{ area.name }}
      ul.foodLists(
        :class="'area' + keys"
        v-show='TFbox[keys]',
        v-for='(Sarea, key) in area.childAreas'
      )
        li(
          @click='pushMinPref(Sarea)',
          :class='[key === 0 ? "childGenre" : ""]'
        )
          paragraph.lines(fontSize='medium') {{ Sarea.name }}
        hr.sectionLast(v-show='key+1!==area.childAreas.length')
    hr.sectionLast(v-show='keys+1!==areaLists.length')
  div(v-if='Recommend.length > 0')
    hr.sectionLast2
    .recommendlists
      .listtop
        Heading#moretext.fs-18(fontSize='m') {{ `おすすめの${isTakeout ? "テイクアウト" : "レストラン"}` }}
        Paragraph.more(
          fontSize='medium',
          color='main',
          @click='goReccomendPage'
        ) すべて見る
      carousel-nav#carousel(:List='Recommend', :is-takeout='isTakeout')
  div(v-if='storys.length > 0')
    hr.sectionLast2
    .ampstories
      Heading.fs-18.storyHead(fontSize='m') おすすめの最新ストーリー
      carousel-amp-nav#carousel(:List='storys')
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import cloneDeep from 'lodash/cloneDeep'
import RecommendCard from '~/components/molecules/card/RecommendCard.vue'
import Pagination from '~/components/molecules/pagination/Pagination.vue'
import Next from '~/assets/icon/nextV2.svg'
import CarouselNav from '~/components/organisms/CarouselNav.vue'
import CarouselAmpNav from '~/components/organisms/CarouselAmpNav.vue'
import { Heading, SpanBold, Paragraph, ParagraphBold, Span } from '~/components/atoms/typography'
import { AreaTypes } from '~/types/areaTypes'
import { urlQueryFormat } from '~/plugins/util'

@Component({
  components: {
    Heading,
    SpanBold,
    Span,
    Paragraph,
    ParagraphBold,
    RecommendCard,
    Pagination,
    Next,
    CarouselNav,
    CarouselAmpNav
  }
})
export default class AreaListIndex extends Vue {
  head() {
    return {
      title:
        this.$route.query.pl === 'res'
          ? 'エリアからレストラン・飲食店を予約'
          : 'テイクアウト・持ち帰りできるお店をエリアから探す',
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' },
        {
          hid: 'description',
          name: 'description',
          content:
            this.$route.query.pl === 'res'
              ? 'レストランを検索・予約するならスカイチケット！東京 新宿・渋谷・池袋や大阪のお店、ご当地グルメ、食べ放題、焼肉・イタリアン・中華・ハンバーガー・寿司など、様々なジャンルの飲食店を掲載。'
              : 'テイクアウト・持ち帰りを予約するならスカイチケットグルメ！お好きなエリアを選んでテイクアウトを事前予約。お店ですぐに持ち帰り！焼き鳥、寿司、中華、ピザ、焼肉、海鮮など様々な料理ジャンルの多彩なメニューから選べる。'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            this.$route.query.pl === 'res'
              ? 'レストランを検索・予約するならスカイチケット！東京 新宿・渋谷・池袋や大阪のお店、ご当地グルメ、食べ放題、焼肉・イタリアン・中華・ハンバーガー・寿司など、様々なジャンルの飲食店を掲載。'
              : 'テイクアウト・持ち帰りを予約するならスカイチケットグルメ！お好きなエリアを選んでテイクアウトを事前予約。お店ですぐに持ち帰り！焼き鳥、寿司、中華、ピザ、焼肉、海鮮など様々な料理ジャンルの多彩なメニューから選べる。'
        }
      ]
    }
  }

  // fetch({ store }) {
  //   store.dispatch('modules/layout/setHeaderInfo', {
  //     layoutType: 1,
  //     headerTitle: 'グルメ/エリア絞込み一覧',
  //     returnPath: ''
  //   })
  // }
  TFbox: boolean[] = []
  isTakeout = true

  async asyncData({ store, route }) {
    const TFbox: boolean[] = []
    let backPage = ''
    let linkUrl = ''
    let message = ''
    let isTakeout = true
    const prefecturesCode = 'japan'

    // area short
    function sortAreaBySortValue(areas: Array<AreaTypes.SelectAreaTypes>) {
      const sortArea = areas.sort((a, b) => {
        return a.sort < b.sort ? -1 : a.sort > b.sort ? 1 : 0
      })
      return sortArea
    }

    await store.dispatch('modules/area/AreaSearch', prefecturesCode)
    const pl = route.query.pl
    if (pl === 'res') {
      isTakeout = false
      backPage = 'レストランTOP'
      linkUrl = '/restaurant/'
      message =
        '近くのレストランを簡単に検索・選択し、そのままウェブ予約ができる便利なグルメサービスです。こちらはエリア条件で検索できるページです。各エリアからグルメなレストランお探しいただけます！'
      await store.dispatch('modules/recommend/InitRecommendRS')
      await store.dispatch('modules/story/InitAmpsRS')
      await store.dispatch('modules/layout/setHeaderInfo', {
        layoutType: 10,
        headerTitle: 'グルメ/エリア絞込み一覧',
        returnPath: ''
      })
    } else {
      backPage = 'テイクアウトTOP'
      linkUrl = '/takeout/'
      message =
        '近くの飲食店メニューからテイクアウト商品を簡単に検索・選択し、そのまま注文できる便利なグルメサービスです。美味しいお店や人気のテイクアウトを掲載中。メニューをエリア条件から探せます。'
      await store.dispatch('modules/recommend/InitRecommendTO')
      await store.dispatch('modules/story/InitAmpsTO')
      await store.dispatch('modules/layout/setHeaderInfo', {
        layoutType: 1,
        headerTitle: 'グルメ/エリア絞込み一覧',
        returnPath: ''
      })
    }

    // areaList
    const areas = cloneDeep(store.getters['modules/area/getSearchArea'])
    for (let i = 0; i < areas.length; i++) {
      TFbox.push(false)
    }
    let sortArea: Array<AreaTypes.SelectAreaTypes> = []
    if (areas.areas) {
      sortArea = sortAreaBySortValue(areas.areas)
    }

    // recommeds
    const recommend = isTakeout
      ? store.getters['modules/recommend/getRecommendTO']
      : store.getters['modules/recommend/getRecommendRS']
    const recommends = recommend.result ? recommend.result : []

    // stories
    const stories = isTakeout ? store.getters['modules/story/getAmpsTO'] : store.getters['modules/story/getAmpsRS']

    // set component
    return {
      areaLists: sortArea,
      Recommend: recommends,
      storys: stories,
      TFbox,
      isTakeout,
      linkUrl,
      backPage,
      message
    }
  }

  mounted() {
    // 東京のみなので開けばなし（地域追加されたら削除予定)
    if (!this.$feature('areaList')) {
      setTimeout(() => {
        if (this.$refs.area) {
          this.$refs.area[0].click()
        }
      }, 0)
    }
  }

  goReccomendPage() {
    const url = this.isTakeout ? '/takeout' : '/restaurant'
    this.$router.push(`${url}/recommend`)
  }

  getMinPref(key) {
    const foodLists = document.querySelectorAll('[class^="foodLists"]')
    const svgs = document.querySelectorAll('[class^="genre-list"] svg')

    // area list svg control
    svgs.forEach((element: Element) => {
      const elementToManipulate = element as HTMLElement
      element.classList.contains('svg' + key)
        ? (elementToManipulate.classList.contains('-iconRev')
          ? elementToManipulate.classList.remove('-iconRev')
          : elementToManipulate.classList.add('-iconRev')
        )
        : elementToManipulate.classList.remove('-iconRev')
    })

    // area list sub-menu control
    foodLists.forEach((element: Element) => {
      const elementToManipulate = element as HTMLElement
      element.classList.contains('area' + key)
        ? (elementToManipulate.style.display === 'block'
          ? elementToManipulate.style.display = 'none'
          : elementToManipulate.style.display = 'block'
        )
        : elementToManipulate.style.display = 'none'
    })
  }

  get SmallArea() {
    return this.$store.getters['modules/area/getSearchAreaSmall']
  }

  pushMinPref({ name, areaCd }) {
    if (this.isTakeout) {
      const updateData = {
        suggestTextName: name,
        suggestCd: 'AREA',
        suggestText: areaCd
      }
      this.$store.dispatch('modules/search_store/resetSearchBoxTO')
      this.$store.dispatch('modules/search_store/setSearchBoxTO', updateData)
      this.$router.push('/takeout/search_result/' + urlQueryFormat(updateData))
    } else {
      const query = { suggestCd: 'AREA', suggestText: areaCd }
      this.$router.push({ path: '/restaurant/search_result/', query })
    }
  }

  // area取得getter
  get areaListsData() {
    const areas = cloneDeep(this.$store.getters['modules/area/getSearchArea'])
    for (let i = 0; i < areas.length; i++) {
      this.TFbox.push(false)
    }
    let sortArea: Array<AreaTypes.SelectAreaTypes> = []
    if (areas.areas) {
      sortArea = this.sortAreaBySortValue(areas.areas)
    }
    return sortArea
  }

  sortAreaBySortValue(areas: Array<AreaTypes.SelectAreaTypes>) {
    const sortArea = areas.sort((a, b) => {
      return a.sort < b.sort ? -1 : a.sort > b.sort ? 1 : 0
    })
    return sortArea
  }
}
</script>
<style lang="sass" scoped>
.recommendPage
  .pankuzu
    height: 21px
    .-text
      margin: 10px 0
      &:hover
        opacity: 0.6
    .sectionLast
      margin: 5px calc(50% - 50vw)
      height: 1px
      background-color: #e4e4e4
  .-toptext
    padding: 15px 0
    font-size: 18px
  .sectionLast
    margin: 0px calc(50% - 50vw)
    height: 1px
    background-color: $gray
  .sectionLast2
    margin: 10px 0
    height: 8px
    background-color: #f4f4f4
    width: 100%
    @include sp_view
      width: calc(100% + 32px)
      margin-left: -16px
      margin-right: -16px
  .description
    font-size: 12px
    line-height: 1.33
    margin-bottom: 10px
  .genre
    position: relative
    cursor: pointer
    li
      &:active
        opacity: 0.6
    .lines
      padding: 16px 0
      font-size: 16px
    .-icon
      margin-top: 24px
      position: absolute
      width: 15px
      left: 95%
      transform: rotate(90deg)
      fill: #a6a6a6
    .-iconRev
      margin-top: 24px
      position: absolute
      width: 15px
      left: 95%
      transform: rotate(270deg)
      fill: #a6a6a6
  .foodLists
    cursor: pointer
    padding: 0 20px
    .childGenre
      padding-top: 0px
    .lines
      padding: 16px 0
      font-size: 16px
    .last
      border-bottom: 0px
    .-icon
      position: absolute
      width: 15px
      left: 95%
      transform: rotate(90deg)
      fill: #a6a6a6
    .-iconRev
      position: absolute
      width: 15px
      left: 95%
      transform: rotate(270deg)
      fill: #a6a6a6
  .btn
    width: 50%
    margin: 0 auto
    text-align: center
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
      .more
        color: #0896ff
        text-decoration: underline
        text-decoration-color: #0896ff
        margin-left: auto
        &:hover
          text-decoration-color: #ffffff
          cursor: pointer
  #carousel
    margin-bottom: 10px
    width: 100vw
    margin-left: calc(-50vw + 50%)
    margin-right: calc(-50vw + 50%)
  .ampstories
    .storyHead
      padding: 24px 0
  .fs-18
    font-size: 18px
@include pc_view
  .recommendPage
    .-toptext
      padding: 15px 0
      font-size: 32px
    .pankuzu
      height: 21px
      .-text
        margin: 10px 0
      .sectionLast
        width: 100%
        height: 1px
        background-color: #e4e4e4
    .genre
      position: relative
      li
        &:hover
          opacity: 0.6
      .lines
        padding: 16px 0
        font-size: 18px
      .-icon
        position: absolute
        width: 15px
        left: 95%
        transform: rotate(90deg)
        fill: #a6a6a6
      .-iconRev
        position: absolute
        width: 15px
        left: 95%
        transform: rotate(270deg)
        fill: #a6a6a6
    .description
      font-size: 16px
      line-height: 1.25
      margin-bottom: 15px
    .-pagination
      width: 30%
      margin: 0 auto
      margin-top: 24px
      margin-bottom: 32px
    .recommendlists
      width: 100%
      margin: 0 auto
    .ampstories
      width: 100%
      margin: 0px auto
    #carousel
      width: 100%
      margin: 0 auto
      margin-bottom: 10px
    .sectionLast
      width: 100%
      margin: 0px auto
      height: 1px
      background-color: $gray
    .fs-18
      font-size: 20px
</style>
