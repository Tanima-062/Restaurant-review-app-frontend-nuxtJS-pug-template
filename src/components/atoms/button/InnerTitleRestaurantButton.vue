<template lang="pug">
button.inner-title-button(
  @click='click',
  :disabled='disabled',
  :class='{ disabled: disabled }'
)
  span-bold.-inner-title(fontSize='small', color='dark_gray') {{ title }}
  Span.-inner-dai(fontSize='large', color='dark_gray') {{ value }}
  slot
</template>
<script lang="ts">
import { Vue, Prop, Component, Emit } from 'nuxt-property-decorator'
import { SpanBold, Span } from '~/components/atoms/typography'
@Component({
  components: {
    SpanBold,
    Span
  }
})
export default class InnerTitleRestaurantButton extends Vue {
  @Prop() title!: string
  @Prop() value!: string
  @Prop() disabled?: boolean
  @Emit()
  click(): void {
    // 親コンポーネントにクリックイベントを通知するだけ
  }
}
</script>
<style lang="sass" scoped>
.inner-title-button
  border: none
  border-bottom: 1px solid rgba(0, 0, 0, 0.3)
  background-color: $white
  text-align: left
  width: 50%
  &:focus
    outline: none
  &:hover
    cursor: pointer
  &.disabled
    background-color: $gray
    span
      color: $dark_gray
  .-inner-title
    color: $dark_gray
    display: block
    line-height: 1
    font-size: 10px
  .-inner-dai
    display: block
    font-size: 15px
    line-height: 2.0
    padding-top: 0px
    padding-left: 26px
    color: black
    font-family: HiraKakuPro-W3
</style>
