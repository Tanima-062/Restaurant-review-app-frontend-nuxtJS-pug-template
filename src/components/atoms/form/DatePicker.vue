<template lang="pug">
base-drawer(:isActive='isShow', @close='closeDrawer')
  .-input-date-picker-modal
    .-input-date-picker-modal-header
      cross-icon.icon(@click='closeDrawer')
      .-input-date-picker-modal-header-content
        .-input-date-picker-selected.-input-date-picker-selected-departure(
          :class='{ onSelect: selectDepature }'
        )
          p.-input-date-picker-selected-title {{ $t("日付") }}
          .top-text
            span-bold.-input-date-picker-selected-date {{ formatChange(selectingStartDate) }}
            .week-text {{ day }}
          hr.sectionLast(v-if='selectedFlag')
    .-input-date-picker-content
      .-date-picker-body(v-for='month in calendarData')
        .-date-picker-month {{ month.yearMonth }}
        .-date-picker-dates
          .-date-picker-date(
            v-for='day in week',
            :class='holidayColorAdd(day)'
          ) {{ day }}
          .-date-picker-date(
            v-for='(date, index) in month.dates',
            :class='[{ onSelectDeparture: date.date === selectingStartMetaDate, hoverDesgin: !disabledCheck(date.date) }]',
            :style='[dateColorStyle(date), parseInt(date.displayValue) === 1 ? { gridColumn: `${date.day + 1}/${date.day + 2}` } : ""]',
            @click='onClickHandler(date)',
            :disabled='disabledCheck(date.date)'
          ) {{ date.displayValue }}
  template(v-slot:footer)
    .-date-picker-footer
      .-footer-button
        CTA-button-long(
          text='完了',
          type='secondary',
          fontSize='large',
          @click='updateDates'
        )
</template>
<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import cloneDeep from 'lodash/cloneDeep'
import { Prop, Component, Emit, Watch } from 'nuxt-property-decorator'
import { format } from 'date-fns'
import ja from 'date-fns/locale/ja'
import { ModelTypes } from '../../../types/model'
import BaseDrawer from '~/components/atoms/drawers/BaseDrawer.vue'
import CTAButtonLong from '~/components/atoms/button/CTAButtonLong.vue'
import CrossIcon from '~/assets/icon/modal-close.svg'
import { SpanBold, ParagraphBold } from '~/components/atoms/typography'
@Component({
  components: {
    BaseDrawer,
    CTAButtonLong,
    CrossIcon,
    SpanBold,
    ParagraphBold
  },
  methods: {
    cloneDeep
  }
})
export default class Datepicker extends Vue {
  @Prop() selectedStartDate!: string
  @Prop() isShow!: boolean
  selectingStartDate = ''
  selectingStartMetaDate = ''
  selectingSend = ''
  selectDepature = true
  selectedFlag = false
  private week = ['日', '月', '火', '水', '木', '金', '土']
  private day = ''
  mounted() {
    this.selectingStartDate = this.viewDate
    this.selectingStartMetaDate = this.selectedStartDate
  }

  get viewDate() {
    return this.selectedStartDate ? format(new Date(this.selectedStartDate), 'MM/dd(eee)', { locale: ja }) : ''
  }

  @Emit()
  updateDates() {
    return {
      startDate: this.selectingStartDate,
      metaDate: this.selectingStartMetaDate
    }
  }

  @Emit('close')
  closeDrawer() {
    this.watchDate()
    // 親に伝える
  }

  get inDate() {
    return this.selectingStartDate
  }

  @Watch('inDate')
  changeDate() {
    this.selectedFlag = true
  }

  @Watch('selectedStartDate')
  watchDate() {
    this.selectingStartMetaDate = this.selectedStartDate
    this.selectingStartDate = this.viewDate
  }

  /**
   * カレンダー表示用のデータの作成 (mounted)
   */
  get calendarData() {
    return [...Array(4).keys()].map((a) => {
      const startDate = moment().add(a, 'month').startOf('month')
      const endDate = moment().add(a, 'month').endOf('month')
      const days = moment(endDate).diff(startDate, 'days') + 1
      const datesInfo: ModelTypes.DateRTNInfo[] = [...Array(days).keys()].map((date) => {
        const d = startDate.clone().add(date, 'days')
        return {
          date: d.locale('ja').format('YYYY-MM-DD'),
          dates: d.locale('ja').format('MM/DD(dd)'),
          day: d.day(),
          displayValue: d.format('D')
        }
      })
      return {
        yearMonth: this.getyearMonth(startDate),
        dates: datesInfo
      }
    })
  }

  /**
   *  日付を選択時の動き
   *  Google Flightに寄せる.
   */
  onClickHandler(date: ModelTypes.DateRTNInfo): void {
    if (!this.disabledCheck(date.date)) {
      if (this.selectDepature) {
        this.selectingStartDate = date.dates
        this.selectingStartMetaDate = date.date
      } else if (moment(date.date, 'YYYY-MM-DD').isBefore(this.selectingStartDate)) {
        this.selectingStartDate = date.dates
        this.selectingStartMetaDate = date.date
        this.selectDepature = !this.selectDepature
      } else {
        //
      }
    }
  }

  /**
   *  選択可能かどうかの確認
   */
  disabledCheck(date: string): boolean {
    return moment(date, 'YYYY-MM-DD').isBefore(moment().format('YYYY-MM-DD'))
  }

  getyearMonth(startDate) {
    return startDate.format('M月 YYYY年')
  }

  /**
   *  日付のスタイル
   */
  dateColorStyle(date: ModelTypes.DateRTNInfo): object {
    return this.disabledCheck(date.date)
      ? { color: '#a6a6a6' }
      : date.day === 0
      ? { color: '#ff1d1c' }
      : date.day === 6
      ? { color: '#1c5db5' }
      : {}
  }

  holidayColorAdd(day) {
    if (day === '土') {
      return 'saturday'
    } else if (day === '日') {
      return 'sunday'
    } else {
      return ''
    }
  }

  formatChange(date: string) {
    this.day = date.slice(-3)
    const result = date.replace(this.day, '').replace('/', '月') + '日'
    if (result.charAt(0) === '0') {
      return result.slice(1)
    } else {
      return result
    }
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
    z-index: 1
    top: 0%
    right: 0
    width: 100%
    height: 150px
    padding: 16px 16px 0
    display: grid
    grid-template-columns: repeat(8, 1fr)
    grid-gap: 8px
    background-color: $white
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.15)
    .icon
      position: fixed
      right: 20px
      width: 20px
      fill: $dark_gray
      margin-left: auto
      margin-right: 0px
      &:hover
        cursor: pointer
    @media screen and (min-width: 768px)
      width: 675px !important
    .-input-date-picker-modal-header-content
      grid-column: 1/9
      padding-top: 50px
      display: grid
      grid-template-columns: repeat(8, 1fr)
      grid-gap: 8px
      .-input-date-picker-selected-departure
        grid-column: 1/5
        padding: 0 0 16px 0
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
          font-weight: bold
        .-input-date-picker-selected-date
          font-size: $font_size_large
        .sectionLast
          height: 3px
          background-color: #1c5db5
          margin-top: 28px
          width: 100%
        .notSelected
          color: $dark_gray
          font-size: $font_size_default_pc
        .-input-date-picker-selected-day
          font-size: $font_size_tiny
          color: $dark_gray
  .-input-date-picker-content
    grid-column: 1/5
    margin: 96px -16px 0
    padding: 0 16px
    overflow-y: auto
    .hoverDesgin:hover
      cursor: pointer
    .-date-picker-body
      padding: 16px 0
      .-date-picker-month
        margin-bottom: 16px
        color: $deep_black
      .-date-picker-dates
        display: grid
        grid-template-columns: repeat(7, 1fr)
        grid-gap: 0 4px
        justify-items: center
        .-date-picker-date
          font-size: $font_size_medium
          font-weight: bold
          padding: 16px 0
          width: 100%
          text-align: center
        .onSelectDeparture
          position: relative
          background-color: $sub_color
          color: $white !important
          font-size: $font_size_default_pc
          width: 55px
          @media screen and (max-width: 420px)
            width: 138%
        .onSelectDeparture:after
          position: absolute
          content: ""
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
    text-align: center
.saturday
  color: $sub_color
.sunday
  color: $error_color
.-input-date-picker-selected-title
  margin-left: 15px
.top-text
  display: flex
  margin-left: 15px
  .week-text
    margin-left: 10px
    padding-top: 8.5px
    color: $dark_gray
    font-size: 12px
    font-weight: bold
</style>
