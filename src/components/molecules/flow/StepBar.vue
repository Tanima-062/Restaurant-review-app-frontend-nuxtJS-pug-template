<template lang="pug">
.step-bar(:class='{ seatonly: isOnlySeat }')
  .-step(
    v-for='{ title, index } in stepList',
    :key='index',
    :class='`-step-${index}`'
  )
    .-less-half-bar(
      v-if='index !== 1',
      :class='[index - 0.5 < active ? "finish" : ""]'
    )
    .-number-circle(:class='getStatus(index)') {{ index }}
    .-label(:class='getStatus(index)') {{ title }}
    .-more-half-bar(
      v-if='index !== stepList.length',
      :class='getStatus(index + 0.5)'
    )
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Arrow from '~/assets/icon/arrow.svg'
type Step = {
  title: string
  index: number
}
@Component({
  components: {
    Arrow
  }
})
export default class StepBar extends Vue {
  @Prop() active!: 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 // bar部分のみx.5に対応。label部分は未実装。
  @Prop() stepList!: Step[]
  @Prop() backUrl?: string
  @Prop({ default: false }) isOnlySeat!: boolean

  getStatus(index: number): 'finish' | 'active' | '' {
    if (index < this.active) {
      return 'finish'
    } else if (index === this.active) {
      return 'active'
    } else {
      return ''
    }
  }
}
</script>

<style lang="sass" scoped>
$circle_diameter: 28px
$circle_diameter_pc: 40px
$label_height: 20px
$bar_height: 2px
$back_btn-size: 20px

.step-bar.seatonly
  display: grid
  grid-template-columns: 1fr 1fr 1fr
  grid-template-areas: "one two three"
.step-bar
  display: grid
  grid-template-columns: 1fr 1fr 1fr 1fr
  grid-template-areas: "one two three four"
  &.-with-back-btn
    @include pc_view
      grid-template-columns: $back_btn-size 1fr 1fr 1fr 1fr $back_btn-size
    @include sp_view
      grid-template-columns: 1fr 1fr 1fr 1fr
  .-back-button
    fill: $dark_gray
    width: $back_btn-size
    height: $back_btn-size
    transform: rotate(180deg)
    line-height: $back_btn-size
    position: relative
    top: 10px
    @include sp_view
      display: none
  .-step
    display: grid
    grid-template-columns: 1fr $circle_diameter 1fr // x.5に対応する時・・・1fr 1fr $circle_diameter 1fr 1fr 1fr ifr
    grid-template-rows: $circle_diameter $label_height
    @include pc_view
      grid-template-columns: 1fr $circle_diameter_pc 1fr // x.5に対応する時・・・1fr 1fr $circle_diameter_pc 1fr 1fr 1fr ifr
    grid-template-rows: $circle_diameter_pc $label_height
    @include sp_view
      &-1
        grid-area: one
      &-2
        grid-area: two
      &-3
        grid-area: three
      &-4
        grid-area: four
  .-number-circle
    width: $circle_diameter
    height: $circle_diameter
    line-height: $circle_diameter
    text-align: center
    border-radius: 50%
    background-color: $light_gray
    color: $dark_gray
    border-color: $light_gray
    grid-column: 2/3
    font-weight: bold
    @include pc_view
      width: $circle_diameter_pc
      height: $circle_diameter_pc
      line-height: $circle_diameter_pc
    &.active, &.finish
      background-color: $sub_color
      color: $white
      border-color: $sub_color
  .-less-half-bar
    grid-column: 1/2
  .-more-half-bar
    grid-column: 3/4
  .-less-half-bar, .-more-half-bar
    height: $bar_height
    background-color: $light_gray
    position: relative
    top: $circle_diameter / 2 - $bar_height / 2
    @include pc_view
      top: $circle_diameter_pc / 2 - $bar_height / 2
    &.active, &.finish
      background-color: $sub_color
  .-label
    grid-column: 1/4
    grid-row: 2/3
    font-weight: bold
    color: $dark_gray
    font-size: $font_size_tiny
    text-align: center
    &.active, &.finish
      color: $sub_color
</style>
