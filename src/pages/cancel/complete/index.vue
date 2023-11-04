<template lang="pug">
.cancel
  full-loading(:isLoading='!reservationNumber')
  .cancel-top
    paragraph-bold.cancel-top-title(fontSize='large') キャンセル完了
    paragraph-bold.cancel-top-subtitle(fontSize='medium') 予約内容
    paragraph-bold.cancel-top-subtitle(fontSize='small') 下記の予約がキャンセルされました。
  .reservation(v-if='reservationNumber')
    .reservation-number
      .label
        paragraph.-title(fontSize='small') 予約番号
      paragraph-bold.reservation-number-content(fontSize='small') {{ reservationNumber }}
    .reservation-info
      .label
        paragraph.-title(fontSize='small') 予約情報
      .reservation-info-description
        .day
          paragraph.sub-label(fontSize='tiny') 日時:
          paragraph-bold.-content(fontSize='tiny') {{ visitDate }} ({{ dayOfTheWeek }}) {{ visitTime }}〜
        .people
          paragraph.sub-label(fontSize='tiny') 人数:
          paragraph-bold.-content(fontSize='tiny') {{ visitPeople }}名
        .store
          paragraph.sub-label(fontSize='tiny') 店舗:
          paragraph-bold.-content(fontSize='tiny') {{ storeName }}
  .mail
    paragraph(fontSize='small', letterSpacing='none') {{ email }}宛に確認メールが送信されました。
    paragraph(fontSize='small', letterSpacing='none') 予約確認書をご確認ください。
  .btn
    CTA-button.backButton(
      text='skyticketグルメを探す',
      type='secondary_sub',
      fontSize='large',
      @click='back()',
      :disabled='false'
    )
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { format, parseISO } from 'date-fns'
import { Heading, SpanBold, Paragraph, ParagraphBold, Span } from '~/components/atoms/typography'
import FullLoading from '~/components/molecules/loading/FullLoading.vue'
import SimpleRadio from '~/components/molecules/radio/SimpleRadio.vue'
import NameRadio from '~/components/molecules/radio/NameRadio.vue'
import ValidatedTextArea from '~/components/molecules/textarea/ValidatedTextArea.vue'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
import SelectBox from '~/components/molecules/select/SelectBox.vue'

@Component({
  components: {
    Heading,
    SpanBold,
    Span,
    Paragraph,
    ParagraphBold,
    FullLoading,
    SimpleRadio,
    NameRadio,
    CTAButton,
    SelectBox,
    ValidatedTextArea
  }
})
export default class InquiryIndex extends Vue {
  head() {
    return {
      title: 'キャンセル完了',
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  }

  fetch({ store }) {
    store.dispatch('modules/layout/setHeaderInfo', {
      layoutType: 3,
      headerTitle: 'キャンセル完了'
    })
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

  // 予約時間取得
  get reservationTime() {
    return this.completeStatus.reservation.pickUpDateTime
      ? parseISO(this.completeStatus.reservation.pickUpDateTime)
      : ''
  }

  // 予約メール取得
  get email() {
    return this.completeStatus.reservation.email
  }

  back() {
    this.$router.push('/')
  }
}
</script>
<style lang="sass" scoped>
.page
  min-height: 55vh
  @include pc_view
    min-height: 80vh
.cancel
  .cancel-top
    margin-top: 16px
    &-subtitle
      margin-top: 24px
    p:nth-child(3)
      margin-top: 16px
  .reservation
    padding: 0 8px
    margin-top: 16px
    background-color: $light_gray
    &-number
      display: flex
      align-items: center
      padding: 16px 0
      border-bottom: 1px solid $gray
      &-content
    &-info
      display: flex
      align-items: center
      padding: 16px 0
      &-description
        .day
          display: flex
        .people
          display: flex
        .store
          display: flex
    .label
      text-align: center
      .-title
        width: 90px
    .sub-label
      white-space: pre
      margin-right: 8px
  .mail
    display: flex
    flex-direction: column
    justify-content: space-between
    height: 55px
    margin-top: 16px
  .btn
    display: flex
    justify-content: center
    margin-top: 24px
  .backButton
    margin-bottom: 24px
@include pc_view
  .cancel
    .cancel-top
      margin-top: 32px
      &-title
        font-size: 32px
      &-subtitle
        margin-top: 24px
        font-size: 24px
      p:nth-child(3)
        font-size: 20px
    .reservation
      padding: 0 8px
      margin-top: 32px
      background-color: $light_gray
      &-number
        display: flex
        align-items: center
        padding: 16px 0
        border-bottom: 1px solid $gray
        &-content
          font-size: 18px
      &-info
        display: flex
        align-items: center
        padding: 16px 0
        &-description
          .day
            display: flex
          .people
            display: flex
          .store
            display: flex
      .label
        text-align: center
        .-title
          width: 140px
          font-size: 16px
      .sub-label
        font-size: 16px
        margin-right: 16px
      .-content
        font-size: 16px
    .mail
      display: flex
      flex-direction: column
      justify-content: space-between
      height: 55px
      margin-top: 16px
      p
        font-size: 16px
    .btn
      display: flex
      justify-content: center
      margin-top: 40px
</style>
