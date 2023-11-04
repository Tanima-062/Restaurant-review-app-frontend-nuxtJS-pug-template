<template lang="pug">
.recommendPage
  .pankuzu
    nuxt-link(to='/takeout/')
      paragraph.-text(fontSize='tiny') テイクアウトTOP
    paragraph-bold.-toptext(fontSize='huge') おすすめのテイクアウト
    full-loading(:is-loading='isLoading')
  .container
    template(v-for='(recommendItem, key) in Recommend')
      recommend-card(
        :recommendbox='recommendItem',
        :keys='key',
        :boxLength='Recommend.length'
      )
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Heading, Paragraph, ParagraphBold, Span, SpanBold } from '~/components/atoms/typography'
import FullLoading from '~/components/molecules/loading/FullLoading.vue'
import RecommendCard from '~/components/molecules/card/RecommendCard.vue'
@Component({
  components: {
    FullLoading,
    Heading,
    Paragraph,
    ParagraphBold,
    RecommendCard,
    Span,
    SpanBold
  }
})
export default class RecommendIndex extends Vue {
  head() {
    return {
      title: 'おすすめのテイクアウト・持ち帰りをスカイチケットグルメで予約！',
      titleTemplate: '',
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' },
        {
          hid: 'description',
          name: 'description',
          content:
            'テイクアウト・持ち帰りを予約するならスカイチケットグルメ！焼き鳥、寿司、中華、ピザなどの多彩なメニューのおすすめをチェック！スカイチケットグルメで事前に予約すれば、お店ですぐに持ち帰り！'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'テイクアウト・持ち帰りを予約するならスカイチケットグルメ！焼き鳥、寿司、中華、ピザなどの多彩なメニューのおすすめをチェック！スカイチケットグルメで事前に予約すれば、お店ですぐに持ち帰り！'
        }
      ]
    }
  }

  fetch({ store }) {
    store.dispatch('modules/layout/setHeaderInfo', {
      layoutType: 0,
      headerTitle: 'グルメ'
    })
  }

  isLoading = true
  mounted() {
    setTimeout(async () => {
      await this.$store.dispatch('modules/recommend/InitRecommendTO')
      this.isLoading = false
    }, 0)
  }

  // おすすめリスト取得
  get Recommend() {
    const recommends = this.$store.getters['modules/recommend/getRecommendTO'].result
      ? this.$store.getters['modules/recommend/getRecommendTO'].result
      : []
    return recommends
  }
}
</script>
<style lang="sass" scoped>
.recommendPage
  padding: 0 !important
  .pankuzu
    padding: 0 16px
    @media screen and (min-width: 1024px)
      padding: 0
    .-text
      margin: 10px 0
      &:hover
        opacity: 0.6
  .container
    display: grid
    grid-template-columns: repeat(auto-fill,320px)
    grid-row-gap: 20px !important
    grid-column-gap: 16px
    justify-content: center
    .btn
      width: 50%
      margin: 0 auto
      text-align: center
  .-toptext
    font-size: 24px
    line-height: 1.3
    margin-bottom: 24px
@media screen and (min-width: 1024px)
  .recommendPage
    .pankuzu
      .-text
        margin: 10px 0
        &:hover
          opacity: 0.6
    .container
      display: grid
      grid-template-columns: 1fr 1fr
      grid-row-gap: 40px !important
      grid-column-gap: 16px
    .-toptext
      font-size: 32px
      .btn
        width: 50%
        margin: 0 auto
        text-align: center
</style>
