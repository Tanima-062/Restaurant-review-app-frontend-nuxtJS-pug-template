<template lang="pug">
.selectbox
  label
    paragraph-bold.underselect_selectlabel {{ text }}
  .select(v-if='text === "時間"')
    select.underselect.left(
      :value='nextTime',
      :class='{ border: border }',
      @change='changehour($event.target.value)',
      @input='$emit("input", $event)',
      @focus='$emit("focus", $event)',
      @blur='$emit("blur", $event)'
    )
      option(
        v-for='item in hourLists',
        :label='item',
        :key='item',
        :selected='pickUp === item'
      ) {{ item }}
    paragraph.underbar :
    select.underselect.right(
      :value='getMin',
      :class='{ border: border }',
      @change='changemin($event.target.value)',
      @input='$emit("input", $event)',
      @focus='$emit("focus", $event)',
      @blur='$emit("blur", $event)'
    )
      option(
        v-for='item in minuteList',
        :value='item',
        :label='item',
        :key='item.id'
      ) {{ item }}
  .select(v-if='text === "人数"')
    select.underselect(
      value='',
      :class='{ border: border }',
      @change='changepeople($event.target.value)',
      @input='$emit("input", $event)',
      @focus='$emit("focus", $event)',
      @blur='$emit("blur", $event)'
    )
      option(v-for='n in 10', :label='n + "名"', :key='n', :selected='n') {{ n }}
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'
import { format, add, eachHourOfInterval, setMinutes } from 'date-fns'
import ja from 'date-fns/locale/ja'
import { Paragraph, ParagraphBold, Span, SpanBold } from '~/components/atoms/typography'
@Component({
  components: {
    Paragraph,
    ParagraphBold,
    Span,
    SpanBold
  }
})
export default class SelectResaturant extends Vue {
  hours!: string
  pickUpMin = '00'
  pickUp = this.nextTime
  @Prop() text!: string
  @Prop() value
  @Prop({ default: true }) border?: boolean
  minuteList = ['00', '15', '30', '45']
  @Emit()
  changehour(changedValue) {
    return changedValue
  }

  @Emit()
  changemin(changedValue) {
    return changedValue
  }

  @Emit()
  changepeople(changedValue) {
    return changedValue
  }

  get nextTime() {
    const selectedHour = this.$store.getters['modules/date/getHour']
    if (selectedHour === '' || null || undefined) {
      const data = add(new Date(), { hours: 2 })
      const newdata = setMinutes(data, 0)
      return format(newdata, 'HH', { locale: ja })
    } else {
      return selectedHour
    }
  }

  get getMin() {
    const selectedMin = this.$store.getters['modules/date/getMin']
    if (selectedMin === '' || null || undefined) {
      return '00'
    } else {
      return selectedMin
    }
  }

  get hourLists() {
    const lists: string[] = []
    const list = eachHourOfInterval({
      start: new Date(),
      end: add(new Date(), { hours: 23 })
    })
    for (let i = 0; i < list.length; i++) {
      const item = format(list[i], 'HH', { locale: ja })
      lists.push(item)
    }
    return lists
  }

  hourchange(val) {
    this.pickUp = val
  }

  minutechange(val) {
    this.pickUpMin = val
  }
}
</script>

<style lang="sass" scoped>
.selectbox
  width: 100%
  .select
    display: flex
  .underselect
    outline: none
    background-color: transparent
    width: 60px
    padding: 0px 0px 4px 26px
    font-size: 15px
    border-radius: 0px
    border: none
    border-bottom: 1px solid rgba(0, 0, 0, 0.3)
    font-family: HiraKakuPro-W3
    line-height: 1.7
    color: black
  .right
    padding: 0px 10px 4px 7px
    width: 130px
  .left
    padding: 0px 10px 4px 30px
  .underbar
    border-bottom: 1px solid rgba(0, 0, 0, 0.3)
  .underselect_selectlabel
    display: block
    font-size: 10px
    color: $dark_gray
    line-height: 1.5
    padding-top: 0px
@include pc_view
  .selectbox
    .underselect
      outline: none
      background-color: transparent
      width: 55px
      padding: 0px 10px 4px 26px
      font-size: 15px
      border-radius: 0px
      border: none
      border-bottom: 1px solid rgba(0, 0, 0, 0.3)
      font-family: HiraKakuPro-W3
      line-height: 1.7
      color: black
      &:hover
        cursor: pointer
    .right
      padding: 0px 10px 4px 7px
    .underbar
      border-bottom: 1px solid rgba(0, 0, 0, 0.3)
    .underselect_selectlabel
      display: block
      font-size: 10px
      color: $dark_gray
      line-height: 1.5
      padding-top: 0px
</style>
