<template lang="pug">
.infoQanda
  .pankuzu
    ul.breadccrumb
      li.lists
        a(href='https://skyticket.jp')
          paragraph.links(fontSize='tiny') トップ
      li.lists
        a(href='https://skyticket.jp/info/faq')
          paragraph.links(fontSize='tiny') よくあるご質問
      li.nowcolorlists
        paragraph.links(fontSize='tiny') よくあるご質問 グルメ
  paragraph.titleText
    a(href='https://skyticket.jp/info/faq')
      arrow-icon.-backicons
    span-bold(fontSize='large') グルメ
    Span(fontSize='tiny') - よくあるご質問
  paragraph.tops(fontSize='midium') カテゴリ一覧 - グルメ
  .grayzone
    .grayBox
      nuxt-link(v-scroll-to='\'#order\'', to)
        paragraph 注文
        next-icon.-nexticons
    .grayBox
      nuxt-link(v-scroll-to='\'#receive\'', to)
        paragraph 受け取り
        next-icon.-nexticons
    .grayBox
      nuxt-link(v-scroll-to='\'#change\'', to)
        paragraph 変更・キャンセル
        next-icon.-nexticons
    .grayBox
      nuxt-link(v-scroll-to='\'#trouble\'', to)
        paragraph トラブル
        next-icon.-nexticons
    .grayBox
      nuxt-link(v-scroll-to='\'#payment\'', to)
        paragraph お支払い・領収書
        next-icon.-nexticons
  #order
    paragraph.tops(fontSize='midium') 注文 - グルメ
    .questionBox(@click='orderflag1 = !orderflag1')
      paragraph.qText(fontSize='tiny') Q ・ スカイチケットグルメってどんなサイトなの？
      plus-icon.icon-plus(v-if='!orderflag1')
      .ans(v-if='orderflag1')
        paragraph.aText(fontSize='tiny') A ・ 近くの飲食店メニューからテイクアウト商品を簡単に選択し、そのまま注文できる便利なグルメサービスです。
        minus-icon.icon-minus
    .questionBox(@click='orderflag2 = !orderflag2')
      paragraph.qText(fontSize='tiny') Q ・ いつから予約ができますか？
      plus-icon.icon-plus(v-if='!orderflag2')
      .ans(v-if='orderflag2')
        paragraph.aText(fontSize='tiny') A ・ テイクアウトメニューの予約日は飲食店舗のタイミングによって異なります。詳細は各店舗へお問合せください。
        minus-icon.icon-minus
    .questionBox(@click='orderflag3 = !orderflag3')
      paragraph.qText(fontSize='tiny') Q ・ 会員登録しないと利用はできないのですか？
      plus-icon.icon-plus(v-if='!orderflag3')
      .ans(v-if='orderflag3')
        paragraph.aText(fontSize='tiny') A ・ 会員登録をしなくてもご注文いただけます。会員登録をすると名前や住所の入力を省けたり、会員限定のキャンペーンもございますので、ぜひ会員登録ください。
        minus-icon.icon-minus
    .questionBox(@click='orderflag4 = !orderflag4')
      paragraph.qText(fontSize='tiny') Q ・ 注文履歴の確認はどこでできますか？
      plus-icon.icon-plus(v-if='!orderflag4')
      .ans(v-if='orderflag4')
        paragraph.aText(fontSize='tiny') A ・ ご予約後、予約詳細が記載されたメール（注文完了通知）が送信されます。<br>▼オンラインで予約詳細を確認する場合<br>1.「予約確認ページ」にアクセスします<br>2.「グルメの予約確認」フォームに予約確認メールに記載されているテイクアウト申込番号を入力します。<br>▼予約が見つからない場合<br>予約が見つからない場合は、弊社skyticketグルメまでお問合せ下さい。
        minus-icon.icon-minus
    .questionBox(@click='orderflag5 = !orderflag5')
      paragraph.qText(fontSize='tiny') Q ・ 代理で予約はできますか？
      plus-icon.icon-plus(v-if='!orderflag5')
      .ans(v-if='orderflag5')
        paragraph.aText(fontSize='tiny') A ・ 可能です。実際に来店される方の情報をお客様情報として入力してください。
        minus-icon.icon-minus
    .questionBox(@click='orderflag6 = !orderflag6')
      paragraph.qText(fontSize='tiny') Q ・ 店舗が注文をキャンセルした場合はどこで確認できますか？
      plus-icon.icon-plus(v-if='!orderflag6')
      .ans(v-if='orderflag6')
        paragraph.aText(fontSize='tiny') A ・ 店舗からキャンセル処理が行われるとメールでキャンセル通知が届きます。また、「予約確認ページ」からもご確認いただけます。
        minus-icon.icon-minus
  #receive
    paragraph.tops(fontSize='midium') 受取 - グルメ
    .questionBox(@click='receiveflag1 = !receiveflag1')
      paragraph.qText(fontSize='tiny') Q ・ 商品受け取りに必要なものは何ですか？
      plus-icon.icon-plus(v-if='!receiveflag1')
      .ans(v-if='receiveflag1')
        paragraph.aText(fontSize='tiny') A ・ テイクアウト申込番号とお名前を店舗スタッフにお伝えください。<br>ご予約後に送られる、メールに申込番号が記載されています。<br>▼オンラインで予約詳細を確認する場合<br>1.「予約確認ページ」にアクセスします<br>2.「グルメの予約確認」フォームに予約確認メールに記載されている予約番号を入力します。
        minus-icon.icon-minus
    .questionBox(@click='receiveflag2 = !receiveflag2')
      paragraph.qText(fontSize='tiny') Q ・ 受取時間に遅れる場合はどうしたらよいですか？
      plus-icon.icon-plus(v-if='!receiveflag2')
      .ans(v-if='receiveflag2')
        paragraph.aText(fontSize='tiny') A ・お客様の事情で、受け取り時間に遅れる場合は、注文先の店舗に直接お電話でご連絡ください。<br>注文完了メールに記載されている店舗の電話番号をご参照ください。
        minus-icon.icon-minus
    .questionBox(@click='receiveflag3 = !receiveflag3')
      paragraph.qText(fontSize='tiny') Q ・ 注文した商品と受け取った商品が違う場合はどうすればよいですか？
      plus-icon.icon-plus(v-if='!receiveflag3')
      .ans(v-if='receiveflag3')
        paragraph.aText(fontSize='tiny') A ・ お手数ですが、ご注文の店舗へ直接お問合せ下さい。
        minus-icon.icon-minus
  #change
    paragraph.tops(fontSize='midium') 変更・キャンセル - グルメ
    .questionBox(@click='changeflag1 = !changeflag1')
      paragraph.qText(fontSize='tiny') Q ・ テイクアウトの予約を変更するにはどうすればよいですか？
      plus-icon.icon-plus(v-if='!changeflag1')
      .ans(v-if='changeflag1')
        paragraph.aText(fontSize='tiny') A ・ 一度成立した予約内容の変更はできません。変更される場合は一度キャンセル（店舗へお問合せ）していただき、改めて予約手続きをお願いいたします。
        minus-icon.icon-minus
    .questionBox(@click='changeflag2 = !changeflag2')
      paragraph.qText(fontSize='tiny') Q ・ 受取時間の変更はできますか？
      plus-icon.icon-plus(v-if='!changeflag2')
      .ans(v-if='changeflag2')
        paragraph.aText(fontSize='tiny') A ・ 原則注文後の注文の受け取り時間の変更はできませんが、ご注文された店舗によっては対応していただける場合がありますので、ご注文されたお店に直接ご相談ください。
        minus-icon.icon-minus
    .questionBox(@click='changeflag3 = !changeflag3')
      paragraph.qText(fontSize='tiny') Q ・ キャンセル料はいつからかかりますか？
      plus-icon.icon-plus(v-if='!changeflag3')
      .ans(v-if='changeflag3')
        paragraph.aText(fontSize='tiny') A ・ 前日までのキャンセルはキャンセル料は発生しません。当日のキャンセルはキャンセル料を100％いただいております。
        minus-icon.icon-minus
    .questionBox(@click='changeflag4 = !changeflag4')
      paragraph.qText(fontSize='tiny') Q ・ テイクアウトの予約をキャンセルするにはどうすればよいですか？
      plus-icon.icon-plus(v-if='!changeflag4')
      .ans(v-if='changeflag4')
        paragraph.aText(fontSize='tiny') A ・ お手数ですが、直接店舗へお問合せの上、キャンセルしてください。店舗情報はご予約後に送られるメール（予約確認通知）にてご確認いただけます。
        minus-icon.icon-minus
    .questionBox(@click='changeflag5 = !changeflag5')
      paragraph.qText(fontSize='tiny') Q ・ キャンセルした予約の復活はできますか？
      plus-icon.icon-plus(v-if='!changeflag5')
      .ans(v-if='changeflag5')
        paragraph.aText(fontSize='tiny') A ・ 一度キャンセルが成立した予約は復元する事ができません。恐れ入りますが、ご希望の条件に合致するメニューを改めてご注文いただければ幸いです。
        minus-icon.icon-minus
  #trouble
    paragraph.tops(fontSize='midium') トラブル - グルメ
    .questionBox(@click='troubleflag1 = !troubleflag1')
      paragraph.qText(fontSize='tiny') Q ・ 注文したのにメールが届きません。
      plus-icon.icon-plus(v-if='!troubleflag1')
      .ans(v-if='troubleflag1')
        paragraph.aText(fontSize='tiny') A ・ メールアドレスに誤りがあるか、携帯電話のアドレスを登録された場合ですと迷惑メールフィルター等のドメイン除外設定がされてしまっており届かない恐れがあります。
        minus-icon.icon-minus
    .questionBox(@click='troubleflag2 = !troubleflag2')
      paragraph.qText(fontSize='tiny') Q ・ 動作環境を教えて下さい。
      plus-icon.icon-plus(v-if='!troubleflag2')
      .ans(v-if='troubleflag2')
        paragraph.aText(fontSize='tiny') A ・ skyticketの推奨環境をご参照下さい。
        a.aText(href='https://support.skyticket.jp/hc/ja/articles/4404138920345') https://support.skyticket.jp/hc/ja/articles/4404138920345
        paragraph.aText(fontSize='tiny') こちらにない環境ではご利用いただけない場合があります。
        minus-icon.icon-minus
  #payment
    paragraph.tops(fontSize='midium') お支払い・領収書 - グルメ
    .questionBox(@click='paymentflag1 = !paymentflag1')
      paragraph.qText(fontSize='tiny') Q ・ プリペイドカード・デビットカードは利用できますか？
      plus-icon.icon-plus(v-if='!paymentflag1')
      .ans(v-if='paymentflag1')
        paragraph.aText(fontSize='tiny') A ・ ご利用いただけます。ただし以下の注意事項をご確認の上ご利用ください。<br>・カードの性質上、お申し込みをされた時点で口座引落しとなります。<br>・キャンセルなどによるご返金に関しては、キャンセルの理由にかかわらず、非常にお時間がかかる場合はございます。<br>・ご返金までの期間はご利用のクレジットカード会社の規定により異なります。詳しくはクレジットカード会社にお問合せ下さい。
        minus-icon.icon-minus
    .questionBox(@click='paymentflag2 = !paymentflag2')
      paragraph.qText(fontSize='tiny') Q ・ 領収証は発行してもらえますか？
      plus-icon.icon-plus(v-if='!paymentflag2')
      .ans(v-if='paymentflag2')
        paragraph.aText(fontSize='tiny') A ・ メール（gourmet@adventure-inc.co.jp）にて以下項目をご入力の上、お問い合わせください。<br>----------------------------<br>件名：領収書発行<br>記載項目：ご予約時の電話番号（必須）、お客様氏名（必須）、ご利用日（必須）、領収書の宛名（必須）<br>----------------------------
        minus-icon.icon-minus
    .questionBox(@click='paymentflag3 = !paymentflag3')
      paragraph.qText(fontSize='tiny') Q ・ 支払いはどのようにすればいいですか？
      plus-icon.icon-plus(v-if='!paymentflag3')
      .ans(v-if='paymentflag3')
        paragraph.aText(fontSize='tiny') A ・ 「注文時決済（オンラインカード決済）」がご利用いただけます。<br>▼注文時決済（オンラインカード決済）とは<br>・クレジットカード決済<br>注文手続きの際にカードで決済をしていただきます。そのため、商品受け取り時に店舗で代金をお支払いいただく必要はございません。カード会社が発行する利用明細書のご利用日は「予約が成立した日」、請求元は「株式会社アドベンチャー」と記載されます。※入力されたカード情報は、株式会社イーコンテクストが管理いたします。
        minus-icon.icon-minus
    .questionBox(@click='paymentflag4 = !paymentflag4')
      paragraph.qText(fontSize='tiny') Q ・ 手数料はかかりますか？
      plus-icon.icon-plus(v-if='!paymentflag4')
      .ans(v-if='paymentflag4')
        paragraph.aText(fontSize='tiny') A ・ 手数料はかかりません。
        minus-icon.icon-minus
    .questionBox(@click='paymentflag5 = !paymentflag5')
      paragraph.qText(fontSize='tiny') Q ・ 利用できるクレジットカードのブランドは何ですか？
      plus-icon.icon-plus(v-if='!paymentflag5')
      .ans(v-if='paymentflag5')
        paragraph.aText(fontSize='tiny') A ・ VISA、Master、JCB、AMEX、Dinersがご利用いただけます。
        minus-icon.icon-minus
    .contacts
      .grayzone
        .grayBox
          a(href='https://support.skyticket.jp/hc/ja/articles/4405479381657')
            paragraph お問い合わせ
            next-icon.-nexticons
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Heading, SpanBold, Paragraph, ParagraphBold } from '~/components/atoms/typography'
import ArrowIcon from '~/assets/icon/arrow.svg'
import NextIcon from '~/assets/icon/next.svg'
import PlusIcon from '~/assets/icon/plus.svg'
import MinusIcon from '~/assets/icon/minus.svg'
@Component({
  components: {
    Heading,
    SpanBold,
    Paragraph,
    ParagraphBold,
    ArrowIcon,
    NextIcon,
    PlusIcon,
    MinusIcon
  }
})
export default class InfoQandaIndex extends Vue {
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

  orderflag1 = false
  orderflag2 = false
  orderflag3 = false
  orderflag4 = false
  orderflag5 = false
  orderflag6 = false
  receiveflag1 = false
  receiveflag2 = false
  receiveflag3 = false
  changeflag1 = false
  changeflag2 = false
  changeflag3 = false
  changeflag4 = false
  changeflag5 = false
  troubleflag1 = false
  troubleflag2 = false
  paymentflag1 = false
  paymentflag2 = false
  paymentflag3 = false
  paymentflag4 = false
  paymentflag5 = false
}
</script>
<style lang="sass" scoped>
.infoQanda
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
  .grayzone
    width: 100%
    .grayBox
      width: 100%
      padding: 20px 30px 20px 12px
      color: #555
      position: relative
      text-align: left
      background-color: #f7f7f7
      border: 1px solid #eaeaea
      min-height: 50px
      -webkit-box-sizing: border-box
      box-sizing: border-box
      .-nexticons
        position: absolute
        width: 20px
        height: 12px
        right: 0
        margin-right: 20px
        top: 40%
  .questionBox
    position: relative
    border: solid 3px #eaeaea
    padding: 12px
    display: table
    width: 100%
    letter-spacing: 1px
    -webkit-box-sizing: border-box
    box-sizing: border-box
    color: #0896ff
    background-color: #fff
    .icon-plus
      position: absolute
      right: 0
      top: 25%
      margin-right: 10px
    .icon-minus
      position: absolute
      right: 0
      top: 0%
      margin-right: 10px
      margin-top: 10px
    .qText
      color: #0896ff
      padding-right: 30px
      font-size: 14px
    .aText
      padding-left: 20px
      font-size: 14px
  .contacts
    margin: 30px 0
@include pc_view
  .infoQanda
    .grayzone
      display: flex
      width: 100%
      flex-wrap: wrap
      -webkit-flex-wrap: wrap
      -ms-flex-wrap: wrap
      .grayBox
        position: relative
        width: 230px
        padding: 20px 30px 20px 12px
        color: #555
        position: relative
        text-align: left
        background-color: #f7f7f7
        border: 1px solid #eaeaea
        min-height: 50px
        -webkit-box-sizing: border-box
        box-sizing: border-box
        .-nexticons
          position: absolute
          width: 20px
          height: 12px
          right: 0
          margin-right: 20px
          top: 40%
    .questionBox
      position: relative
      border: solid 3px #eaeaea
      padding: 12px
      display: table
      width: 100%
      letter-spacing: 1px
      -webkit-box-sizing: border-box
      box-sizing: border-box
      color: #0896ff
      background-color: #fff
      .icon-plus
        position: absolute
        right: 0
        top: 30%
        margin-right: 30px
      .icon-minus
        position: absolute
        right: 0
        top: 30%
        margin-right: 30px
      .qText
        color: #0896ff
      .aText
        padding-left: 20px
        padding-right: 50px
</style>
