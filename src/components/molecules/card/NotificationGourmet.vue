<template lang="pug">
  div.notification(:class="type")
    div.-icon-wrapper
      component(:is="icon" class="-icon")
    div.-text-wrapper
      Span-bold(fontSize="base").-title {{title}}
      Span(fontSize="small").-text {{text}}
      slot
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Warning from '~/assets/icon/warning.svg'
import Info from '~/assets/icon/info-button-fill.svg'
import Gourmet from '~/assets/icon/spoon-knife.svg'
import { SpanBold, Span } from '~/components/atoms/typography/'

@Component({
  components: {
    Span,
    Warning,
    Info,
    Gourmet,
    SpanBold
  }
})
export default class NotificationGourmet extends Vue {
  @Prop() title!: string
  @Prop() text!: string
  @Prop() type!: 'success' | 'message' | 'caution' | 'error'
  @Prop() icon!: 'warning' | 'info' | 'gourmet'
}
</script>
<style lang="sass" scoped>
.notification
  border-radius: 3px
  padding: 16px
  display: grid
  grid-template-columns: 18px 1fr
  .-icon-wrapper
    display: flex
    align-items: center
  .-icon
    height: 18px
    width: 18px
  .-text-wrapper
    margin-left: 8px
    span
      display: block
  &.message
    background-color: $light_gray
    .-icon
      fill: $black
    .-title
      color: $black
  &.error
    background-color: $warning_color
    .-icon
      fill: $error_color
    .-title
      color: $error_color
  &.success
    background-color: $success_color
    .-icon
      fill: $accent_sub_color
    .-title
      color: $accent_sub_color
  &.caution
    background-color: $notice_color
    .-icon
      fill: $sub_color
    .-title
      color: $sub_color
</style>
