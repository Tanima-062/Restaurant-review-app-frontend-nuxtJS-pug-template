<template lang="pug">
.genrepage
  .pankuzu
    nuxt-link(to='/restaurant/')
      paragraph.-text(fontSize='tiny') レストランTOP
  paragraph-bold.-textTop(fontSize='big') こだわり検索一覧から探す
  paragraph.-textarea.description(fontSize='tiny') 近くのレストランを簡単に検索・選択し、そのままウェブ予約ができる便利なグルメサービスです。こちらは料理ジャンルから検索できるページです。目的やシーンなどこだわり条件からご希望のレストランをお探しいただけます！
  hr.sectionLast
  template(v-for='(genre, keys) in BigGenre')
    ul.genre
      li.big(@click='getMiddlegenre(keys)')
        next.-icon(:class='["svg"+keys, TFbox[keys] ? "-iconRev" : ""]')
        paragraph-bold#genres-name(fontSize='large') {{ genre.name }}
      ul.foodLists(:class="'genre' + keys", v-show='TFbox[keys]', v-for='(Sgenre, key) in genre.childGenres')
        li.small(
          @click='goSearch(Sgenre)',
          :class='[key === 0 ? "childGenre" : ""]'
        )
          paragraph.lines(fontSize='medium') {{ Sgenre.name }}
        hr.sectionChild(v-show='key+1!==genre.childGenres.length')
      hr.sectionLast(v-show='keys+1!==BigGenre.length')
  template(v-if='Recommend.length > 0')
    hr.sectionLast2
    .recommendlists
      .listtop
        Heading#moretext.fs-18(fontSize='m') おすすめのレストラン
        Paragraph#more(
          fontSize='medium',
          color='main',
          @click='goReccomendPage'
        ) すべて見る
    carousel-nav#carousel(:List='Recommend', :is-takeout='false')
  template(v-if='storys.length > 0')
    hr.sectionLast2
    .ampstories
      Heading.fs-18.storyHead(fontSize='m') おすすめの最新ストーリー
    carousel-amp-nav#carousel(:List='storys')
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import CarouselNav from '~/components/organisms/CarouselNav.vue'
import CarouselAmpNav from '~/components/organisms/CarouselAmpNav.vue'
import Next from '~/assets/icon/nextV2.svg'
import { Heading, SpanBold, Span, Paragraph, ParagraphBold } from '~/components/atoms/typography'

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
      title: 'こだわりからレストラン・飲食店を予約',
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' },
        {
          hid: 'description',
          name: 'description',
          content:
            'レストランを検索・予約するならスカイチケット！ランチ、ディナー、個室、テラス席、ペット可、食べ放題、デート、接待、お祝いなど、あなたの目的やシーンにぴったりの飲食店が見つかる。'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'レストランを検索・予約するならスカイチケット！ランチ、ディナー、個室、テラス席、ペット可、食べ放題、デート、接待、お祝いなど、あなたの目的やシーンにぴったりの飲食店が見つかる。'
        }
      ]
    }
  }

  fetch({ store }) {
    store.dispatch('modules/layout/setHeaderInfo', {
      layoutType: 10,
      headerTitle: 'グルメ/料理ジャンル一覧',
      returnPath: ''
    })
  }

  isGenre1 = false
  isGenre2 = false
  isGenre3 = false
  BigGenre = []
  TFbox: boolean[] = []

  async asyncData({ store }) {
    const TFbox: boolean[] = []
    let BigGenre = []

    // action
    await store.dispatch('modules/suggest_search/CommitmentSearch')
    await store.dispatch('modules/recommend/InitRecommendRS')
    await store.dispatch('modules/story/InitAmpsRS')

    // recommends
    const Recommend = store.getters['modules/recommend/getRecommendRS'].result
      ? store.getters['modules/recommend/getRecommendRS'].result
      : []

    // storys
    const storys = store.getters['modules/story/getAmpsRS']

    // BigGenre
    if (store.getters['modules/suggest_search/getResearchGenre']) {
      for (let i = 0; i < store.getters['modules/suggest_search/getResearchGenre'].length; i++) {
        TFbox.push(false)
      }
      BigGenre = store.getters['modules/suggest_search/getResearchGenre']
    }

    // set component
    return {
      TFbox,
      Recommend,
      storys,
      BigGenre
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

  get SmallGenre() {
    return this.$store.getters['modules/suggest_search/getResearchGenreChild']
  }

  goReccomendPage() {
    this.$router.push('/takeout/recommend')
  }

  goSearch({ id }) {
    this.$router.push({ path: '/restaurant/search_result/', query: { details: `${id}` } })
  }
}
</script>
<style lang="sass" scoped>
.genrepage
  .pankuzu
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
      #moretext
        padding-top: 5px
      #more
        color: #0896ff
        margin-left: auto
  #carousel
    margin-bottom: 10px
    width: 100vw
    margin-left: calc(-50vw + 50%)
    margin-right: calc(-50vw + 50%)
  .ampstories
    .storyHead
      padding: 24px 0
.big
  &:active
    opacity: 0.6
  @include pc_view
    &:hover
      opacity: 0.6
.small:hover
  opacity: 0.6
  cursor: pointer
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
    #carousel
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
      #genres-name
        font-size: 18px
        padding: 18px 0
    .foodLists
      .lines
        font-size: 18px
</style>
