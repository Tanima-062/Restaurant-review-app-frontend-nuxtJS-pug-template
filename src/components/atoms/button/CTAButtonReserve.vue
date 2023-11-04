<template lang="pug">
button.cta-button(
  @click='click()',
  :class='[type, buttonThin]',
  :disabled='disabled'
)
  span-bold.fs-18 {{ text }}
</template>
<script lang="ts">
import Vue from 'vue'
import { Prop, Component, Emit } from 'nuxt-property-decorator'
import { SpanBold } from '~/components/atoms/typography'

@Component({
  components: {
    SpanBold
  }
})
export default class CTAButtonReserve extends Vue {
  @Prop() text!: string
  @Prop() price!: number
  @Prop({ default: 'primary' }) type?: string // デザインガイドラインに基づいたCTAボタンのパターンを選択する
  @Prop() fontSize?: string
  @Prop({ default: false }) thin?: boolean // ボタンの厚みを薄くする
  @Prop({ default: false }) disabled?: boolean

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
  padding: 10px 6px
  text-align: center
  border-radius: 3px
  background-color: white
  display: inline-block
  position: relative
  cursor: pointer
  border: 1.5px $accent_color solid
  &:disabled
    pointer-events: none
    background-color: $gray
    border-color: $gray
    span
      color: $white
      &:hover
        cursor: not-allowed
.cta-button:hover
  opacity: 0.7
.fs-18
  color: $accent_color !important
  font-size: 24px !important
</style>
