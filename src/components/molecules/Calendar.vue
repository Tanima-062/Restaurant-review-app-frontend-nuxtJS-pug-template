<template lang="pug">
  div.calendar-frame
    div.-title(v-html="setTitle")
    no-ssr
      v-date-picker#calendar(mode='range' tint-color='#1ba1ff' v-model='selectedDates' v-bind:available-dates='{ start: new Date(), end: null }' v-bind:theme-styles='themeStyles' v-bind:formats='formats' v-bind:pane-width='120' is-double-paned)
      input.-calendar-date(type="hidden" v-bind:value='getDate')
</template>

<script>
import Vue from 'vue'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
Vue.use(VCalendar, {
  locale: 'ja',
  datePickerUpdateOnInput: true,
  // popoverVisibility: 'visible',
  datePickerShowDayPopover: false
})
const nowday = new Date()
export default {
  components: {
    VCalendar
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      calendarIcon: '<span class="icon icon-calendar"></span>',
      formats: {
        title: 'YYYY MMMM',
        input: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'],
        data: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD']
      },
      selectedDates: {
        start: new Date(nowday.getTime() + 2 * 60 * 60 * 24 * 1000),
        end: new Date(nowday.getTime() + 5 * 60 * 60 * 24 * 1000)
      },
      attrs: [
        {
          key: 'today',
          highlight: {
            borderRadius: '0',
            backgroundColor: '#1ba1ff'
          },
          bar: {
            borderWidth: 0,
            backgroundColor: '#1ba1ff'
          }
        }
      ],
      themeStyles: {
        wrapper: {
          border: '1',
          borderRadius: '0',
          boxShadow: 'none'
        },
        header: {
          color: '#222',
          backgroundColor: 'transparent',
          borderColor: '#fff',
          borderWidth: '1px'
        },
        weekdays: {
          color: '#fff',
          backgroundColor: '#f4f4f4',
          borderColor: '#fff',
          borderWidth: '0 1px',
          padding: '5px 0 10px 0'
        },
        weeks: {
          border: '1px solid #fff'
        }
      }
    }
  },
  computed: {
    setTitle() {
      if (this.title === 'calendar') {
        return this.calendar_icon
      } else {
        return 'None'
      }
    },
    getDate() {
      const startYear = this.selectedDates.start.getFullYear()
      const startMonth = this.selectedDates.start.getMonth() + 1
      const startDay = this.selectedDates.start.getDate()
      const endYear = this.selectedDates.end.getFullYear()
      const endMonth = this.selectedDates.end.getMonth() + 1
      const endDay = this.selectedDates.end.getDate()
      const startDate = startYear + '-' + startMonth + '-' + startDay
      const endDate = endYear + '-' + endMonth + '-' + endDay
      const result = startDate + '_' + endDate
      return result
    }
  }
}
</script>

<style lang="sass">
@import "~/assets/sass/common.sass"
div#calendar
  float: left
  border: none
  z-index: 30
  transform: none !important
  transition-delay: 0s !important
  transition-duration: 0s !important
  transition-property: none !important
  opacity: 1 !important
  transition: none !important
  animation: none !important
  & input
    padding: 10px
    color: $black
    // border: 1px solid $light_gray
    // &:hover
    //   border: 1px solid $gray
  & .c
    &-header,-weeks
      background-color: $white !important
    &-weekdays
      background-color: $light_gray !important
    &-header,-weekdays
      border-left: none
      border-right: none
    &-arrow-layout
      border: 1px solid $light-gray
      border-radius: 40px !important
      &:hover
        border: 1px solid $gray
      & svg.svg-icon:hover
        opacity: 1 !important
        transform: none !important
    &-title
      cursor: default
      pointer-events: none
      &-popover
        width: 100%
        cursor: default
        pointer-events: none
      &-layout
        &-align
          &-center
            cursor: default
            pointer-events: none
    &-pane
      &-container
        background: $white
      &-div
        border-left: none !important
      &:first-of-type .c-header,:first-of-type .c-weekdays
        border-left: none
        border-right: none
      &:first-child .c-weeks
        border-right: none !important
.calendar-frame
  position: relative
  float: left
  width: 100% !important // 他社ツアー
  // height: 40px
  height: 52px !important // 他社ツアー
  & .-title
    float: left
    line-height: 40px
    margin: 0 10px 0 0
.popover
  &-container
    position: relative
    width: 100% !important // 他社ツアー
    height: 100% !important // 他社ツアー
    & input
      box-shadow: none !important
      height: 100% !important // 他社ツアー
  &-origin
    position: relative
    & .popover
      &-content
        border: none !important
        border-top: none !important
        &-wrapper
          padding: 20px !important
          background-color: $white
          border: 1px solid $light-gray
  &-content
    overflow-x: hidden
    &-wrapper
      position: absolute !important
      top: 0
      // left: -283px
      left: -278px // 他社ツアー
      border-top: none
      & > div
        border: none
div#calendar *
  border-radius: 0 !important
  box-shadow: none !important
  transform: none !important
  transition-delay: 0s !important
  transition-duration: 0s !important
  transition-property: none !important
  transition: none !important
  animation: none !important
// pc
@media screen and (min-width: 1025px)
  .calendar-frame
    width: 330px
    & .c
      &-pane
        width: 260px
        &-container
          & > .c-pane
            &:first-of-type
              margin-right: 20px
  .popover
    &-container
      width: 299px
      & input
        width: 100%
// tb
@media screen and (min-width: 769px) and (max-width: 1024px)
  div#calendar
    & .c
      &-pane
        width: 260px
        &-container
          & > .c-pane
            &:first-of-type
              margin-right: 20px
  .popover
    &-container
      float: right
      width: 100% !important
      & input
        width: 100% !important
    &-content
      &-wrapper
        // left: calc(100vw - 1050px)
        left: calc(100vw - 614px) // 他社ツアー
  .calendar-frame
    width: calc(100% - 500px)
// sp
@media screen and (min-width: 320px) and (max-width: 768px)
  div#calendar
    & .c
      &-weekdays
        width: 100%
      &-pane
        position: absolute
        min-width: 258px !important
        &-container
          width: 100%
          & > .c-pane
            width: 100%
            &:first-of-type
              top: 0
              margin-right: 0
              padding-bottom: 10px
              border-bottom: 1px solid $light_gray
            &:last-of-type
              top: 320px
        &-div
          display: none
  .popover
    &-container
      width: calc(100% - 38px)
    &-content
      height: 636px
      &-wrapper
        // top: -121px
        top: 0 // 他社ツアー
        // left: -47px
        left: 0 // 他社ツアー
        // width: calc(100vw - 20px)
        width: calc(100vw - 32px)
        height: calc(100vh - 100px)
        overflow-y: auto
  .calendar-frame
    clear: left
    margin-top: 20px
    width: 100%
    & input
      width: 100%
</style>
