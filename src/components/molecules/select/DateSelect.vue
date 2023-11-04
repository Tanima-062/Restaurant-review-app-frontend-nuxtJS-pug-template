<template lang="pug">
.date-select
  paragraph-bold.title(
    color='dark_gray',
    fontSize='tiny',
    lineHeight='1',
    :class='{ disabled: disabled }'
  ) 日付
  date-picker(
    :is-show='isDatepickerShow',
    :selected-start-date='selectedDate',
    @update-dates='changeDate',
    @close='closeDatepicker'
  )
  .content(@click='openDatepickerEvent', :class='{ disabled: disabled }')
    calendar-icon.icon
    paragraph.text {{ viewDate }}
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'
import { format } from 'date-fns'
import ja from 'date-fns/locale/ja'
import { Paragraph, ParagraphBold } from '~/components/atoms/typography'
import CalendarIcon from '~/assets/icon/calendar.svg'
import DatePicker from '~/components/atoms/form/DatePicker.vue'

@Component({
  components: {
    CalendarIcon,
    DatePicker,
    Paragraph,
    ParagraphBold
  }
})
export default class DateSelect extends Vue {
  @Prop() selectedDate!: string
  @Prop({ default: false }) disabled!: boolean

  isDatepickerShow = false
  @Emit()
  changeDate({ metaDate }) {
    this.closeDatepicker()
    return metaDate
  }

  get viewDate() {
    return this.selectedDate ? format(new Date(this.selectedDate), 'MM/dd(eee)', { locale: ja }) : ''
  }

  openDatepickerEvent() {
    this.isDatepickerShow = true
  }

  closeDatepicker() {
    this.isDatepickerShow = false
  }
}
</script>
<style lang="sass" scoped>
.date-select
  .title
    margin-bottom: 8px
  .content
    margin-left: 3px
    align-items: center
    display: grid
    grid-template-columns: max-content max-content
    gap: 10px
    &:hover
      cursor: pointer
    .icon
      width: 16px
      height: 16px
      fill: $dark_gray
    .text
      font-size: 16px
      min-width: 92px
.disabled
  opacity: 0.38
</style>
