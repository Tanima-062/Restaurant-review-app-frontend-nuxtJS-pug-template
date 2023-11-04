<template lang="pug">
div.step-bar(:class="{'-with-back-btn': backUrl}")
  div.-step(:class="`-step-$1`")
    div.-number-circle(:class="getStatus(1)")
      check-icon.-checkicon
    div.-label(:class="getStatus(1)") 注文確認中
    div.progress
      hr.progressLine.-progressbar(:class="[1.5 < active ? 'nowprocess' : '']")
      hr.progressLine.-progressbar2(:class="[2 < active ? 'nowprocess' : '']")
  div.-step(:class="`-step-$2`")
    div.-less-half-bar(:class="[1.5 < active ? 'finish' : '']")
    div.-non-circle(:class="getStatus(2)")
      div(v-if="2<active")
        img(src='~@/assets/gif/cooking.gif' alt='スカイチケット注文ステップ').-cookicon
      div(v-else)
        cooking-icon.-cookicon
    div.-label(:class="getStatus(2)") 注文完了＆料理中
    div.progress2
      hr.progressLine.-progressbar(:class="[2.5 < active ? 'nowprocess' : '']")
      hr.progressLine.-progressbar2(:class="[3 < active ? 'nowprocess' : '']")
  div.-step(:class="`-step-$3`")
    div.-less-half-bar(:class="[2.5 < active ? 'finish' : '']")
    div.-number-circleyellow(:class="getStatus(3)")
      counter-icon.-countericon
    div.-labelyellow(:class="getStatus(3)") 受取可能
    div.-more-half-bar
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import CookingIcon from '~/assets/icon/gray_cooking.svg'
import CounterIcon from '~/assets/icon/gray_counter.svg'
import MizutamaIcon from '~/assets/icon/mizutama.svg'
import CheckIcon from '~/assets/icon/checkmark.svg'
type Step = {
  title: string
  index: number
}
@Component({
  components: {
    CookingIcon,
    CounterIcon,
    CheckIcon,
    MizutamaIcon
  }
})
export default class RestaurantStepBar extends Vue {
  @Prop() active!: 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 // bar部分のみx.5に対応。label部分は未実装。
  @Prop() stepList!: Step[]
  @Prop() backUrl?: string

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
$circle_diameter: 40px
$label_height: 20px
$bar_height: 8px
$back_btn-size: 20px
.step-bar
  min-width: 318px
  max-width: 319px
  margin: 0 auto
  display: grid
  grid-template-columns: 0.8fr 2fr 0.8fr
  grid-template-areas: "one two three"
  .progressLine
    width: 100%
    border-width: 0 0 5px
    border-style: dotted
    color: #e4e4e4
  .-step
    display: grid
    grid-template-columns: 1fr $circle_diameter  1fr
    @include sp_view
      &-1
        grid-area: one
      &-2
        grid-area: two
      &-3
        grid-area: three
    .progress
      position: relative
      .-progressbar
        position: absolute
        width: 25px
        top: 20%
        left: 50%
        &.nowprocess
          color: #1ba1ff
      .-progressbar2
        position: absolute
        width: 25px
        top: 20%
        left: 250%
        &.nowprocess
          color: #1ba1ff
    .progress2
      position: relative
      .-progressbar
        position: absolute
        width: 25px
        top: 20%
        left: 20%
        &.nowprocess
          color: #1ba1ff
      .-progressbar2
        position: absolute
        width: 25px
        top: 20%
        left: 63%
        &.nowprocess
          color: #1ba1ff
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
    position: relative
    &.active, &.finish
      background-color: #1ba1ff
      color: $white
      border-color: #1ba1ff
    .-checkicon
      position: absolute
      top: 10%
      left: 30%
      width: 19px
      fill: white
  .-number-circleyellow
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
    position: relative
    &.active, &.finish
      background-color: #ffc11c
      color: $white
      border-color: #ffc11c
      .-countericon
        fill: white
    .-countericon
      position: absolute
      top: 20%
      left: 20%
      width: 24px
      fill: #e4e4e4
  .-non-circle
    width: $circle_diameter
    height: $circle_diameter
    position: relative
    .-cookicon
      position: absolute
      top: 0%
      left: -20%
      width: 52px
  .-label
    grid-column: 1/4
    grid-row: 2/3
    font-weight: bold
    color: $dark_gray
    font-size: $font_size_tiny
    text-align: center
    &.active, &.finish
      color: #1ba1ff
  .-labelyellow
    grid-column: 1/4
    grid-row: 2/3
    font-weight: bold
    color: $dark_gray
    font-size: $font_size_tiny
    text-align: center
    &.active, &.finish
      color: #ffc11c
  .-stepicon
    position: absolute
    top: 80%
    left: 30%
    width: 30px
    height: 80px
@include pc_view
  .step-bar
    max-width: 500px
    min-width: 320px
    margin: 0 auto
    display: grid
    grid-template-columns: 0.8fr 2fr 0.8fr
    grid-template-areas: "one two three"
    .progressLine
      width: 100%
      border-width: 0 0 5px
      border-style: dotted
      color: #e4e4e4
    .-step
      display: grid
      grid-template-columns: 1fr $circle_diameter  1fr
      @include sp_view
        &-1
          grid-area: one
        &-2
          grid-area: two
        &-3
          grid-area: three
      .progress
        position: relative
        .-progressbar
          position: absolute
          width: 60px
          top: 20%
          left: 50%
          &.nowprocess
            color: #1ba1ff
        .-progressbar2
          position: absolute
          width: 60px
          top: 20%
          left: 230%
          &.nowprocess
            color: #1ba1ff
      .progress2
        position: relative
        .-progressbar
          position: absolute
          width: 60px
          top: 20%
          left: 10%
          &.nowprocess
            color: #1ba1ff
        .-progressbar2
          position: absolute
          width: 60px
          top: 20%
          left: 66%
          &.nowprocess
            color: #1ba1ff
</style>
