<template lang="pug">
.mypage
  full-loading(v-if='isLoading', :isLoading='isLoading')
  template(v-else)
    payment-loading(
      :isLoading='confirmSessionToken.message === ""',
      text='お申し込み完了画面に移動しています。',
      text2='画面を操作せず、しばらくお待ちください。'
    )
    full-loading(:isLoading='confirmSessionToken.message === "" && !sessions')
    notification-pop.pop(
      v-if='confirmSessionToken.message && !confirmSessionToken.status',
      :isShown='isAlertPopShown',
      type='error',
      icon='warning',
      position='right',
      @closePop='closePop'
    )
      template
        | {{ brConvert2n($t(confirmSessionToken.message)) }}
    .fail(
      v-if='!confirmSessionToken.status && !confirmSessionToken.message === ""'
    )
      payment-step-bar.stepbar(:active='4.0', :isOnlySeat='isOnlySeat')
      .errRectbox
        button.maps
          warning-mark.mark
        paragraph-bold.complete.-maintext(fontSize='large') 予約に失敗しました。<br> しばらく置いてご注文ください。
      .btn
        CTA-button(
          fontSize='big',
          type='secondary',
          text='トップへ戻る',
          @click='goTop()'
        )
    .loading(
      v-else-if='!confirmSessionToken.status && confirmSessionToken.message === ""'
    )
      payment-step-bar.stepbar(:active='4.0', :isOnlySeat='isOnlySeat')
      .Rectbox
        button.maps
          warning-mark.mark
        paragraph-bold.complete.-maintext(fontSize='large') 予約処理中です<br> しばらく置いてご注文ください。
      .btn
        CTA-button(
          fontSize='big',
          type='secondary',
          text='トップへ戻る',
          @click='goTop()'
        )
    .success(v-else)
      .details(v-if='confirmSessionToken.status && isTakeout')
        payment-step-bar.stepbar(:active='4.0', :isOnlySeat='isOnlySeat')
        .Rectbox
          button.maps
            check-mark.mark
          paragraph-bold.complete.-maintext(fontSize='large') 予約を完了いたしました！
          paragraph.takeout-number.-textbox.-text(fontSize='small') レストランに「<b>テイクアウト予約</b>」が承認されました。<br>ご登録いただいたメールアドレスに詳細を記載したメールをお送りしています。
          .SmallRectbox
            paragraph.booking-number.-reserveNumLabel(fontSize='tiny') お客様の予約番号
            paragraph-bold.booking-number-instance.-reserveNum(
              fontSize='large'
            ) {{ orderdNumber }}
        .textbox
          paragraph-bold#booking-time-wait.-text(
            fontSize='medium',
            color='error'
          ) 予約番号は必ずお控えの上、予約時間まで大切にお持ちください。
          paragraph.-textmargin(fontSize='medium') テイクアウト商品受取の際、予約確認画面（バウチャー）の提示が必要となりますので、事前にご確認下さい。
          paragraph-bold#booking-confirmation.-textmargin(fontSize='large') 予約確認画面（バウチャー）の表示方法
          paragraph.-textmargin(fontSize='medium') この画面から：下記ボタンよりご確認いただけます
          paragraph.-textmargin(fontSize='medium') 会員の方：会員ログイン後に<span class='highlight'>マイページの予約一覧</span>よりご確認いただけます。
          paragraph.-textmargin(fontSize='medium') 非会員の方：メニューの<span class='highlight'>予約確認</span>から、予約番号・電話番号でご確認いただけます
        .btn
          CTA-button(
            fontSize='big',
            type='secondary',
            text='予約確認画面へ',
            @click='confirmed()'
          )
      .details(v-else-if='confirmSessionToken.status && !isTakeout')
        payment-step-bar.stepbar(:active='4.0', :isOnlySeat='isOnlySeat')
        .Rectbox
          button.maps
            check-mark.mark
          paragraph-bold.complete.-maintext(fontSize='large') 予約を受け付けました
          paragraph.takeout-number.-textbox.-text(fontSize='small') レストランに「<b>レストラン予約</b>」が承認されました。<br>ご登録いただいたメールアドレスに詳細を記載したメールをお送りしています。
          .SmallRectbox
            paragraph.booking-number.-reserveNumLabel(fontSize='tiny') お客様の予約番号
            paragraph-bold.booking-number-instance.-reserveNum(
              fontSize='large'
            ) {{ orderdNumber }}
        .textbox
          paragraph-bold#booking-time-wait.-text.warninfo(
            fontSize='medium',
            color='error'
          ) 予約番号は必ずお控えの上、予約時間まで大切にお持ちください。
          paragraph.-textmargin.warninfo(fontSize='medium') レストランご利用の際、予約確認画面（バウチャー）の提示が必要となりますので、事前にご確認ください。
          paragraph-bold#booking-confirmation.-textmargin.display-way-title(
            fontSize='large'
          ) 予約確認画面（バウチャー）の表示方法
          paragraph.-textmargin.display-way-description(fontSize='medium') この画面から：下記ボタンよりご確認いただけます
          paragraph.-textmargin.display-way-description(fontSize='medium') 会員の方：会員ログイン後に<a class='highlight' href='javascript:void(0)' @click='goReservationList'>マイページの予約一覧</a>よりご確認いただけます。
          paragraph.-textmargin.display-way-description(fontSize='medium') 非会員の方：メニューの<a class='highlight' href='javascript:void(0)' @click='goReservationConfirm'>予約確認</a>から、予約番号・電話番号でご確認いただけます
        .btn
          CTA-button.btn-inner(
            fontSize='big',
            type='secondary',
            text='予約確認画面へ',
            @click='confirmed()'
          )
      .fail(v-else)
        payment-step-bar.stepbar(:active='4.0', :isOnlySeat='isOnlySeat')
        .errRectbox
          button.maps
            warning-mark.mark
          paragraph-bold.complete.-maintext(fontSize='large') 予約に失敗しました。<br> しばらく置いてご注文ください。
        .btn
          CTA-button(
            fontSize='big',
            type='secondary',
            text='トップへ戻る',
            @click='goTop()'
          )
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { Heading, SpanBold, Span, Paragraph, ParagraphBold } from '~/components/atoms/typography'
import PaymentStepBar from '~/components/molecules/flow/PaymentStepBar.vue'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
import FullLoading from '~/components/molecules/loading/FullLoading.vue'
import CheckMark from '~/assets/icon/checkmark.svg'
import WarningMark from '~/assets/icon/warning.svg'
import PaymentLoading from '~/components/molecules/loading/PaymentLoading.vue'
import NotificationPop from '~/components/molecules/card/NotificationPop.vue'
@Component({
  components: {
    Heading,
    Span,
    SpanBold,
    Paragraph,
    ParagraphBold,
    PaymentStepBar,
    CTAButton,
    FullLoading,
    CheckMark,
    NotificationPop,
    PaymentLoading,
    WarningMark
  }
})
// 購入に失敗しましたを付ける
export default class CompleteIndex extends Vue {
  head() {
    return {
      title: '予約処理',
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  }

  fetch({ store }) {
    store.dispatch('modules/layout/setHeaderInfo', {
      layoutType: 5,
      headerTitle: '予約処理中'
    })
  }

  mounted() {
    window.onpageshow = () => {
      this.isRefresh = true
    }
    setTimeout(() => {
      if (!this.$store.getters['modules/reservationGourmet/getSessionToken']) {
        this.$router.replace('/')
      } else {
        this.isLoading = false
      }
    }, 0)
  }

  isLoading = true
  isRefresh = false
  isAlertPopShown = false

  get TopTexts() {
    return this.confirmSessionToken
  }

  @Watch('TopTexts')
  changeHead(val) {
    if (!val.status) {
      this.isAlertPopShown = true
      this.$store.dispatch('modules/layout/setHeaderInfo', {
        layoutType: 5,
        headerTitle: '予約失敗'
      })
    } else {
      this.$store.dispatch('modules/layout/setHeaderInfo', {
        layoutType: 5,
        headerTitle: '購入完了'
      })
    }
  }

  confirmed() {
    this.$router.push('/mypage/')
  }

  // Application code取得
  get appCd() {
    return this.$store.getters['modules/common/getAppCd']
  }

  get sessions() {
    if (this.$store.getters['modules/reservationGourmet/getSessionToken']) {
      if (!this.confirmSessionToken.status) {
        if (!this.isRefresh) {
          if (this.appCd === 'TO') {
            this.$store.dispatch('modules/reservationGourmet/confirmSessionTO')
          } else {
            this.$store.dispatch('modules/reservationGourmet/confirmSessionRS')
          }
        }
        // もしセッションがあって、tokenがfaliseなら叩く
        return false
      } else {
        // tokenがtrueなら叩かない
        return false
      }
    } else {
      return true
    }
  }

  get confirmSessionToken() {
    if (this.$store.getters['modules/reservationGourmet/getComplete']) {
      return this.$store.getters['modules/reservationGourmet/getComplete']
    }
  }

  goTop() {
    this.$router.replace({ name: 'index' })
  }

  get orderdNumber() {
    if (this.$store.getters['modules/reservationGourmet/getReservationNum'] === '') {
      return 'undefined'
    } else {
      return this.$store.getters['modules/reservationGourmet/getReservationNum']
    }
  }

  get isTakeout() {
    if (!this.orderdNumber || this.orderdNumber === 'undefined') {
      return true
    }
    return this.orderdNumber.slice(0, 2) === 'TO'
  }

  brConvert2n(val) {
    return val.replaceAll('<br>', '\n')
  }

  // 席のみflag取得
  get isOnlySeat() {
    if (this.$store.getters['modules/cource/getterCource']) {
      return this.$store.getters['modules/cource/getterCource'].onlySeat
    }
  }

  goReservationList() {
    location.href = '/user/'
  }

  goReservationConfirm() {
    location.href = '/gourmet/mypage/login/'
  }

  // 警告ポップ閉じる
  closePop(): void {
    this.isAlertPopShown = false
  }
}
</script>
<style lang="sass" scoped>
.maypage
  padding: 0 90px
.btn
  display: flex
  justify-content: center
  align-items: center
  text-align: center
  margin: 40px auto
  .btn-inner
    display: flex
    justify-content: center
    align-items: center
    height: 52px
    margin: 0 auto
.-text
  margin: 15px
.warninfo
  font-size: 14px
.display-way-title
  font-size: 16px
.display-way-description
  font-size: 12px
.stepbar
  margin: 16px 0
.-textmargin
  margin: 20px 15px 20px 15px
.highlight
  color: $main_color
.Rectbox
  width: 90%
  height: 355px
  border-radius: 3px
  background-color: rgba(221, 241, 255, 1)
  margin: 0 auto
  position: reletive
  text-align: center
  .maps
    border-radius: 50%
    background-color: white
    border: none
    width: 35px
    height: 35px
    margin-top: 30px
    .mark
      fill: #1ba1ff
      width: 30px
  .-maintext
    padding-top: 20px
    text-align: center
    color: #1ba1ff
  .-textbox
    padding-top: 30px
    text-align: left
    @media screen and (max-width: 400px)
      padding-top: 25px
  .SmallRectbox
    width: 254px
    border-radius: 3px
    background-color: #ffffff
    margin: 20px auto
    @media screen and (max-width: 330px)
      width: 220px
    .-reserveNumLabel
      line-height: 100%
      padding: 8px 0
    .-reserveNum
      text-align: center
      text-justify: center
      padding-bottom: 8px
      line-height: 100%
.errRectbox
  width: 90%
  height: 175px
  border-radius: 3px
  background-color: #fff4f4
  margin: 0 auto
  position: reletive
  text-align: center
  .maps
    border-radius: 50%
    background-color: white
    border: none
    width: 35px
    height: 35px
    margin-top: 30px
    .mark
      fill: #ff1c20
      width: 30px
  .-maintext
    padding-top: 20px
    text-align: center
    color: #ff1c20
  .-textbox
    padding-top: 30px
    text-align: left
@include pc_view
  .warninfo
    font-size: 16px
  .display-way-title
    font-size: 20px
  .display-way-description
    font-size: 16px
  .stepbar
    margin: 24px auto
    width: 100%
  .Rectbox
    width: 100%
    height: 321px
    border-radius: 3px
    background-color: rgba(221, 241, 255, 1)
    margin: 0
    position: reletive
    text-align: center
    .complete
      font-size: 24px
    .takeout-number
      font-size: 16px
      line-height: 1.25
      margin: 0
    .booking-number
      font-size: 14px
    .booking-number-instance
      font-size: 24px
    .-textbox
      padding-top: 30px
      text-align: center
    .maps
      border-radius: 50%
      background-color: white
      border: none
      width: 35px
      height: 35px
      margin-top: 30px
      .mark
        fill: #1ba1ff
        width: 30px
  .textbox
    text-align: left
    p
      margin: 16px 0
    #booking-confirmation
      margin-top: 52px
      margin-bottom: 28px
    #booking-time-wait
      margin-top: 37px
  .SmallRectbox
    width: 491px !important
    height: 69px !important
    .booking-number
      padding-top: 6.5px
      padding-bottom: 0px
</style>
