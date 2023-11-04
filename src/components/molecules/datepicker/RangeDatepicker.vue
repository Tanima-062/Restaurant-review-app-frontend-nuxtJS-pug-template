<template lang="pug">
base-drawer(:isActive='isShow' :withHeader='false' @close='closeDrawer')
  .-input-date-picker-modal
    .-input-date-picker-modal-header
      div.-close.icon-cross(@click='closeDrawer')
      .-input-date-picker-modal-header-content
        div.-input-date-picker-selected.-input-date-picker-selected-departure(@click='toggleSelect(true)' :class='{ onSelect: selectDepature }')
          p.-input-date-picker-selected-title {{ $t("出発") }}
          span.-input-date-picker-selected-date {{ changeLangJaForDate(selectingStartDate) }}
        div.-input-date-picker-selected.-input-date-picker-selected-arrival(@click='toggleSelect(false)' :class='{ onSelect: !selectDepature }')
          p.-input-date-picker-selected-title {{ $t("返却") }}
          span.-input-date-picker-selected-date(:class='{ notSelected: selectingEndDate === "" }') {{ changeLangJaForDate(selectingEndDate) }}
    .-input-date-picker-content
      div.-date-picker-body(v-for='month in calendarData')
        .-date-picker-month {{ month.yearMonth }}
        .-date-picker-dates
          div.-date-picker-date(
            v-for='(date, index) in month.dates'
            :class='[{ onSelectDeparture: date.date === selectingStartDate } { onSelectMiddleDay: middleDayCheck(date.date) } { onSelectArrival: date.date === selectingEndDate }]'
            :style='[dateColorStyle(date) parseInt(date.displayValue) === 1 ? { gridColumn: `${date.day + 1}/${date.day + 2}` } : ""]'
            :disabled='disabledCheck(date.date)'
            @click='onClickHandler(date)'
          ) {{ date.displayValue }}
  template(v-slot:footer)
    .-date-picker-footer
      .-footer-button
        CTA-button.free-width-max(
          :text='$t("完了")'
          type='secondary'
          fontSize='large'
          @click='updateDates'
          :disabled='selectingStartDate === "" || selectingEndDate === ""'
        )
</template>
<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import cloneDeep from 'lodash/cloneDeep'
import { Prop, Component, Emit } from 'nuxt-property-decorator'
import { ModelTypes } from '../../../types/model'
import BaseDrawer from '~/components/atoms/drawers/BaseDrawer.vue'
import CTAButton from '~/components/atoms/button/CTAButton.vue'

@Component({
  components: {
    BaseDrawer,
    CTAButton
  },
  methods: {
    cloneDeep
  }
})
export default class RangeDatepicker extends Vue {
  @Prop() private selectedStartDate!: string
  @Prop() private selectedEndDate!: string
  @Prop() private isShow!: boolean
  private selectingStartDate = cloneDeep(this.selectedStartDate)
  private selectingEndDate = cloneDeep(this.selectedEndDate)

  private selectDepature = true

  @Emit('updateDates')
  updateDates() {
    return {
      startDate: this.selectingStartDate,
      endDate: this.selectingEndDate
    }
  }

  @Emit('close')
  closeDrawer() {
    // 親に伝えるだけ
  }

  /**
   * カレンダー表示用のデータの作成
   */
  get calendarData() {
    return [...Array(12).keys()].map((a) => {
      const startDate = moment().add(a, 'month').startOf('month')
      const endDate = moment().add(a, 'month').endOf('month')
      const days = moment(endDate).diff(startDate, 'days') + 1
      const datesInfo: ModelTypes.DateInfo[] = [...Array(days).keys()].map((date) => {
        const d = startDate.clone().add(date, 'days')
        return {
          date: d.format('YYYY/MM/DD'),
          day: d.day(),
          displayValue: d.format('D')
        }
      })
      return {
        yearMonth: startDate.format('M月 YYYY年'),
        dates: datesInfo
      }
    })
  }

  /**
   *  日付を選択時の動き
   *  Google Flightに寄せる
   */
  onClickHandler(date: ModelTypes.DateInfo): void {
    if (!this.disabledCheck(date.date)) {
      if (this.selectDepature) {
        if (moment(date.date, 'YYYY/MM/DD').isAfter(this.selectingEndDate)) {
          this.selectingEndDate = ''
        }
        this.selectingStartDate = date.date
      } else if (moment(date.date, 'YYYY/MM/DD').isBefore(this.selectingStartDate)) {
        this.selectingStartDate = date.date
        this.selectingEndDate = ''
        this.selectDepature = !this.selectDepature
      } else {
        this.selectingEndDate = date.date
      }
      this.selectDepature = !this.selectDepature
    }
  }

  toggleSelect(isDeprature: boolean): void {
    this.selectDepature = isDeprature
  }

  /**
   * 日本語で日付を表示するためのmethod
   */
  changeLangJaForDate(date: string) {
    return date ? moment(date, 'YYYY/MM/DD').format('M月D日') : this.$i18n.t('ご選択ください')
  }

  /**
   * 日本語で曜日を表示するためのmethod
   */
  // changeLangJaForDay(date: string): string {
  //   moment.locale('ja')
  //   return date ? moment(date, 'YYYY/MM/DD').format('（ddd）') : ''
  // }

  /**
   *  選択可能かどうかの確認
   */
  disabledCheck(date: string): boolean {
    return moment(date, 'YYYY/MM/DD').isBefore(moment().format('YYYY/MM/DD'))
  }

  /**
   *  日付のスタイル
   */
  dateColorStyle(date: ModelTypes.DateInfo): object {
    return this.disabledCheck(date.date)
      ? { color: '#a6a6a6' }
      : date.day === 0
      ? { color: '#ff1d1c' }
      : date.day === 6
      ? { color: '#1c5db5' }
      : {}
  }

  /**
   *  出発日から帰宅日の間であるかどうかのチェック
   */
  middleDayCheck(date: string): boolean {
    return (
      moment(date, 'YYYY/MM/DD').isAfter(this.selectingStartDate) &&
      moment(date, 'YYYY/MM/DD').isBefore(this.selectingEndDate)
    )
  }
}
</script>

<style lang="sass" scoped>
.-input-date-picker-modal
  padding: 16px
  display: grid
  grid-template-columns: repeat(4, 1fr)
  grid-gap: 8px
  height: 100%
  .-input-date-picker-modal-header
    position: fixed
    top: 0
    right: 0
    width: 100%
    padding: 16px 16px 0
    display: grid
    grid-template-columns: repeat(8, 1fr)
    grid-gap: 8px
    background-color: $white
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15)
    z-index: 10
    @media screen and (min-width: 768px)
      width: 675px !important
    .-close
      color: $dark_gray
      grid-column: 8/9
      padding-left: 19px
    .-input-date-picker-modal-header-content
      grid-column: 1/9
      display: grid
      grid-template-columns: repeat(8, 1fr)
      grid-gap: 8px
      .-input-date-picker-selected-departure
        grid-column: 1/5
        padding: 0 0 16px 16px
        margin: 0 -4px 0 -16px
      .-input-date-picker-selected-arrival
        grid-column: 5/9
        padding: 0 16px 16px 4px
        margin: 0 -16px 0 -4px
      .-input-date-picker-selected
        .-input-date-picker-selected-title
          font-size: $font_size_tiny
          color: $dark_gray
          margin-bottom: 4px
        .-input-date-picker-selected-date
          font-size: $font_size_large
        .notSelected
          color: $dark_gray
          font-size: $font_size_default_pc
        .-input-date-picker-selected-day
          font-size: $font_size_tiny
          color: $dark_gray
      .onSelect
        border-bottom: 4px solid $sub_color
  .-input-date-picker-content
    grid-column: 1/5
    margin: 96px -16px 0
    padding: 0 16px
    overflow-y: auto
    .-date-picker-body
      padding: 16px 0
      .-date-picker-month
        margin-bottom: 16px
      .-date-picker-dates
        display: grid
        grid-template-columns: repeat(7, 1fr)
        grid-gap: 0 4px
        justify-items: center
        .-date-picker-date
          font-size: $font_size_tiny
          padding: 12px 0
          width: 100%
          text-align: center
        .onSelectDeparture
          position: relative
          background-color: $sub_color
          color: $white !important
          font-size: $font_size_default_pc
          width: 107%
        .onSelectDeparture:after
          position: absolute
          content: ""
          top: 16px
          right: -13px
          width: 0
          height: 0
          border: 7px solid transparent
          border-left: 6px solid #1c5db5
        .onSelectArrival
          position: relative
          background-color: $sub_color
          color: $white !important
          font-size: $font_size_default_pc
          width: 107%
        .onSelectArrival:after
          position: absolute
          content: ""
          top: 16px
          left: -13px
          width: 0
          height: 0
          border: 7px solid transparent
          border-right: 6px solid #1c5db5
        .onSelectMiddleDay
          background-color: $notice_color
          font-size: $font_size_default_pc
          width: 110%
      .-date-picker-dates:disabled
        color: $dark_gray
.-date-picker-footer
  .-date-picker-footer-total-price
    padding: 8px 0
    .-date-picker-footer-text
      margin-right: 16px
  .-footer-button
    height: 50px
</style>
