<template lang="pug">
transition(name='modal')
  div
    .base-modal-wrapper(v-if='isActive')
      .-base-modal
        .-header
          heading(:number='2', fontSize='m') {{ title }}
          button.-close(@click.prevent='close')
            cross.-icon
        .-content
          slot(name='modal-text')
            p 確認してください。
        .-footer
          slot(name='modal-footer')
            CTA-button(
              type='secondary',
              @click='close',
              :text='modalButtonText'
            )
</template>

<script lang="ts">
import { Component, Prop, Emit, Watch, Vue } from 'nuxt-property-decorator'
import Cross from '~/assets/icon/modal-close.svg'
import Heading from '~/components/atoms/typography/Heading.vue'
import CTAButton from '~/components/atoms/button/CTAButton.vue'

const MODAL_OVERLAY_CLASS = 'base-modal-overlay'

@Component({
  components: {
    Cross,
    Heading,
    CTAButton
  }
})
export default class BaseModal extends Vue {
  @Prop({ default: false }) isActive!: boolean
  @Prop({ default: 'title' }) title?: string
  @Prop({ default: 'OK' }) modalButtonText?: string

  @Watch('isActive')
  onIsActiveChange(newIsActive) {
    if (newIsActive) {
      this.open()
      // モーダルの下の要素をスクロールさせないための処理
      document.body.style.overflow = 'hidden'
      // モーダル直下にオーバーレイを挿入
      const overlay = document.createElement('div')
      overlay.classList.add(MODAL_OVERLAY_CLASS)
      document.body.appendChild(overlay)
    } else {
      // モーダルの下の要素のスクロール禁止を解除
      document.body.style.overflow = 'auto'
      // body直下のオーバーレイを削除
      const overlay = document.querySelector(`.${MODAL_OVERLAY_CLASS}`)
      if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay)
      }
    }
  }

  @Emit()
  open(): void {
    // 親コンポーネントにオープンイベントを通知するだけ
  }

  @Emit()
  close(): void {
    // 親コンポーネントにクローズイベントを通知するだけ
  }
}
</script>
<style lang="sass">
.base-modal-overlay
  position: fixed
  left: 0
  top: 0
  bottom
  right: 0
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, 0.5)
  z-index: 10020
</style>
<style lang="sass" scoped>
.modal-enter-active,
.modal-leave-active
  transition: opacity .5s
.modal-enter,
.modal-leave-to
  opacity: 0
.base-modal-wrapper
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  overflow: auto
  margin: auto 16px
  z-index: 10021
  .-base-modal
    position: relative
    margin: 0 auto 50px
    background: #fff
    border-radius: 2px
    box-shadow: 0 1px 3px rgba(0,0,0,.3)
    box-sizing: border-box
    margin-top: 32vh
    width: 50%
    @include sp_view
      width: 95%
    .-header
      display: flex
      justify-content: space-between
      align-items: center
      padding: 16px 24px
      margin-bottom: 0px
      .-close
        cursor: pointer
        background: none
        border: none
        min-width: 36px
        min-height: 36px
        line-height: 0
        padding: 8px
        margin-right: -8px
        .-icon
          fill: $dark_gray
          width: 20px
          height: 20px
    .-content
      padding: 0 24px
      margin-bottom: 16px
    .-footer
      min-height: 75px
      padding: 16px 24px
      width: 100%
      z-index: 1
      text-align: center
</style>
