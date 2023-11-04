<template lang="pug">
button.cta-button(
  @click='click()',
  :class='[type, buttonThin]',
  :style='"border-radius:" + radius',
  :disabled='ComingSoon'
)
  #parenttext(
    v-if='ComingSoon',
    @mouseover='colorChange()',
    @mouseout='hoverOut()'
  )
    span-bold#childtext1(:fontSize='textSize') {{ text }}
    Span#childtext2(fontSize='small', :color='color') Coming Soon!
  #parenttext(v-else, @mouseover='colorChange()', @mouseout='hoverOut()')
    span-bold.parenttexts(:fontSize='textSize', :color='color') {{ text }}
      check-icon.checkicon(v-if='CheckIcon')
</template>
<script lang="ts">
import Vue from 'vue'
import { Prop, Component, Emit } from 'nuxt-property-decorator'
import { Paragraph, SpanBold, Span } from '~/components/atoms/typography'
import CheckIcon from '~/assets/icon/checkmark.svg'
@Component({
  components: {
    Paragraph,
    SpanBold,
    Span,
    CheckIcon
  }
})
export default class CTAColorButton extends Vue {
  @Prop() text!: string
  @Prop() color!: string
  @Prop({ default: 'primary' }) type?: string // デザインガイドラインに基づいたCTAボタンのパターンを選択する
  @Prop() fontSize?: string
  @Prop({ default: false }) thin?: boolean // ボタンの厚みを薄くする
  @Prop() radius!: string
  @Prop({ default: false }) ComingSoon?: boolean
  @Prop({ default: false }) CheckIcon?: boolean
  get textSize() {
    if (this.fontSize) {
      return this.fontSize
    }
    return 'large'
  }

  get buttonThin() {
    return { thin: this.thin }
  }

  colorChange() {
    this.$emit('my-hover')
  }

  hoverOut() {
    this.$emit('hover-out')
  }

  @Emit()
  click(): void {
    // 親コンポーネントにクリックイベントを通知するだけ
  }
}
</script>
<style lang="sass" scoped>
.cta-button
  width: 100%
  text-align: center
  display: inline-block
  position: relative
  cursor: pointer
  @include sp_view
    max-width: none
  &.primary
    background-color: $accent_color
    border: 1px solid $accent_color
    @include pc_view
      &:hover
        background-color: $accent_color_hover
        border-color: $accent_color_hover
      &:active
        background-color: $accent_color
        border-color: $accent_color
    @include sp_view
      &:active
        background-color: $accent_color_hover
        border-color: $accent_color_hover
  &.secondary
    background-color: $main_color
    border: 1px solid $main_color
    span
      color: $white
    @include pc_view
      &:hover
        background-color: $main_color_hover
        border-color: $main_color_hover
      &:active
        background-color: $main_color
        border-color: $main_color
    @include sp_view
      &:active
        background-color: $main_color_hover
        border-color: $main_color_hover
  &.white
    background-color: $white
    border: 1px solid $gray
    @include pc_view
      &:active
        background-color: $white
        border-color: $gray
    @include sp_view
      &:active
        background-color: $white
        border-color: $gray
  &:disabled
    pointer-events: none
    background-color: $gray
    border-color: $gray
    span
      color: $white
    &:hover
      cursor: not-allowed
  &.primary_sub,
  &.secondary_sub
    background-color: inherit
    &:disabled
      border: 1px solid $gray
      span
        color: $dark_gray
  &.primary_sub
    border: 1px solid $accent_color
    span
      color: $accent_color
    @include pc_view
      &:hover
        border-color: $accent_color_hover
        span
          color: $accent_color_hover
      &:active
        border: 1px solid $accent_color
        span
          color: $accent_color
    @include sp_view
      &:active
        border-color: $main_color_hover
        span
          color: $main_color_hover
  &.secondary_sub
    border: 1px solid $main_color
    span
      color: $main_color
    @include pc_view
      &:hover
        border-color: $main_color_hover
        span
          color: $main_color_hover
      &:active
        border: 1px solid $main_color
        span
          color: $main_color
    @include sp_view
      &:active
        border-color: $main_color_hover
        span
          color: $main_color_hover
  &.thin
    padding: 8px
  #parenttext
    position: relative
    .parenttexts
      position: relative
      .checkicon
        position: absolute
        fill: #ffc11c
        top: -70%
        left: -20px
        width: 18px
        @include pc_view
          fill: #ffc11c
          top: -55%
          left: -25px
          width: 22px
    #childtext1
      position: absolute
      top: -15px
      left: 0
      right: 0
      color: #a6a6a6
    #childtext2
      position: absolute
      top: 1px
      left: 0
      right: 0
      margin: 0 auto
      color: #a6a6a6
      font-size: 10px
</style>
