<template lang="pug">
.time-button
  .time-button-time(:class='{ inactive: inactive || isLoading }')
    paragraph-bold.time-button-time__title(
      color='dark_gray',
      fontSize='tiny',
      lineHeight='1'
    ) 時間
    .time-button-time-content
      clock-icon.time-button-time-content__icon
      select.time-button-time-content__text(
        :disabled='disabled',
        @change='changeTime($event.target.value)',
        @input='$emit("input", $event)',
        @focus='$emit("focus", $event)',
        @blur='$emit("blur", $event)'
      )
        option(v-if='isLoading || disabled', value='')
        option(
          v-else,
          v-for='(item, index) in options',
          :label='item',
          :key='index',
          :selected='nextTime === item'
        ) {{ item }}
</template>

<script lang="ts">
import { Component, Emit, Vue, Prop } from 'nuxt-property-decorator'
import { Paragraph, ParagraphBold, Span, SpanBold } from '~/components/atoms/typography'
import ClockIcon from '~/assets/icon/clock.svg'
@Component({
  components: {
    ClockIcon,
    Paragraph,
    ParagraphBold,
    Span,
    SpanBold
  }
})
export default class TimeButton extends Vue {
  @Prop() selectedTime!: string
  @Prop({ default: () => [] }) times?: string[]
  @Prop({ default: false }) inactive!: boolean
  @Prop({ default: false }) isLoading!: boolean
  @Prop({ default: false }) disabled!: boolean

  pickUp = this.nextTime
  timeLists = [
    '00:00',
    '00:30',
    '01:00',
    '01:30',
    '02:00',
    '02:30',
    '03:00',
    '03:30',
    '04:00',
    '04:30',
    '05:00',
    '05:30',
    '06:00',
    '06:30',
    '07:00',
    '07:30',
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
    '22:30',
    '23:00',
    '23:30'
  ]

  @Emit('commitmentClick')
  commitmentClick() {
    // こだわり検索押した
  }

  @Emit()
  changeTime(time: string) {
    return time
  }

  get options() {
    if (this.times && this.times.length) {
      return this.times
    } else if (this.disabled) {
      return []
    }
    return this.timeLists
  }

  get nextTime() {
    const selectedTime = this.selectedTime
    if (selectedTime === '' || null || undefined) {
      return '19:00'
    } else {
      return selectedTime
    }
  }
}
</script>

<style lang="sass" scoped>
.time-button
  .inactive
    opacity: 0.38
  &-time
    display: block
    &__title
      margin-bottom: 8px
    &-content
      display: flex
      align-items: center
      margin-left: 3px
      &__text
        cursor: pointer
        outline: none
        border: none
        background-color: transparent
        font-size: 16px
        color: #333
        font-family: HiraKakuPro-W3
        line-height: 1.6
        min-width: 48px
        &:disabled
          cursor: not-allowed
      &__icon
        width: 16px
        height: 16px
        margin-right: 6px
        fill: $dark_gray
</style>
