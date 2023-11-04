<template lang="pug">
.infoReserve
  .pankuzu
    ul.breadccrumb
      li.lists
        a(href='https://skyticket.jp')
          paragraph(fontSize='tiny').links トップ
      li.lists
        a(href='https://skyticket.jp/info/flow')
          paragraph(fontSize='tiny').links ご利用方法
      li.nowcolorlists
        paragraph(fontSize='tiny').links ご利用方法 グルメ
  paragraph.titleText
    a(href='https://skyticket.jp/info/flow')
      arrow-icon.-backicons
    span-bold(fontSize='large') グルメ
    Span(fontSize='tiny') -ご利用方法
  paragraph(fontSize='midium').tops テイクアウトご利用の流れ
  .stepBox
    paragraph-bold(fontSize='small').stepTitle 1.条件にあったメニュー / 店舗を一括検索
    .contentsBox
      no-ssr
        img(src='~@/static/img/infos/01.png' v-if='$window.width > 767').stepimg
      paragraph(fontSize='small').stepContent トップページ検索の駅名・日時から、または現在地からの検索が可能です。<br><span style='color: red'>※東京エリアのみになります。</span><br>エリアと日時で検索した後は、お好みのメニュージャンルで絞込ができます。
    .circle_icon
      arrow-icon.-gourmeticon
  .stepBox
    paragraph-bold(fontSize='small').stepTitle 2.お好みのメニューを選ぶ
    .contentsBox
      no-ssr
        img(src='~@/static/img/infos/02.png' v-if='$window.width > 767').stepimg
      paragraph(fontSize='small').stepContent エリア・日時・メニュージャンルで絞込ができたら、お好みのメニューを選択。メニューに合わせてオプション（カスタム／トッピング）を追加できます。<br><span style='color: red'>※オプションが無いメニューもございます。</span><br>「注文する」で選択しているメニューの注文へ進みます。「その他メニュー」で同店舗の他メニューも一緒に注文していただけます。
    .circle_icon
      arrow-icon.-gourmeticon
  .stepBox
    paragraph-bold(fontSize='small').stepTitle 3.メニューを決定し注文する
    .contentsBox
      no-ssr
        img(src='~@/static/img/infos/03.png' v-if='$window.width > 767').stepimg
      paragraph(fontSize='small').stepContent ご自身の名前やメールアドレス、電話番号等を入力。お店への連絡・ご要望・質問等ある場合は連絡事項の欄にご記入ください。ご同意事項にチェックをしていただき、ご注文内容確認へ！
    .circle_icon
      arrow-icon.-gourmeticon
  .stepBox
    paragraph-bold(fontSize='small').stepTitle 4.ご注文内容を確認・変更
    .contentsBox
      no-ssr
        img(src='~@/static/img/infos/04.png' v-if='$window.width > 767').stepimg
      paragraph(fontSize='small').stepContent 注文内容の最終確認です。この画面では<span style='color: red'>個数の変更</span>ができます◎商品の受け取り時間と注文内容、合計金額、店舗情報をご確認のうえお支払いへお進みください。
    .circle_icon
      arrow-icon.-gourmeticon
  .stepBox
    paragraph-bold(fontSize='small').stepTitle 5.支払い情報入力
    .contentsBox
      paragraph(fontSize='small').stepContent クレジットカード情報をご入力してください。<br><span style='color: red'>「購入を完了する」</span>で注文完了になります！
    .circle_icon
      arrow-icon.-gourmeticon
  .stepBox
    paragraph-bold(fontSize='small').stepTitle 6.ご注文内容確認
    .contentsBox
      no-ssr
        img(src='~@/static/img/infos/06.png' v-if='$window.width > 767').stepimg
      paragraph(fontSize='small').stepContent ご注文が完了したら、入力いただいたメールアドレスへ弊社から注文内容確認メールをお送りします。ご注文に間違いがないか、メールに書いてある内容をご確認ください。メールからはもちろん、<a href='https://skyticket.jp/user/login.php'>スカイチケットのマイページ</a>からもご確認いただけます。
    .circle_icon
      arrow-icon.-gourmeticon
  .stepBox
    paragraph-bold(fontSize='small').stepTitle 7.商品を受取に行く
    .contentsBox
      no-ssr
        img(src='~@/static/img/infos/07.png' v-if='$window.width > 767').stepimg
      paragraph(fontSize='small').stepContent 受取時間が近づいたら、店舗まで受取に行きましょう。マイページの申込履歴からご注文内容の確認ができます。「地図アプリを開く」をおすと、グーグルマップが自動で起動し、ナビしてくれます◎店員さんに予約番号と名前を伝えて商品を受け取り、「商品を受け取る」ボタンをおして完了！
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Heading, SpanBold, Paragraph, ParagraphBold } from '~/components/atoms/typography'
import ArrowIcon from '~/assets/icon/arrow.svg'
@Component({
  components: {
    Heading,
    SpanBold,
    Paragraph,
    ParagraphBold,
    ArrowIcon
  }
})
export default class InfoReserveIndex extends Vue {
  head() {
    return {
      title: 'グルメ',
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  }

  fetch({ store }) {
    store.dispatch('modules/layout/setHeaderInfo', {
      layoutType: 0,
      headerTitle: 'グルメ'
    })
  }
}
</script>
<style lang="sass" scoped>
.infoReserve
  .tops
    margin: 20px 0
  .titleText
    padding-left: 30px
    position: relative
    .-backicons
      position: absolute
      transform: rotate(180deg)
      width: 20px
      height: 20px
      fill: black
      left: 0%
      top: 15%
  .pankuzu
    margin-bottom: 30px
    .lists
      display: inline-block
      margin: 5px 0px
      margin-right: 15px
      padding: 1px 10px
      background-color: $gray
      position: relative
      &:before
        content: ''
        position: absolute
        top: 0
        bottom: 0
        left: -5%
        width: 1em
        background: #e5e2de
        transform: skew(-15deg, 0deg)
        z-index: -1
      &:after
        content: ''
        position: absolute
        top: 0
        bottom: 0
        right: -5%
        width: 1em
        background: #e5e2de
        transform: skew(-15deg, 0deg)
        z-index: -2
      .links
        color: $dark_gray
        font-size: 10px
    .nowcolorlists
      display: inline-block
      margin: 5px 0px
      margin-right: 10px
      padding: 1px 10px
      background-color: #FFC11C
      position: relative
      &:before
        content: ''
        position: absolute
        top: 0
        bottom: 0
        left: -5%
        width: 1em
        background-color: #FFC11C
        transform: skew(-15deg, 0deg)
        z-index: -1
      &:after
        content: ''
        position: absolute
        top: 0
        bottom: 0
        right: -5%
        width: 1em
        background-color: #FFC11C
        transform: skew(-15deg, 0deg)
        z-index: -2
      .links
        color: white
        font-size: 10px
  .stepBox
    margin: 30px 0
    position: relative
    .contentsBox
      display: flex
      .stepimg
        padding: 20px
        width: 50%
    .circle_icon
      position: absolute
      border-radius: 50%
      background-color: #0896ff
      border: solid 1px #e4e4e4
      width: 30px
      height: 30px
      outline: none
      top: 100%
      margin-top: -10px
      right: 50%
      .-gourmeticon
        margin: 15% 0  0 15%
        width: 20px
        height: 20px
        transform: rotate(90deg)
        fill: $white
    .stepTitle
      background-color: #0896ff
      padding: 10px 20px
      width: 100vw
      margin: 0px calc(50% - 50vw)
      color: $white
    .contentsBox
      .stepContent
        margin-top: 20px
        margin-bottom: 20px
@include pc_view
  .infoReserve
    .stepBox
      .stepTitle
        width: 100%
        margin: 0px auto
      .contentsBox
        margin-top: 20px
        margin-bottom: 50px
      .circle_icon
        position: absolute
        border-radius: 50%
        background-color: #0896ff
        border: solid 1px #e4e4e4
        width: 30px
        height: 30px
        outline: none
        top: 100%
        margin-top: 0px
        right: 50%
        .-gourmeticon
            margin: 15% 0  0 15%
            width: 20px
            height: 20px
            transform: rotate(90deg)
            fill: $white
</style>
