<template lang="pug">
button(@click="click()" :class="[type, buttonThin]" :disabled='disabled').cta-button
  span-bold.mainfont(:fontSize='textSize') {{text}}
    paragraph.-price ¥{{$moneyFormat(Number(price))}}
</template>
<script lang="ts">
import Vue from 'vue'
import { Prop, Component, Emit } from 'nuxt-property-decorator'
import { Paragraph, SpanBold, Span } from '~/components/atoms/typography'

@Component({
  components: {
    Paragraph,
    SpanBold,
    Span
  }
})
export default class AmountButton extends Vue {
  @Prop() text!: string
  @Prop() price!: string
  @Prop({ default: 'primary' }) type?: string // デザインガイドラインに基づいたCTAボタンのパターンを選択する
  @Prop() fontSize?: string
  @Prop({ default: false }) thin?: boolean // ボタンの厚みを薄くする
  @Prop({ default: false }) disabled!: boolean

  get textSize() {
    if (this.fontSize) {
      return this.fontSize
    }
    return 'large'
  }

  get buttonThin() {
    return { thin: this.thin }
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
  max-width: 325px
  padding: 0px 0px
  text-align: center
  border-radius: 3px
  display: inline-block
  font-size: $font_size_large
  position: relative
  cursor: pointer
  .mainfont
    position: absolute
    top: 15%
    font-size: 18px
    left: 0
    right: 0
    margin: auto
  .-price
    font-size: 10px
    position: absolute
    top: 100%
    width: 100%
    right: 0
    &:disabled
      color: white
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
  &:disabled
    pointer-events: none
    background-color: $gray
    border-color: $gray
    span
      color: $white
    &:hover
      cursor: not-allowed
    .-price
      color: white
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
</style>
