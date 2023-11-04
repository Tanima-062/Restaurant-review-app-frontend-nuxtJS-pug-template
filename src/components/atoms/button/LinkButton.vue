<template lang="pug">
a.link-button(
  :href="href"
  @click='click()',
  :class='[type, buttonThin]',
  :disabled='disabled',
  :target="isShowNewTap ??'_blank'",
  :rel="isShowNewTap ?? 'noopener noreferrer'"
)
  Span(:fontSize='textSize', :lineHeight='lineGap') {{ text }}
</template>
<script lang="ts">
import Vue from 'vue'
import { Prop, Component, Emit } from 'nuxt-property-decorator'
import { Span } from '~/components/atoms/typography'

@Component({
  components: {
    Span
  }
})
export default class LinkButton extends Vue {
  @Prop() text!: string
  @Prop() href!: string
  @Prop({ default: false }) isShowNewTap?: boolean
  @Prop({ default: 'primary' }) type?: string // デザインガイドラインに基づいたlinkボタンのパターンを選択する
  @Prop() fontSize?: string
  @Prop() lineHeight?: string
  @Prop({ default: false }) thin?: boolean // ボタンの厚みを薄くする
  @Prop({ default: false }) disabled?: boolean

  get textSize() {
    if (this.fontSize) {
      return this.fontSize
    }
    return 'large'
  }

  get lineGap() {
    if (this.lineHeight) {
      return this.lineHeight
    }
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
.link-button
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  height: 52px
  padding: 16px 8px
  text-align: center
  border-radius: 3px
  font-size: $font_size_large
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
</style>
