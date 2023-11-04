<template lang="pug">
.cancel_confirm
  payment-loading(
    v-if='isOnlySeat',
    :isLoading='isPaymentLoading',
    text='loading'
  )
  payment-loading(
    v-else,
    :isLoading='isPaymentLoading',
    text='お支払い画面に移動しています。',
    text2='画面を操作せず、しばらくお待ちください。'
  )
  Heading.heads(fontSize='m') 変更内容のご確認
  full-loading(v-if='isLoading', :isLoading='isLoading')
  template(v-else)
    notification.mt-l(title='下記の内容に変更します', type='caution', icon='info')
    .restaurantMypage
      paragraph-bold.storetext.fs-18(fontSize='small') 日時・人数
        .date
          .label
            paragraph.-title 日時
          paragraph-bold.-data {{ visitDate }} ({{ dayOfTheWeek }}) {{ visitTime }}〜
        .people
          .label
            paragraph.-title 人数
          paragraph-bold.-data {{ visitPeople }}人
        paragraph-bold.storetext.fs-18(fontSize='small') ご予約のプラン・オプションなど
      .plan
        .label
          paragraph.-title プラン
        .plan-wrapper
          .plan-name
            paragraph-bold.-data.fs-16(fontSize='base') {{ planName }}
          .price
            paragraph-bold(v-if='!isOnlySeat', fontSize='base') ¥{{ $moneyFormat(unitPrice * visitPeople) }}
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
              paragraph-bold.total.-data.fs-16(
                :class='[diff ? "before" : ""]',
                fontSize='medium'
              ) ¥{{ $moneyFormat(beforeTotalPrice) }}
              paragraph-bold.total.-data.fs-16(
                v-if='diff',
                :class='[diff ? "after" : ""]',
                fontSize='medium'
              ) ¥{{ $moneyFormat(newTotalPrice) }}
    .storeDetail
      paragraph-bold.storetext.fs-24(fontSize='small') ご予約の店舗
      paragraph-bold.fs-18(fontSize='small') {{ storeInfo.name }}
      paragraph.fs-14(fontSize='tiny') {{ storeInfo.address }}
      .storeinfo.-textspace
        phone-mark.-phoneicon
        paragraph.-phonenum(fontSize='tiny') {{ storeInfo.tel }}
    cancel-policy(
      v-if='this.cancelPolicy.length > 0 && !isOnlySeat',
      :cancelPolicy='cancelPolicy'
    )
    .-footer
      .btn
        CTA-button(
          text='変更内容を確定',
          type='secondary',
          fontSize='large',
          @click='confirmed()'
        )
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { parseISO } from 'date-fns'
import { Heading, SpanBold, Span, Paragraph, ParagraphBold } from '~/components/atoms/typography'
import CancelPolicy from '~/components/organisms/cancel/CancelPolicy.vue'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
import FullLoading from '~/components/molecules/loading/FullLoading.vue'
import NextMark from '~/assets/icon/next.svg'
import Notification from '~/components/molecules/card/Notification.vue'
import PaymentLoading from '~/components/molecules/loading/PaymentLoading.vue'
import PaymentStepBar from '~/components/molecules/flow/PaymentStepBar.vue'
import PhoneMark from '~/assets/icon/phone-call.svg'
@Component({
  components: {
    CancelPolicy,
    CTAButton,
    FullLoading,
    Heading,
    NextMark,
    Notification,
    Paragraph,
    ParagraphBold,
    PaymentLoading,
    PaymentStepBar,
    PhoneMark,
    Span,
    SpanBold
  }
})
export default class UpdateConfirmIndex extends Vue {
  isPaymentLoading = false
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
      layoutType: 5,
      returnPath: '/reservation/update/'
    })
  }

  mounted() {
    setTimeout(async () => {
      if (!this.completeStatus.status || !this.existChangeInfo(this.changeInfo)) {
        this.$router.replace({ name: 'index' })
      }
      await this.$store.dispatch('modules/cancel/fetchCancelPolicy', {
        id: this.completeStatus.reservation.reservationStore.storeId,
        appCd: this.completeStatus.reservation.appCd
      })
      this.isLoading = false
    }, 0)
  }

  // 予約変更情報
  get changeInfo() {
    return this.$store.getters['modules/update/getChangeInfo']
  }

  // 予約情報取得
  get completeStatus() {
    return this.$store.getters['modules/reservationGourmet/getReserve']
  }

  // 予約番号
  get reservationNumber() {
    return this.completeStatus.reservation.reservationMenus[0].reservationId
  }

  // 予約時間取得
  get visitTime() {
    return this.changeInfo.time
  }

  // 予約日付取得
  get visitDate() {
    return this.changeInfo.date
  }

  // 予約人数取得
  get visitPeople() {
    return this.changeInfo.persons
  }

  // 連絡事項取得
  get request() {
    return this.changeInfo.request
  }

  // 予約プラン名
  get planName() {
    return this.completeStatus.reservation.reservationMenus[0].name
  }

  // プラン価格
  get unitPrice() {
    return Number(this.completeStatus.reservation.reservationMenus[0].unitPrice)
  }

  // 店舗情報取得
  get storeInfo() {
    return this.completeStatus.reservation.reservationStore
  }

  // 予約曜日取得
  get dayOfTheWeek() {
    const date = parseISO(this.visitDate)
    const dayOfWeekStr = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()]
    return dayOfWeekStr
  }

  // 席のみフラグ
  get isOnlySeat() {
    return this.completeStatus.reservation.reservationMenus[0].onlySeat
  }

  // option取得
  get options() {
    if (this.$feature('option') && this.changeInfo.reservationOptions.length > 0) {
      return this.changeInfo.reservationOptions.filter((option) => {
        // return option.keyword !== null
        return option.keyword !== null && option.count > 0
      })
    }
    return []
  }

  // キャンセルポリシー取得
  get cancelPolicy() {
    return this.$store.getters['modules/cancel/getCancelPolicy']
      ? this.$store.getters['modules/cancel/getCancelPolicy']
      : []
  }

  get beforeTotalPrice() {
    return Number(this.totalPrice(this.completeStatus.reservation.reservationMenus))
  }

  // 変更内容の総価格 ←ーーーーーーーー修正必要
  get newTotalPrice() {
    // optionのデータがまだない
    return this.changeInfo.persons * this.unitPrice + this.optionTotalPrice(this.options)
  }

  get diff() {
    if (this.beforeTotalPrice !== this.newTotalPrice) {
      return true
    }
    return false
  }

  // 予約変更結果
  get changedResult() {
    return this.$store.getters['modules/update/getChangedResult']
  }

  // option合計
  optionTotalPrice(options) {
    let allPrice = 0
    // option合計(optionが配列・objectか２パータン)
    options.forEach((option) => {
      if (Array.isArray(option)) {
        option.forEach((detailOption) => {
          allPrice += Number(detailOption.unitPirce * detailOption.count)
        })
      } else {
        allPrice += Number(option.unitPrice * option.count)
      }
    })
    return allPrice
  }

  // メーニュー総合計
  totalPrice(orderedMenu) {
    let totalPrices = 0

    // メインメーニュー合計(option有だったらoption合計を足す)
    orderedMenu.forEach((menu) => {
      if (menu.reservationOptions) {
        totalPrices += Number(menu.unitPrice) * menu.count + Number(this.optionTotalPrice(menu.reservationOptions))
      } else {
        totalPrices += Number(menu.unitPrice) * menu.count
      }
    })

    return totalPrices
  }

  // 確定ボタンを押した時
  confirmed(): void {
    this.isPaymentLoading = true
    const data = {
      visitDate: this.visitDate,
      visitTime: this.visitTime,
      persons: this.visitPeople,
      reservationId: Number(this.reservationNumber),
      request: this.request
    }
    this.$store.dispatch('modules/update/ReservationChange', data).then(() => {
      this.isPaymentLoading = false
      if (this.changedResult.status && this.changedResult.returnUrl) {
        location.href = this.changedResult.returnUrl
      } else if (this.changedResult.status && this.changedResult.isOnlySeat && !this.changedResult.returnUrl) {
        this.$router.push('/reservation/update/complete/')
      } else {
        alert('予約変更を失敗しました。')
      }
    })
  }

  existChangeInfo(changeInfo) {
    return changeInfo.date && changeInfo.time && changeInfo.persons
  }
}
</script>
<style lang="sass" scoped>
.cancel_confirm
  .heads
    margin-top: 15px
    margin: 30px 0
  .mt-l
    margin-top: 0px
    margin-bottom: 10px
  .storetext
    margin-top: 30px
    font-size: 16px
  .storeDetail
    .storeinfo
      position: relative
      .-phoneicon
        position: absolute
        top: -15%
        left: 0%
        fill: #4d4d4d
        width: 14px
      .-phonenum
        padding-left: 22px
  .-textspace
    margin: 15px 0
  .-footer
    .btn
      display: flex
      justify-content: center
      align-items: center
      text-align: center
      width: 80%
      margin: 20px auto
  .bottom
    padding-top: 30px
    padding-bottom: 130px
  .restaurantMypage
    .label
      display: flex
      justify-content: center
      align-items: center
      min-width: 120px
    .date
      display: flex
      align-items: center
      min-height: 66px
      margin-top: 20px
      background-color: #f4f4f4
      border-bottom: solid 1px #e4e4e4
      .-title
        padding: 0 16px
        text-align: center
      .-data
    .people
      display: flex
      align-items: center
      min-height: 66px
      background-color: #f4f4f4
      .-title
        padding: 0 8px
        text-align: center
      .-data
    .plan
      display: flex
      align-items: center
      min-height: 66px
      margin-top: 20px
      background-color: #f4f4f4
      border-bottom: solid 1px #e4e4e4
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
      background-color: #f4f4f4
      border-bottom: solid 1px #e4e4e4
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
      background-color: #f4f4f4
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
      color: #ff1d1c
    .-title
      padding: 0 16px
      text-align: center
@include pc_view
  .cancel_confirm
    position: relative
    .heads
      font-size: 32px
      margin: 30px 0
    .restaurantMypage
      .label
        min-width: 150px
      .date
        display: flex
        align-items: center
        min-height: 66px
        margin-top: 20px
        background-color: #f4f4f4
        border-bottom: solid 1px #e4e4e4
        .-title
          text-align: center
          .-data
            padding-left: 0
      .people
        display: flex
        align-items: center
        min-height: 66px
        background-color: #f4f4f4
        .-title
          text-align: center
        .-data
      .plan
        display: flex
        align-items: center
        min-height: 66px
        margin-top: 20px
        background-color: #f4f4f4
        border-bottom: solid 1px #e4e4e4
        .-title
          text-align: center
        .-data
          padding-left: 0
      .option-wrapper
        display: flex
        align-items: center
        min-height: 66px
        background-color: #f4f4f4
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
        background-color: #f4f4f4
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
</style>
