<template lang="pug">
div(ref="tooltip").tooltip
  button(ref="buttonTooltip" @mousedown.prevent="toggleTooltip($event)" @touchstart.prevent="toggleTooltip($event)" @blur="closeTooltip").-tooltip-button
    info-button-fill.-icon
  transition(name="fade" @enter="enterTooltip")
    div(v-show="isShowTooltip" :class="[verticalClass, horizontalClass]").-content
      Span(fontSize="tiny" color="white" lineHeight="unset") {{content}}
      div(v-if="$slots.content")
        slot(name="content")
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Span, Paragraph } from '~/components/atoms/typography'
import InfoButtonFill from '~/assets/icon/info-button-fill.svg'

@Component({
  components: {
    Span,
    Paragraph,
    InfoButtonFill
  }
})
export default class Tooltip extends Vue {
  @Prop() content!: string
  private isShowTooltip = false
  private posClickX = 0
  private posClickY = 0
  private verticalClass = 'is-top'
  private horizontalClass = 'is-center'
  toggleTooltip(event): void {
    if ('touches' in event) {
      this.posClickY = Math.floor(event.touches[0].clientY)
    } else {
      this.posClickY = event.clientY
    }
    this.isShowTooltip = !this.isShowTooltip
    if (this.isShowTooltip) {
      const buttonTooltip = this.$refs.buttonTooltip
      if (!(buttonTooltip instanceof HTMLElement)) {
        return
      }
      buttonTooltip.focus()
    }
  }

  enterTooltip(e): void {
    const elTooltip = this.$refs.tooltip
    if (!(elTooltip instanceof HTMLElement)) {
      return
    }
    // 親要素に対するボタンの位置 + paddingのサイズ
    this.posClickX = elTooltip.offsetLeft + 16
    const elHalfWidth = e.offsetWidth / 2
    this.verticalClass = this.posClickY > e.offsetHeight ? 'is-top' : 'is-bottom'
    // 真ん中に置くと左がはみ出す場合
    if (this.posClickX - elHalfWidth < 0) {
      this.horizontalClass = 'is-left'
    } else {
      this.horizontalClass = 'is-center'
    }
  }

  closeTooltip(): void {
    this.isShowTooltip = false
  }
}
</script>
<style lang="sass" scoped>
.tooltip
  position: relative
  display: inline-block
  margin-left: 8px
  vertical-align: middle
  .-tooltip-button
    border: none
    background-color: transparent
    cursor: pointer
    border: none
    width: 36px
    height: 36px
    text-align: center
    & > svg
      fill: $main_color
    &:focus
      outline: none
      & > svg
        fill: $main_color
    &:hover
      & > svg
        fill: $main_color_hover
    &:active
      border-color: $main_color
      & > svg
        fill: $main_color
  .-icon
    width: 20px
    height: 20px
  .-content
    position: absolute
    width: 300px
    line-height: 16px
    padding: 8px
    border-radius: 3px
    white-space: pre-wrap
    color: $white
    background-color: $black
    z-index: 5
    @include sp_view
      line-height: 1.2
    &:before
      content: ''
      display: block
      position: absolute
      border: 10px solid transparent
      pointer-events: none
    &.is-top
      bottom: 150%
      &:before
        bottom: -20px
        border-top-color: $black
    &.is-bottom
      top: 120%
      &:before
        top: -20px
        border-bottom-color: $black
    &.is-left
      left: -50px
      &:before
        left: 50px
    &.is-center
      left: 50%
      margin-left: -150px
      &:before
        left: 50%
        margin-left: -10px
    &.is-right
      right: -50px
      &:before
        right: 50px
.fade-enter-active, .fade-leave-active
  transition: opacity .5s
.fade-enter, .fade-leave-to
  opacity: 0
</style>
