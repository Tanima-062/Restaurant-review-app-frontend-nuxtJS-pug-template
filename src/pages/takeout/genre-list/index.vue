<template lang="pug">
.genrepage
  .pankuzu
    nuxt-link(:to='linkUrl')
      paragraph.-text(fontSize='tiny') {{ backPage }}
  paragraph-bold.-textTop(fontSize='big') 料理ジャンル一覧から探す
  paragraph.-textarea.description(fontSize='tiny') {{ text }}
  hr.sectionLast
  template(v-for='(genre, keys) in BigGenre')
    ul.genre
      li(@click='getMiddlegenre(keys)')
        next.-icon(:class='["svg" + keys, TFbox[keys] ? "-iconRev" : ""]')
        paragraph-bold#genres-name(fontSize='large') {{ genre.name }}
      ul.foodLists(:class="'genre' + keys", v-show='TFbox[keys]', v-for='(Sgenre, key) in genre.childGenres')
        li(
          @click='goSearch(genre.genreCd, Sgenre.genreCd, genre.name, Sgenre.name)',
          :class='[key === 0 ? "childGenre" : ""]'
        )
          paragraph.lines(fontSize='medium') {{ Sgenre.name }}
        hr.sectionChild(v-show='key+1!==genre.childGenres.length')
      hr.sectionLast(v-show='keys+1!==BigGenre.length')
  div(v-if='Recommend && Recommend.length > 0')
    hr.sectionLast2
    .recommendlists
      .listtop
        Heading.moretext.fs-18(fontSize='m') {{ `おすすめの${isTakeout ? "テイクアウト" : "レストラン"}` }}
        Paragraph.more(
          fontSize='medium',
          color='main',
          @click='goReccomendPage'
        ) すべて見る
    carousel-nav.carousel(:List='Recommend', :is-takeout='isTakeout')
  div(v-if='storys.length > 0')
    hr.sectionLast2
    .ampstories
      Heading.fs-18.storyHead(fontSize='m') おすすめの最新ストーリー
      carousel-amp-nav.carousel(:List='storys')
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import CarouselNav from '~/components/organisms/CarouselNav.vue'
import CarouselAmpNav from '~/components/organisms/CarouselAmpNav.vue'
import Next from '~/assets/icon/nextV2.svg'
import { Heading, SpanBold, Span, Paragraph, ParagraphBold } from '~/components/atoms/typography'
import { urlQueryFormat } from '~/plugins/util'

@Component({
  components: {
    Heading,
    Span,
    SpanBold,
    Paragraph,
    ParagraphBold,
    Next,
    CarouselNav,
    CarouselAmpNav
  }
})
export default class ConfirmIndex extends Vue {
  head() {
    return {
      title:
        this.$route.query.pl === 'res'
          ? '料理ジャンルからレストラン・飲食店を予約'
          : 'テイクアウト・持ち帰りできるお店を料理ジャンルから探す',
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' },
        {
          hid: 'description',
          name: 'description',
          content:
            this.$route.query.pl === 'res'
              ? 'レストランを検索・予約するならスカイチケット！焼肉・イタリアン・中華・ハンバーガー・寿司・食べ放題・ご当地グルメなど、様々なジャンルの飲食店を掲載。近くで食事ができるお店も探せる。'
              : 'テイクアウト・持ち帰りを予約するならスカイチケットグルメ！焼き鳥、寿司、中華、ピザ、焼肉、海鮮など様々な料理ジャンルの多彩なメニューから選べる！事前に予約し、お店ですぐに持ち帰り！人気の東京 池袋、新宿、渋谷エリアや大阪 阪南エリアのお店も多数'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            this.$route.query.pl === 'res'
              ? 'レストランを検索・予約するならスカイチケット！焼肉・イタリアン・中華・ハンバーガー・寿司・食べ放題・ご当地グルメなど、様々なジャンルの飲食店を掲載。近くで食事ができるお店も探せる。'
              : 'テイクアウト・持ち帰りを予約するならスカイチケットグルメ！焼き鳥、寿司、中華、ピザ、焼肉、海鮮など様々な料理ジャンルの多彩なメニューから選べる！事前に予約し、お店ですぐに持ち帰り！人気の東京 池袋、新宿、渋谷エリアや大阪 阪南エリアのお店も多数'
        }
      ]
    }
  }

  // fetch({ store }) {
  //   store.dispatch('modules/layout/setHeaderInfo', {
  //     layoutType: 1,
  //     headerTitle: 'グルメ/料理ジャンル一覧',
  //     returnPath: ''
  //   })
  // }
  isGenre1 = false
  isGenre2 = false
  isGenre3 = false
  TFbox: boolean[] = []
  backPage = ''
  linkUrl = ''
  text = ''
  isTakeout = true

  async asyncData({ route, store }) {
    const TFbox: boolean[] = []
    let backPage = ''
    let linkUrl = ''
    let text = ''
    let isTakeout = true

    // BigGenres
    function BigGenres() {
      if (store.getters['modules/suggest_search/getResearchGenre']) {
        for (let i = 0; i < store.getters['modules/suggest_search/getResearchGenre'].length; i++) {
          TFbox.push(false)
        }
        return store.getters['modules/suggest_search/getResearchGenre']
      }
    }

    // action
    await store.dispatch('modules/search_store/resetSearchBoxTO')
    await store.dispatch('modules/suggest_search/ReSearch')

    if (route.query.pl === 'res') {
      isTakeout = false
      backPage = 'レストランTOP'
      linkUrl = '/restaurant/'
      text =
        '近くのレストランを簡単に検索・選択し、そのままウェブ予約ができる便利なグルメサービスです。こちらは料理ジャンルから検索できるページです。人気の料理ジャンルやメニューからお探しいただけます！'
      await store.dispatch('modules/recommend/InitRecommendRS')
      await store.dispatch('modules/story/InitAmpsRS')
      await store.dispatch('modules/layout/setHeaderInfo', {
        layoutType: 10,
        headerTitle: 'グルメ/料理ジャンル一覧',
        returnPath: ''
      })
    } else {
      backPage = 'テイクアウトTOP'
      linkUrl = '/takeout/'
      text =
        '近くの飲食店メニューからテイクアウト商品を簡単に検索・選択し、そのまま注文できる便利なグルメサービスです。美味しいお店や人気のテイクアウトを掲載中。メニューを料理ジャンルから探せます。'
      await store.dispatch('modules/recommend/InitRecommendTO')
      await store.dispatch('modules/story/InitAmpsTO')
      await store.dispatch('modules/layout/setHeaderInfo', {
        layoutType: 1,
        headerTitle: 'グルメ/料理ジャンル一覧',
        returnPath: ''
      })
    }

    // BigGenre
    const BigGenre = BigGenres()

    // Recommend
    const recommend = isTakeout
      ? store.getters['modules/recommend/getRecommendTO']
      : store.getters['modules/recommend/getRecommendRS']
    const Recommend = recommend.result ? recommend.result : []

    // stories
    const storys = isTakeout ? store.getters['modules/story/getAmpsTO'] : store.getters['modules/story/getAmpsRS']

    // set component
    return {
      TFbox,
      backPage,
      linkUrl,
      text,
      isTakeout,
      BigGenre,
      Recommend,
      storys
    }
  }

  getMiddlegenre(key) {
    const foodLists = document.querySelectorAll('[class^="foodLists"]')
    const svgs = document.querySelectorAll('[class^="genre"] svg')

    // genre list svg control
    svgs.forEach((element: Element) => {
      const elementToManipulate = element as HTMLElement
      element.classList.contains('svg' + key)
        ? (elementToManipulate.classList.contains('-iconRev')
          ? elementToManipulate.classList.remove('-iconRev')
          : elementToManipulate.classList.add('-iconRev')
        )
        : elementToManipulate.classList.remove('-iconRev')
    })

    // genre list sub-menu control
    foodLists.forEach((element: Element) => {
      const elementToManipulate = element as HTMLElement
      element.classList.contains('genre' + key)
        ? (elementToManipulate.style.display === 'block'
          ? elementToManipulate.style.display = 'none'
          : elementToManipulate.style.display = 'block'
        )
        : elementToManipulate.style.display = 'none'
    })
  }

  get BigGenreList() {
    if (this.$store.getters['modules/suggest_search/getResearchGenre']) {
      for (let i = 0; i < this.$store.getters['modules/suggest_search/getResearchGenre'].length; i++) {
        this.TFbox.push(false)
      }
      return this.$store.getters['modules/suggest_search/getResearchGenre']
    }
  }

  get SmallGenre() {
    return this.$store.getters['modules/suggest_search/getResearchGenreChild']
  }

  goReccomendPage() {
    this.$router.push('/takeout/recommend')
  }

  goSearch(Bgenre, Sgenre, Bname, Sname) {
    if (this.isTakeout) {
      const updateData = {
        cookingGenreCd: Bgenre,
        cookingGenreCdName: Bname,
        menuGenreCd: Sgenre,
        menuGenreCdName: Sname
      }
      this.$store.dispatch('modules/search_store/resetSearchBoxTO')
      this.$store.dispatch('modules/search_store/setSearchBoxTO', updateData)
      this.$router.push('/takeout/search_result/' + urlQueryFormat(updateData))
    } else {
      const query = { cookingGenreCd: Bgenre, menuGenreCd: Sgenre }
      this.$router.push({ path: '/restaurant/search_result/', query })
    }
  }
}
</script>
<style lang="sass" scoped>
.genrepage
  .pankuzu
    height: 21px
    .-text
      margin: 10px 0
      &:hover
        opacity: 0.6
    .sectionLast
      margin: 0px calc(50% - 50vw)
      height: 1px
      background-color: #e4e4e4
  .-textTop
    font-size: 18px
    padding: 15px 0
  .fs-18
    font-size: 18px
  .-text
    margin: 10px 0
  .-textarea
    margin-bottom: 5px
  .sectionLast
    margin: 0px calc(50% - 50vw)
    height: 1px
    background-color: $gray
  .sectionChild
    margin: 0px calc(50% - 50vw)
    height: 1px
    background-color: $gray
  .sectionLast2
    margin: 10px 0
    height: 8px
    background-color: #f4f4f4
    @include sp_view
      margin: 0px calc(50% - 50vw)
  .genre
    position: relative
    li
      &:active
        opacity: 0.6
    .-icon
      position: absolute
      margin-top: 24px
      width: 15px
      left: 95%
      transform: rotate(90deg)
      fill: #a6a6a6
    .-iconRev
      position: absolute
      margin-top: 24px
      width: 15px
      left: 95%
      transform: rotate(270deg)
      fill: #a6a6a6
    #genres-name
      font-size: 16px
      padding: 16px 0
      cursor: hand
      cursor: pointer
  .description
    font-size: 12px
    line-height: 1.33
    margin-bottom: 10px
  .foodLists
    padding: 0 20px
    cursor: pointer
    .lines
      padding: 16px 0
    .last
      border-bottom: 0px
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
        color: #0896ff
        text-decoration: underline
        text-decoration-color: #0896ff
        margin-left: auto
        &:hover
          text-decoration-color: #ffffff
  .carousel
    margin-bottom: 10px
    width: 100vw
    margin-left: calc(-50vw + 50%)
    margin-right: calc(-50vw + 50%)
  .ampstories
    .storyHead
      padding: 24px 0
@include pc_view
  .genrepage
    .pankuzu
      .-text
        margin: 10px 0
      .sectionLast
        width: 100%
        margin: 5px auto
        height: 1px
        background-color: #e4e4e4
    .-textTop
      font-size: 32px
      padding: 15px 0
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
    .carousel
      width: 100%
      margin: 0 auto
      margin-bottom: 10px
    .sectionLast
      width: 100%
      margin: 0px auto
      height: 1px
      background-color: $gray
    .sectionChild
      width: 100%
      margin: 0px auto
      height: 1px
      background-color: $gray
    .fs-18
      font-size: 20px
    .description
      font-size: 16px
      line-height: 1.25
      margin-bottom: 15px
    .genre
      li
        &:hover
          opacity: 0.6
      #genres-name
        font-size: 18px
        padding: 18px 0
    .foodLists
      .lines
        font-size: 18px
</style>
