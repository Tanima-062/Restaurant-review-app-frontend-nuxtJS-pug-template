<template lang="pug">
.complete
  payment-step-bar.stepbar(v-if='!changeInfo.isOnlySeat', :active='4.0')
  .rectangle
    .circle
      check-mark.mark
    paragraph-bold.-maintext(fontSize='large') 変更を受け付けました
    paragraph.-text(fontSize='small', letterSpacing='none') レストランに「<b>変更内容</b>」をご連絡させていただきました。<span class='br'>ご登録いただいたメールアドレスに詳細を記載したメールをお送りしています。</span>
    .inner-rectangle
      paragraph.-reservation-label(fontSize='tiny') 予約番号
      paragraph-bold.-reservation-description(fontSize='large') {{ reservationNumber }}
  .complete-description(v-if='$window.width < 768')
    .-warn
      paragraph-bold.-maintext(
        fontSize='small',
        color='error',
        letterSpacing='none'
      ) 予約番号は必ずお控えの上、予約時間まで大切にお持ちください。
      paragraph.-text(fontSize='small', letterSpacing='none') レストランご利用の際、予約確認画面（バウチャー）の提示が必要となりますので、事前にご確認ください。
    .-tip
      paragraph-bold.-maintext(fontSize='medium', letterSpacing='none') 予約確認画面（バウチャー）の表示方法
      paragraph.-text(fontSize='tiny', letterSpacing='none') この画面から：下記ボタンよりご確認いただけます
      paragraph.-text(fontSize='tiny', letterSpacing='none') 会員の方：会員ログイン後に<a class='-point' href='javascript:void(0)' @click='goReservationList'>マイページの予約一覧</a>よりご確認いただけます。
      paragraph.-text(fontSize='tiny', letterSpacing='none') 非会員の方：メニューの<a class='-point' href='javascript:void(0)' @click='goReservationConfirm'>予約確認</a>から、予約番号・電話番号でご確認いただけます
  .complete-description(v-else)
    .-warn
      paragraph-bold.-maintext(
        fontSize='medium',
        color='error',
        letterSpacing='none'
      ) 予約番号は必ずお控えの上、予約時間まで大切にお持ちください。
      paragraph.-text(fontSize='medium', letterSpacing='none') レストランご利用の際、予約確認画面（バウチャー）の提示が必要となりますので、事前にご確認ください。
    .-tip
      paragraph-bold.-maintext(fontSize='large', letterSpacing='none') 予約確認画面（バウチャー）の表示方法
      paragraph.-text.-pre(fontSize='medium', letterSpacing='none') この画面から：下記ボタンよりご確認いただけます
      paragraph.-text(fontSize='tiny', letterSpacing='none') 会員の方：会員ログイン後に<a class='-point' href='javascript:void(0)' @click='goReservationList'>マイページの予約一覧</a>よりご確認いただけます。
      paragraph.-text(fontSize='tiny', letterSpacing='none') 非会員の方：メニューの<a class='-point' href='javascript:void(0)' @click='goReservationConfirm'>予約確認</a>から、予約番号・電話番号でご確認いただけます
  .-btn
    CTA-button.-submit(
      @click='goReservation',
      fontSize='large',
      type='secondary',
      text='予約確認画面へ'
    )
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Heading, SpanBold, Span, Paragraph, ParagraphBold } from '~/components/atoms/typography'
import PaymentStepBar from '~/components/molecules/flow/PaymentStepBar.vue'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
import FullLoading from '~/components/molecules/loading/FullLoading.vue'
import CheckMark from '~/assets/icon/checkmark.svg'
import WarningMark from '~/assets/icon/warning.svg'
import PaymentLoading from '~/components/molecules/loading/PaymentLoading.vue'
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
      headerTitle: '変更完了'
    })
  }

  destroyed() {
    // 変更情報初期化（戻る対策）
    this.$store.dispatch('modules/update/resetChangeInfo')
  }

  get changeInfo() {
    return this.$store.getters['modules/update/getChangedResult']
  }

  // 予約情報取得
  get completeStatus() {
    return this.$store.getters['modules/reservationGourmet/getReserve']
  }

  // 予約番号
  get reservationNumber() {
    return this.completeStatus.reservation.appCd + this.completeStatus.reservation.reservationMenus[0].reservationId
  }

  goReservationList() {
    location.href = '/user/'
  }

  goReservationConfirm() {
    location.href = '/gourmet/mypage/login/'
  }

  goReservation() {
    this.$router.push('/mypage/')
  }
}
</script>
<style lang="sass" scoped>
.complete
  .stepbar
    margin: 16px 0
  .rectangle
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    padding: 32px 12px 24px 12px
    margin-top: 24px
    background-color: rgba(221, 241, 255, 1)
    .circle
      position: relative
      width: 32px
      height: 32px
      border-radius: 50%
      border: none
      background: $white
      .mark
        position: absolute
        top: -5px
        right: -2px
        fill: #1ba1ff
    .-maintext
      margin-top: 24px
      color: #1ba1ff
    .-text
      margin-top: 20px
    .inner-rectangle
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      width: 254px
      height: 55px
      margin-top: 30px
      padding: 4px 24px
      border-radius: 3px
      background-color: $white
  .complete-description
    margin-top: 18px
    .-warn
      .-text
        margin-top: 27px
    .-tip
      margin-top: 27px
      .-text
        margin-top: 16px
        .-point
          color: #1ba1ff
  .-btn
    display: flex
    align-items: center
    justify-content: center
    .-submit
      display: flex
      align-items: center
      justify-content: center
      width: 343px
      height: 52px
      margin: 42px auto
@include pc_view
  .stepbar
    margin: 24px 0
  .complete
    .rectangle
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      padding: 32px 12px 24px 12px
      margin-top: 24px
      background-color: rgba(221, 241, 255, 1)
      .circle
        position: relative
        width: 32px
        height: 32px
        border-radius: 50%
        border: none
        background: $white
        .mark
          position: absolute
          top: -5px
          right: -2px
          fill: #1ba1ff
      .-maintext
        margin-top: 24px
        font-size: 24px
        color: #1ba1ff
      .-text
        text-align: center
        margin-top: 20px
        font-size: 16px
        .br:before
          content: '\A'
          white-space: pre
      .inner-rectangle
        display: flex
        flex-direction: column
        jutify-content: center
        align-items: center
        width: 419px
        margin-top: 30px
        padding: 8px 24px
        border-radius: 3px
        background-color: $white
        .-reservation-description
          font-size: 24px
    .complete-description
      margin-top: 18px
      .-warn
        margin-top: 36px
        .-text
          margin-top: 27px
      .-tip
        margin-top: 52px
        .-text
          margin-top: 16px
          font-size: 16px
        .-text.-pre
          margin-top: 28px
          .-point
            color: #1ba1ff
    .-btn
      display: flex
      align-items: center
      justify-content: center
      .-submit
        display: flex
        align-items: center
        justify-content: center
        min-width: 343px
        height: 52px
        margin: 42px auto
</style>
