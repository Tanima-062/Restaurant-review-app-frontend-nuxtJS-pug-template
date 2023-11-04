<template lang="pug">
.cancel_confirm
  payment-step-bar.stepbar(:active='2.0')
  Heading.heads(fontSize='m') 変更内容のご確認
  full-loading(:isLoading='isLoading')
  template(v-if='completeStatus')
    .order-status
      .order-status-text
        paragraph-bold.ordernumtext(fontSize='small') ご注文番号
      .order-status-number
        paragraph-bold(fontSize='medium', line-height=1) {{ reservationNumber }}
    notification.mt-l(
      title='ご予約された飲食店から予約内容の変更がありました。',
      text='前回のご精算はキャンセルされる為、再度お支払いが必要です。下記の内容をご確認のうえ、お支払いを完了してください。',
      type='caution',
      icon='info'
    )
    .payment-button-wrapper
      CTA-button.payment-button(
        text='お支払いへ',
        type='primary',
        fontSize='large',
        @click='goPayment()'
      )
      .payment-text
        paragraph(fontSize='small') ご入金期限：<span class="alert">{{ formatDate(this.reservationInfo.paymentLimit) }}</span>まで
        paragraph(fontSize='small') 入金期限を超過すると予約がキャンセルされますのでご注意下さい。

    .reservation-info
      paragraph-bold.storetext.fs-24(fontSize='medium') 日時・人数
      .date
        .label
          paragraph.-title 日時
        paragraph-bold.-data {{ formatDate(this.reservationInfo.pickUpDateTime) }}〜
      .people
        .label
          paragraph.-title 人数
        paragraph-bold.-data {{ visitPeople }}人
      paragraph-bold.storetext.fs-24(fontSize='medium') ご予約のプラン・オプションなど
      .plan
        .label
          paragraph.-title プラン
        .plan-wrapper
          .plan-name
            paragraph-bold.-data.fs-16(fontSize='base') {{ planName }}
          .price
            paragraph-bold(fontSize='base') ¥{{ $moneyFormat(unitPrice * visitPeople) }}
      .option-wrapper(v-if='options.length > 0')
        .label
          paragraph.-title 追加オプション
        .options-wrapper
          .options(v-for='option in options')
            .option
              paragraph-bold.-data.fs-16(fontSize='base') {{ option.keyword }}
              paragraph(fontSize='small') x{{ option.count }}
            .price
              paragraph-bold(fontSize='base') ¥{{ $moneyFormat(Number(option.unitPrice * option.count)) }}
      .price-wrapper
        .label
          paragraph-bold.-title お支払い金額
        .total-price
          .price
            .price-title
              paragraph-bold.-data.fs-16(fontSize='base') 合計
              paragraph.tax.-data.fs-16(fontSize='small') (税込)
            .price-result
              paragraph-bold.total.-data.fs-16.before(fontSize='medium') ¥{{ $moneyFormat(this.reservationInfo.total) }}
              paragraph-bold.total.-data.fs-16.after(fontSize='medium') ¥{{ $moneyFormat(this.reservationInfo.afterTotal) }}
    .storeDetail
      paragraph-bold.store-info.fs-24(fontSize='medium') ご予約の店舗
      paragraph-bold.fs-18(fontSize='small') {{ storeInfo.name }}
      paragraph.fs-14(fontSize='tiny') {{ storeInfo.address }}
      .storeinfo
        phone-icon
        paragraph.-phonenum.fs-14(fontSize='tiny') {{ storeInfo.tel }}
    cancel-policy(
      v-if='this.cancelPolicy.length > 0',
      :cancelPolicy='cancelPolicy'
    )
    .-footer
      .btn
        CTA-button(
          text='キャンセル',
          type='secondary_sub',
          fontSize='large',
          @click='goCancel()'
        )
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { format, parseISO } from 'date-fns'
import { Heading, Paragraph, ParagraphBold, Span, SpanBold } from '~/components/atoms/typography'
import CancelPolicy from '~/components/organisms/cancel/CancelPolicy.vue'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
import FullLoading from '~/components/molecules/loading/FullLoading.vue'
import Notification from '~/components/molecules/card/Notification.vue'
import PaymentLoading from '~/components/molecules/loading/PaymentLoading.vue'
import PaymentStepBar from '~/components/molecules/flow/PaymentStepBar.vue'
import PhoneIcon from '~/assets/icon/phone-call.svg'

@Component({
  components: {
    CancelPolicy,
    CTAButton,
    FullLoading,
    Heading,
    Notification,
    Paragraph,
    ParagraphBold,
    PaymentLoading,
    PaymentStepBar,
    PhoneIcon,
    Span,
    SpanBold
  }
})
export default class RebillIndex extends Vue {
  isLoading = true
  head() {
    return {
      title: 'ご注文内容の確認',
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  }

  fetch({ store }) {
    store.dispatch('modules/layout/setHeaderInfo', {
      headerTitle: 'ご注文内容の確認',
      layoutType: 5
    })
  }

  mounted() {
    setTimeout(() => {
      // ログインを叩いてstoreに入れる
      this.$store
        .dispatch('modules/user/getUserData')
        .then(() => {
          this.$store.dispatch('modules/reservationGourmet/LoginForm').then(async () => {
            if (!this.completeStatus || this.reservationInfo.paymentStatus !== 'WAIT_PAYMENT') {
              this.$router.push({ name: 'mypage' })
            }
            await this.$store.dispatch('modules/cancel/fetchCancelPolicy', {
              id: this.storeInfo.storeId,
              appCd: this.reservationInfo.appCd
            })
            this.isLoading = false
          })
        })
        .catch(() => this.$router.push('/mypage/login/'))
    }, 0)
  }

  // 予約情報取得
  get completeStatus() {
    return this.$store.getters['modules/reservationGourmet/getReserve'].status
  }

  get reservationInfo() {
    return this.$store.getters['modules/reservationGourmet/getReserve'].reservation
      ? this.$store.getters['modules/reservationGourmet/getReserve'].reservation
      : {}
  }

  // 予約人数取得
  get visitPeople() {
    return this.reservationInfo.persons
  }

  // 予約プラン名
  get planName() {
    return this.reservationInfo.reservationMenus[0].name
  }

  // プラン価格
  get unitPrice() {
    return Number(this.reservationInfo.reservationMenus[0].unitPrice)
  }

  // 店舗情報取得
  get storeInfo() {
    return this.reservationInfo.reservationStore
  }

  // option取得
  get options() {
    if (
      this.$feature('option') &&
      this.reservationInfo.reservationMenus.length > 0 &&
      this.reservationInfo.reservationMenus[0].reservationOptions &&
      this.reservationInfo.reservationMenus[0].reservationOptions.length > 0
    ) {
      return this.reservationInfo.reservationMenus[0].reservationOptions.filter((option) => {
        // return option.keyword !== null
        return option.keyword !== null && option.count > 0
      })
    }
    return []
  }

  get reservationNumber() {
    return this.reservationInfo.appCd + this.reservationInfo.id
  }

  // キャンセルポリシー取得
  get cancelPolicy() {
    return this.$store.getters['modules/cancel/getCancelPolicy']
      ? this.$store.getters['modules/cancel/getCancelPolicy']
      : []
  }

  onInput(val: string) {
    if (val !== 'undefined') {
      this.$store.dispatch('modules/reservationGourmet/setReservationLogin', val)
    }
  }

  onInputTel(val: string) {
    if (val !== 'undefined') {
      this.$store.dispatch('modules/reservationGourmet/setReservationTell', val)
    }
  }

  formatDate(dateStr) {
    if (!dateStr) {
      return
    }
    const date = parseISO(dateStr)
    const dayOfWeekStr = ['日', '月', '火', '水', '木', '金', '土']
    const dateFormat = format(date, 'yyyy/MM/dd')
    const timeFormat = format(date, 'HH:mm')
    return `${dateFormat}(${dayOfWeekStr[date.getDay()]}) ${timeFormat}`
  }

  // 支払い画面へ遷移
  goPayment() {
    this.isLoading = true
    this.$store
      .dispatch('modules/reservationGourmet/directPayment', this.reservationInfo.id)
      .then(() => {
        // eslint-disable-next-line prettier/prettier
        const { paymentUrl } = this.$store.getters['modules/reservationGourmet/getDirectPaymentInfo']
        location.href = paymentUrl
      })
      .catch(() => {
        alert('エラーが発生しました。\nお手数ですが時間を置いて再度お試しください。')
        this.isLoading = false
      })
  }

  // キャンセルページ遷移
  goCancel() {
    this.$router.push('/cancel/')
  }
}
</script>
<style lang="sass" scoped>
.cancel_confirm
  .stepbar
    margin: 16px 0
  .order-status
    display: flex
    justify-content: center
    align-items: center
    margin-top: 32px
    margin-bottom: 32px
    &-text
      white-space: nowrap
    &-number
      display: flex
      justify-content: center
      align-items: center
      margin-left: 10px
      width: 100%
      max-width: 195px
      height: 35px
      border-radius: 17.5px
      background-color: $gray
      p
        font-size: 16px
  .heads
    margin: 32px 0 24px 0
  .mt-l :deep()
    padding: 8px
    margin-bottom: 16px
    .-icon-wrapper
      display: grid
      grid-template-rows: 1fr 1fr
      align-items: center
    .-text-wrapper
      span:first-child
        font-size: 14px
      span:last-child
        font-size: 12px
  .payment-button-wrapper
    .payment-button
      max-width: 345px
      margin: 0 auto
    .payment-text
      padding-top: 8px
      text-align: center
      .alert
        color: $error_color
        font-weight: bold
  .storetext
    margin-top: 48px
  .reservation-info
    .label
      display: flex
      justify-content: center
      align-items: center
      min-width: 60px
    .date
      display: flex
      align-items: center
      min-height: 66px
      margin-top: 16px
      background-color: $light_gray
      border-bottom: solid 1px $gray
      .-title
        padding: 0 16px
        text-align: center
      .-data
    .people
      display: flex
      align-items: center
      min-height: 66px
      background-color: $light_gray
      .-title
        padding: 0 8px
        text-align: center
      .-data
    .plan
      display: flex
      align-items: center
      min-height: 66px
      margin-top: 20px
      background-color: $light_gray
      border-bottom: solid 1px $gray
      .plan-wrapper
        display: flex
        justify-content: space-between
        flex: 1
        padding-right: 24px
        .plan-name
          display: flex
          padding-right: 8px
        .price
          white-space: nowrap
        .-title
          padding: 0 8px
          text-align: center
    .option-wrapper
      display: flex
      align-items: center
      min-height: 66px
      background-color: $light_gray
      border-bottom: solid 1px $gray
      .options-wrapper
        flex: 1
        padding-right: 24px
        .options
          display: flex
          justify-content: space-between
          white-space: nowrap
          .option
            display: flex
            align-items: center
            padding-right: 8px
            p:nth-child(2)
              margin-left: 8px
      .-title
        padding: 0 8px
        text-align: center
    .price-wrapper
      display: flex
      align-items: center
      min-height: 66px
      padding: 16px 0
      background-color: $light_gray
    .total-price
      display: flex
      justify-content: flex-end
      flex: 1
      padding-right: 24px
      .price
        display: flex
        justify-content: space-between
        align-items: baseline
        .price-title
          display: flex
          align-items: flex-end
          flex: 1
          margin-right: 16px
          .tax
            font-size: 12px
        .total
          font-size: 16px
    .before
      text-decoration: line-through
    .after
      color: $error_color
    .-title
      padding: 0 16px
      text-align: center
  .storeDetail
    .store-info
      line-height: 1
      padding: 30px 0 12px
    .storeinfo
      display: grid
      gap: 10px
      grid-template-columns: max-content max-content
      align-items: center
      svg
        width: 12px
        height: 12px
        fill: $spare_gray
  .-footer
    padding: 32px 16px
    .btn
      max-width: 345px
      margin: 0 auto
@include pc_view
  .cancel_confirm
    .stepbar
      margin: 24px auto
      width: 100%
    .order-status
      display: flex
      justify-content: center
      align-items: center
      margin-top: 48px
      margin-bottom: 40px
      &-text
        white-space: nowrap
        p
          font-size: 24px
      &-number
        display: flex
        justify-content: center
        align-items: center
        width: 100%
        height: 50px
        min-width: 195px
        max-width: 323px
        margin-left: 30px
        border-radius: 25px
        p
          font-size: 24px
    .mt-l :deep()
      padding: 8px
      margin-bottom: 16px
      .-icon-wrapper
        display: flex
        align-items: center
  .fs-24
    font-size: 24px
  .fs-18
    font-size: 18px
  .fs-14
    font-size: 14px
  .cancel_confirm
    position: relative
    .heads
      font-size: 32px
      margin: 40px 0 30px 0
    .reservation-info
      .label
        min-width: 150px
      .date
        display: flex
        align-items: center
        min-height: 66px
        margin-top: 20px
        background-color: $light_gray
        border-bottom: solid 1px $gray
        .-title
          text-align: center
          .-data
            padding-left: 0
      .people
        display: flex
        align-items: center
        min-height: 66px
        background-color: $light_gray
        .-title
          text-align: center
        .-data
      .plan
        display: flex
        align-items: center
        min-height: 66px
        margin-top: 20px
        background-color: $light_gray
        border-bottom: solid 1px $gray
        .-title
          text-align: center
        .-data
          padding-left: 0
      .option-wrapper
        display: flex
        align-items: center
        min-height: 66px
        background-color: $light_gray
        .options-wrapper
          flex: 1
          padding-right: 24px
          .options
            display: flex
            justify-content: space-between
            .option
              display: flex
              align-items: center
              p:nth-child(2)
                margin-left: 8px
      .price-wrapper
        display: flex
        align-items: center
        min-height: 66px
        background-color: $light_gray
        .total-price
          display: flex
          justify-content: flex-end
          flex: 1
          padding-right: 24px
          .price
            display: flex
            justify-content: space-between
            align-items: baseline
            .price-title
              display: flex
              align-items: flex-end
              margin-right: 24px
              .tax
                font-size: 14px
          .total
            font-size: 18px
        .-title
          text-align: center
    .storeDetail
      .store-info
        line-height: 1
        padding: 56px 0 24px
</style>
