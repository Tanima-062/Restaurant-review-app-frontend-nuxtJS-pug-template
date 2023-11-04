<template lang="pug">
button.inner-title-button(@click='click', :disabled='disabled', :class='{ disabled: disabled }')
  Span.-inner-title(fontSize='small', color='dark_gray') {{ title }}
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
export default class InnerTitleButton extends Vue {
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
  border-radius: 3px
  background-color: $white
  padding: 8px
  text-align: left
  width: 100%
  &:focus
    outline: none
  &.disabled
    background-color: $gray
    span
      color: $dark_gray
  .-inner-title
    color: $dark_gray
    display: block
    margin-top: 15px
    line-height: 1
  .-inner-dai
    display: block
    font-size: 18px
    line-height: 1
    padding-top: 5px
</style>
