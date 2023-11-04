<template lang="pug">
transition(name='notification-pop')
  .notification-pop(v-if='isShown', :class='[`-${type}`, "-" + position]')
    .boss(:class='[`-${type}`, "-" + position]')
      component.-icon.FirstIcons(:is='icon')
      paragraph-bold.paragrahs
        slot
    .button-wrapper
      button.-pop-close-button(@click='closePop')
        cross.-icon
</template>

<script lang="ts">
import { Component, Prop, Emit, Watch, Vue } from 'nuxt-property-decorator'
import { ParagraphBold } from '~/components/atoms/typography/'
import Cross from '~/assets/icon/modal-close.svg'
import Warning from '~/assets/icon/warning.svg'
import Info from '~/assets/icon/info-button-fill.svg'

@Component({
  components: {
    ParagraphBold,
    Cross,
    Warning,
    Info
  }
})
export default class NotificationPop extends Vue {
  @Prop() isShown!: boolean
  @Prop({ default: true }) isAutoClose!: boolean
  @Prop() type!: 'message' | 'success' | 'caution' | 'error' // 他に必要な場合はunionタイプで追加
  @Prop({ default: 'center' }) position?: 'center' | 'right' // PCでの表示位置を指定可能
  @Prop() icon!: 'warning' | 'info' | 'gourmet'

  @Watch('isShown')
  autoClose(): void {
    if (this.isAutoClose) {
      const changeShown = () => {
        this.closePop()
      }
      setTimeout(changeShown, 4000)
    }
  }

  @Emit('closePop')
  closePop() {
    // 親に伝えるだけ
  }
}
</script>

<style lang="sass" scoped>
$close-button-size: 20px
.notification-pop
  display: flex
  justify-content: space-between
  align-items: center
  padding: 16px
  border-radius: 3px
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)
  white-space: pre-line
  position: fixed
  top: 16px
  left: 16px
  right: 16px
  z-index: 10
  .button-wrapper
    align-self: flex-start
    .-pop-close-button
      cursor: pointer
      background: none
      border: none
      min-width: 36px
      min-height: 36px
      line-height: 0
      padding: 8px
      margin-right: -8px
      margin-left: 8px
      color: $dark_gray
      .-icon
        fill: $dark_gray
        width: 20px
        height: 20px
  @include pc_view
    width: 50%
    &.-center
      right: 0
      left: 0
      margin: 0 auto
    &.-right
      right: 16px
      left: auto
  .boss
    display: grid
    align-items: center
    grid-template-columns: 24px 1fr
    .FirstIcons
      width: 20px
    .paragrahs
      margin-left: 10px
    &.-message
      background-color: $light_gray
      .-icon
        fill: $black
      & > *
        color: $black
    &.-success
      background-color: $success_color
      .-icon
        fill: $accent_sub_color
      & > *
        color: $accent_sub_color
    &.-caution
      background-color: $notice_color
      .-icon
        fill: $sub_color
      & > *
        color: $sub_color
    &.-error
      background-color: $warning_color
      .-icon
        fill: $error_color
      & > *
        color: $error_color
  &.-message
    background-color: $light_gray
    .-icon
      fill: $black
    & > *
      color: $black
  &.-success
    background-color: $success_color
    .-icon
      fill: $accent_sub_color
    & > *
      color: $accent_sub_color
  &.-caution
    background-color: $notice_color
    .-icon
      fill: $sub_color
    & > *
      color: $sub_color
  &.-error
    background-color: $warning_color
    .-icon
      fill: $error_color
    & > *
      color: $error_color
.notification-pop-enter-active
  transition: transform 0.5s, opacity 0.5s
  transition-timing-function: ease-out
.notification-pop-leave-active
  transition: transform 1.5s, opacity 1.5s
  transition-timing-function: ease-in
.notification-pop-enter, .notification-pop-leave-active
  transform: translateY(-300px)
</style>
