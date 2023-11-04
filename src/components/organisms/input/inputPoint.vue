<template lang="pug">
transition(name='modal')
  div
    .base-modal-wrapper(v-if='isActive')
      .-base-modal
        .-close(@click.prevent='close')
          cross.-icon
        .-content
          paragraph-bold.head(:number='1' fontSize='medium') 利用ポイント入力
          paragraph.texts(fontSize='tiny') 1ポイントを ¥1 としてご利用いただけます。
          .availablePoint
            paragraph-bold.available(fontSize='small') 利用可能ポイント残高
            paragraph.inPoint(fontSize='tiny') 0
          .input
            validated-input(
              :value='usePoint'
              name="カード番号"
              rules="required|numeric"
              id="point-usePoint"
              @input="onInput($event)")
          paragraph.texts(:number='1' fontSize='tiny') ※利用ポイントは各サービスの均等利用となります（端数ポイントは適当に割り振られます）<br>※キャンセル時はポイントは失効され再度利用することはできません
          .btn
            CTA-button(text="キャンセル" type="secondary_sub" fontSize="small" @click='close').cancel
            CTA-button(text="確定" type="secondary" fontSize="small" @click='close').confirm
</template>

<script lang="ts">
import { Component, Prop, Emit, Watch, Vue } from 'nuxt-property-decorator'
import { Paragraph, ParagraphBold, Span, SpanBold } from '~/components/atoms/typography'
import Cross from '~/assets/icon/modal-close.svg'
import CheckFile from '~/assets/icon/checkfile.svg'
import FacebookIcon from '~/assets/icon/facebook.svg'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
import ValidatedInput from '~/components/molecules/input/ValidatedInput.vue'

const MODAL_OVERLAY_CLASS = 'base-modal-overlay'

@Component({
  components: {
    Cross,
    Paragraph,
    ParagraphBold,
    Span,
    SpanBold,
    CheckFile,
    CTAButton,
    ValidatedInput,
    FacebookIcon
  }
})
export default class InputPoint extends Vue {
  @Prop({ default: true }) isActive!: boolean
  usePoint = 0
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

  onInput(val) {
    this.usePoint = val
  }

  @Emit()
  close(): void {
    // console.log('モーダル閉じ')
  }

  @Emit()
  open(): void {
    // console.log('モーダル閉じ')
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
  z-index: 2020
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
  z-index: 2021
  .-base-modal
    position: relative
    margin: 0 auto 50px
    background: #fff
    border-radius: 2px
    box-shadow: 0 1px 3px rgba(0,0,0,.3)
    box-sizing: border-box
    margin-top: 32vh
    width: 280px
    .-close
      .-icon
        fill: #4d4d4d
        width: 20px
        height: 20px
        position: absolute
        top: 5%
        left: 90%
    .-content
      padding-bottom: 20px
      .head
        padding: 20px
      .texts
        padding: 10px 20px
      .availablePoint
        display: flex
        .available
          width: 70%
          padding-left: 20px
        .inPoint
          width: 30%
          text-align: right
          padding-right: 20px
      .input
        width: 85%
        margin: 10px auto
      .btn
        display: flex
        .cancel
          margin: 0 10px
        .confirm
          margin: 0 10px
</style>
