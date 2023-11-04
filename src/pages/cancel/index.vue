<template lang="pug">
.cancel
  full-loading(:isLoading='isLoading')
  notification-pop.pop(
    :isShown='isAlertPopShown',
    type='error',
    icon='warning',
    position='right',
    @closePop='closePop'
  )
    template(v-if='cancelStatus.message')
      | {{ cancelStatus.message }}
  .cancel-title
    paragraph-bold(fontSize='large') キャンセル手続き
  .cancel-subtitle
    paragraph-bold(fontSize='medium') 予約内容
  .reservation-table(v-if='!isLoading')
    .number.wrapper
      .inner
        ._label 予約番号
        paragraph-bold.-text {{ reservationNumber }}
    .info.wrapper
      .inner
        ._label 予約情報
        .info-detail
          .-day.info-wrapper
            paragraph._sublabel(fontSize='tiny') 日時:
            paragraph-bold.-text {{ visitDate }} ({{ dayOfTheWeek }}) {{ visitTime }}〜
          .-people.info-wrapper
            paragraph._sublabel(fontSize='tiny') 人数:
            paragraph-bold.-text {{ visitPeople }}名
          .store.info-wrapper
            paragraph._sublabel(fontSize='tiny') 店舗:
            paragraph-bold.-text {{ storeName }}
    .price.wrapper(v-if='Number(menu[0].price) > 0')
      .inner
        ._label 代金
        .cancel-info
          .-top
            .payment.price-wrapper
              paragraph._sublabel._sublabel(fontSize='tiny') 入金済み
              paragraph-bold.-text ¥{{ $moneyFormat(Number(totalPrice(menu))) }}
            .cancel-price.price-wrapper
              paragraph._sublabel(fontSize='tiny') キャンセル料
              paragraph-bold.-text ¥{{ $moneyFormat(cancelPrice) }}
          .-bottom
            .refund-price.price-wrapper
              paragraph._sublabel(fontSize='tiny') 払戻金額
              paragraph-bold.-text ¥{{ $moneyFormat(refundPrice) }}
  .btn
    CTA-button(
      text='予約をキャンセルする',
      type='secondary',
      fontSize='large',
      @click='submit()',
      :disabled='processing'
    )
    CTA-button.back-btn(
      text='予約詳細に戻る',
      type='secondary_sub',
      fontSize='large',
      @click='back()',
      :disabled='false'
    )
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { format, parseISO } from 'date-fns'
import { Heading, Paragraph, ParagraphBold } from '~/components/atoms/typography'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
import FullLoading from '~/components/molecules/loading/FullLoading.vue'
import NotificationPop from '~/components/molecules/card/NotificationPop.vue'

@Component({
  components: {
    Heading,
    Paragraph,
    ParagraphBold,
    CTAButton,
    FullLoading,
    NotificationPop
  }
})
export default class CancelIndex extends Vue {
  isAlertPopShown = false
  isLoading = true
  processing = false
  head() {
    return {
      title: 'キャンセル手続き',
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  }

  fetch({ store }) {
    store.dispatch('modules/layout/setHeaderInfo', {
      layoutType: 3,
      returnPath: '/takeout',
      headerTitle: 'キャンセル手続き'
    })
  }

  mounted() {
    setTimeout(() => {
      // 予約情報がない場合
      if (!this.completeStatus.status) {
        this.$router.push('/mypage/login')
      }
      this.$store
        .dispatch('modules/cancel/CancelPrice', this.reservationNumber ? this.reservationNumber.substring(2) : '')
        .then(() => {
          this.isLoading = false
        })
    }, 0)
  }

  // 予約番号取得
  get reservationNumber() {
    if (this.$store.getters['modules/reservationGourmet/getReservationNum']) {
      return this.$store.getters['modules/reservationGourmet/getReservationNum']
    }
  }

  // 予約日付取得
  get visitDate() {
    let newFormat = ''
    if (this.reservationTime) {
      const date = this.reservationTime
      newFormat = format(date, 'yyyy/MM/dd')
    }
    return newFormat
  }

  // 予約人数取得
  get visitPeople() {
    return this.completeStatus.reservation.persons
  }

  // 予約時間取得
  get visitTime() {
    let newFormat = ''
    if (this.reservationTime) {
      const time = this.reservationTime
      newFormat = format(time, 'HH:mm')
    }
    return newFormat
  }

  // 予約時間取得
  get reservationTime() {
    return this.completeStatus.reservation.pickUpDateTime
      ? parseISO(this.completeStatus.reservation.pickUpDateTime)
      : ''
  }

  get menu() {
    return this.completeStatus.reservation.reservationMenus
  }

  // 予約曜日取得
  get dayOfTheWeek() {
    const date = parseISO(this.completeStatus.reservation.pickUpDateTime)
    const dayOfWeekStr = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()]
    return dayOfWeekStr
  }

  // 店舗名取得
  get storeName() {
    return this.completeStatus.reservation.reservationStore.name
  }

  // 予約情報取得
  get completeStatus() {
    return this.$store.getters['modules/reservationGourmet/getReserve']
  }

  // キャンセル手続き情報
  get cancelInfo() {
    return this.$store.getters['modules/cancel/getCancelInfo']
  }

  // キャンセル料
  get cancelPrice() {
    return this.cancelInfo.cancelPrice
  }

  // 返金予定額
  get refundPrice() {
    return this.cancelInfo.refundPrice
  }

  // キャンセル結果取得
  get cancelStatus() {
    return this.$store.getters['modules/cancel/getCancelStatus']
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

  // キャンセルAPI叩く
  async submit() {
    if (this.processing) {
      return
    }
    this.processing = true
    await this.$store.dispatch(
      'modules/cancel/CancelReservation',
      this.reservationNumber ? this.reservationNumber.substring(2) : ''
    )
    if (this.cancelStatus.status) {
      this.$router.push('/cancel/complete')
    } else {
      this.isAlertPopShown = true
    }
    this.processing = false
  }

  back() {
    this.$router.push('/mypage')
  }

  // 警告ポップ閉じる
  closePop(): void {
    this.isAlertPopShown = false
  }
}
</script>
<style lang="sass" scoped>
.page
  min-height: auto
.pop
  white-space: pre
.cancel
  &-title
    margin-top: 16px
    & > p
      font-size: 20px
  &-subtitle
    margin-top: 24px
    & > p
      font-size: 16px
  .reservation-table
    margin-top: 16px
    .number
    .info
      .info-wrapper
        display: flex
        align-items: center
        .-text
          margin-left: 8px
          font-size: 12px
    .price
      .cancel-info
        flex: 1
        .price-wrapper
          display: flex
          justify-content: space-between
          align-items: center
        .-top
          padding-bottom: 16px
          border-bottom: 1px solid $gray
          .-text
            font-size: 12px
        .-bottom
          padding-top: 16px
  .btn
    margin-top: 24px
    margin-bottom: 40px
    .back-btn
      margin: 16px 0 40px 0
.wrapper
  padding: 0 8px
  background-color: $light_gray
.inner
  display: flex
  align-items: center
  padding: 16px 0px
  border-bottom: 1px solid $gray
._label
  display: flex
  justify-content: center
  min-width: 25%
._sublabel
  min-width: 30px
@include pc_view
  .cancel
    &-title
      margin-top: 40px
      & > p
        font-size: 32px
    &-subtitle
      margin-top: 40px
      & > p
        font-size: 24px
    .reservation-table
      margin-top: 16px
      .number
        .-text
          font-size: 18px
      .info
        .info-wrapper
          display: flex
          align-items: center
          .-text
            margin-left: 8px
            font-size: 16px
      .price
        .cancel-info
          flex: 1
          .price-wrapper
            display: flex
            justify-content: space-between
            align-items: center
            padding-right: 16px
          .-top
            padding-bottom: 16px
            border-bottom: 1px solid $gray
            .-text
              font-size: 16px
          .-bottom
            padding-top: 16px
            .-text
              font-size: 18px
    .btn
      display: flex
      justify-content: center
      margin: 40px 0
      .back-btn
        margin: 0
        margin-left: 8px
  .wrapper
    padding: 0 8px
    background-color: $light_gray
  .inner
    display: flex
    align-items: center
    padding: 16px 0px
    border-bottom: 1px solid $gray
  ._label
    display: flex
    justify-content: center
    width: 25%
  ._sublabel
    min-width: 30px
    font-size: 16px
</style>
