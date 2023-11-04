<template lang="pug">
.top
  .topImages
    no-ssr
      heading.thema(:number='1', fontSize='l', v-if='$window.width > 767') グルメの検索・予約が簡単にできるスカイチケット
      heading.thema(:number='1', fontSize='l', v-else) グルメの検索・予約が簡単<br>にできるスカイチケット
    logo.topImage
  section.introduction
    heading.thema(:number='2', fontSize='l') スカイチケットグルメ
      Span とは？
    .introductionText
      p
        span.empashis レストラン予約
        span(v-if='!$feature("phase1")') (準備中)、
      p
        span.empashis テイクアウト予約
        span(v-if='!$feature("phase1")') (東京限定)
      p.text が可能なメニューです。
  section.service
    article
      img.articleImage(src='~@/static/img/lp/ph1.png')
      div
        heading.articleHeader(:number='2', fontSize='m') レストラン予約
        .description(v-if='!$feature("phase1")') 準備中です
        .description(v-if='$feature("phase1")') お近くの飲食店を様々な条件から検索し、お得なプランや席のみプランの予約が簡単にできるグルメサイトです。
        .button.disabled(v-if='!$feature("phase1")', type='button', disabled)
          span-bold(fontSize='large', color='dark_gray') Coming Soon!
        .button(v-if='$feature("phase1")', type='button')
          nuxt-link.button(to='/restaurant')
            span-bold(fontSize='large', color='white') レストランを探す
    article
      img.articleImage(src='~@/static/img/lp/ph2.png')
      div
        heading.articleHeader(:number='2', fontSize='m') テイクアウト予約
        .description(v-if='!$feature("phase1")') 近くの飲食店メニューからテイクアウト商品を簡単に選択し、そのまま注文できる便利なグルメサービスです（東京都限定）
        .description(v-if='$feature("phase1")') 近くの飲食店メニューからテイクアウト商品を簡単に選択し、そのまま注文できる便利なグルメサービスです
        nuxt-link.button(to='/takeout')
          span-bold(fontSize='large', color='white') テイクアウトを探す
  section.contents
    a(href='/campaign/gourmet_sale.php')
      .banner
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Heading, Span, SpanBold, Paragraph, ParagraphBold } from '~/components/atoms/typography'
import Logo from '~/static/img/lp/logo.svg'

@Component({
  components: {
    Heading,
    Span,
    SpanBold,
    Paragraph,
    ParagraphBold,
    Logo
  }
})
export default class Lp extends Vue {
  head() {
    return {
      title: 'レストラン検索・テイクアウト事前予約ならスカイチケットグルメ',
      titleTemplate: '',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'レストラン・テイクアウトの検索・予約ならスカイチケットグルメ！近くのお店、人気の東京・大阪エリアの、焼肉・寿司・中華・イタリアンなど様々なジャンルの飲食店が選べる。テイクアウトなら事前予約でお店ですぐに持ち帰りが可能！'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'レストラン・テイクアウトの検索・予約ならスカイチケットグルメ！近くのお店、人気の東京・大阪エリアの、焼肉・寿司・中華・イタリアンなど様々なジャンルの飲食店が選べる。テイクアウトなら事前予約でお店ですぐに持ち帰りが可能！'
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
}
</script>
<style lang="sass" scoped>
.page
  max-width: initial
.top
  width: 100%
  min-width: 340px
  overflow: hidden
  .topImages
    min-width: 340px
    height: 250px
    background: url('~@/static/img/lp/bg_gourmet.jpg')no-repeat
    background-size: cover
    margin-left: calc(-50vw + 50%)
    margin-right: calc(-50vw + 50%)
    padding: 20px 0
    .thema
      color: #fff
      text-align: center
    .topImage
      height: 70%
      width: 100%
      margin-top: 16px
      fill: #fff
  .introduction
    margin: 24px auto
    text-align: center
    .introductionText
      padding-top: 8px
      font-size: 14px
      .empashis
        font-size: 20px
        font-weight: bold
        background: linear-gradient(transparent 70%, #ffc11c 0%)
        border-bottom: 3px solid #ffc11c
  .service
    background-color: #f4f4f4
    padding: 32px 16px
    margin-left: calc(-50vw + 50%)
    margin-right: calc(-50vw + 50%)
    article
      &:not(:first-child)
        margin-top: 32px
    .articleImage
      width: 100%
      margin-bottom: 8px
    .description
      margin: 8px 0 16px
    .button
      display: block
      height: 52px
      width: 220px
      margin: 0 auto 16px
      font-size: 20px
      text-align: center
      font-weight: bold
      line-height: 50px
      border-radius: 3px
      background-color: $sub_color
    .disabled
      background-color: $gray
      border-color: $gray
  .contents
    padding: 32px 0px
    .banner
      width: 330px
      height: 108px
      background: url('~@/static/img/lp/banner_sp.png')no-repeat
      background-size: cover
      margin: 0 auto
@include pc_view
  .top
    .topImages
      .topImage
        margin-top: 20px
    .introduction
      .introductionText
        display: flex
        justify-content: center
        p
          font-size: 16px
          line-height: 44px
        span
          margin: 0 4px
        .empashis
          font-size: 24px
          padding: 0 8px
        .text
          line-height: 48px
    .service
      article
        display: flex
        width: 825px
        margin: 0 auto
        .articleImage
          width: 280px
          height: 135px
          margin: 8px 24px 0 0
        .button
          margin: 0 auto 16px 0
    .contents
      .banner
        width: 992px
        height: 80px
        background: url('~@/static/img/lp/banner_pc.png')no-repeat
</style>
