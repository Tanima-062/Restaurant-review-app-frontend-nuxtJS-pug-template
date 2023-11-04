<template lang="pug">
.recommendPage
  .pankuzu
    nuxt-link(to='/restaurant/')
      paragraph.-text(fontSize='tiny') レストランTOP
    paragraph-bold.-toptext(fontSize='huge') おすすめレストラン
    full-loading(:is-loading='isLoading')
  .container
    template(v-for='(recommendItem, key) in Recommend')
      recommend-restaurant-card(
        :recommendbox='recommendItem',
        :keys='key',
        :boxLength='Recommend.length'
      )
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import RecommendRestaurantCard from '~/components/molecules/card/RecommendRestaurantCard.vue'
import { Heading, Paragraph, ParagraphBold, Span, SpanBold } from '~/components/atoms/typography'
import FullLoading from '~/components/molecules/loading/FullLoading.vue'

@Component({
  components: {
    FullLoading,
    Heading,
    Paragraph,
    ParagraphBold,
    RecommendRestaurantCard,
    Span,
    SpanBold
  }
})
export default class RestaurantRecommendIndex extends Vue {
  head() {
    return {
      title: '近くのおすすめレストラン・飲食店を予約',
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' },
        {
          hid: 'description',
          name: 'description',
          content:
            'レストランを検索・予約するならスカイチケット！おすすめのお店やご当地グルメをご紹介。食べ放題、焼肉・イタリアン・中華・ハンバーガー・寿司など、様々なジャンルの飲食店を掲載。'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'レストランを検索・予約するならスカイチケット！おすすめのお店やご当地グルメをご紹介。食べ放題、焼肉・イタリアン・中華・ハンバーガー・寿司など、様々なジャンルの飲食店を掲載。'
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

  isLoading = true
  mounted() {
    setTimeout(async () => {
      const { suggestCd, suggestText } = this.$route.query
      let pickupRecommend = {}
      if (suggestCd && suggestText) {
        pickupRecommend = suggestCd === 'AREA' ? { areaCd: suggestText } : { stationCd: suggestText }
      }
      await this.$store.dispatch('modules/recommend/InitRecommendRS', pickupRecommend)
      this.isLoading = false
    }, 0)
  }

  // おすすめリスト取得
  get Recommend() {
    return this.$store.getters['modules/recommend/getRecommendRS'].result
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
