<template lang="pug">
transition(name='modal')
  div
    .base-modal-wrapper(v-if='isActive')
      .-base-modal
        notification-pop(
          :isShown='isAlertPopShown',
          type='success',
          position='right',
          @closePop='closePop',
          icon='info'
        )
          template
            | {{ $t("クリップボードにコピーしました。") }}
        .-close(@click.prevent='close')
          cross.-icon
        .-content
          paragraph-bold.head(:number='1', fontSize='big') 店舗情報を送る
          paragraph-bold.texts(fontSize='small') {{ storeInfo.name }}
          paragraph.texts(fontSize='small') {{ storeInfo.description }}
          paragraph.address(fontSize='tiny') {{ storeInfo.address }}
          paragraph.texts(fontSize='tiny') {{ urlRoute }}
        .-sns
          button.copyBox.box-common(@click='copyPush')
            check-file.icon
            paragraph.text(fontSize='tiny') URLコピー
          button.FacebookBox.box-common(@click='facebookPush')
            facebook-icon.icon.FacebookIcon
            paragraph.text(fontSize='tiny') Facebook
          button.lineBox.box-common(@click='linePush')
            img.icon(src='img/sns/line.png')
            paragraph.text(fontSize='tiny') LINE
</template>

<script lang="ts">
import { Component, Prop, Emit, Watch, Vue } from 'nuxt-property-decorator'
import { Paragraph, ParagraphBold, Span, SpanBold } from '~/components/atoms/typography'
import NotificationPop from '~/components/molecules/card/NotificationPop.vue'
import Cross from '~/assets/icon/cross-gray.svg'
import CheckFile from '~/assets/icon/checkfile.svg'
import FacebookIcon from '~/assets/icon/facebook.svg'
const MODAL_OVERLAY_CLASS = 'base-modal-overlay'
@Component({
  components: {
    Cross,
    Paragraph,
    ParagraphBold,
    Span,
    SpanBold,
    NotificationPop,
    CheckFile,
    FacebookIcon
  }
})
export default class ShareMenu extends Vue {
  @Prop({ default: true }) isActive!: boolean
  @Prop({ default: '鴨胸肉のロースト' }) title?: string
  @Prop({ default: '8/31 (月) 13:30' }) date?: string
  @Prop({ default: 1500 }) price?: number
  @Prop({ default: 'グッドラックカリー' }) restaurant_name!: string
  @Prop({ default: true }) wrapperClosable?: boolean
  restaurant_content!: string
  isAlertPopShown = false
  @Prop({ default: 'OK' })
  private modalButtonText?: string

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

      overlay.addEventListener('click', () => {
        if (this.wrapperClosable) {
          this.close()
        }
      })
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

  copyToClipboard(text: string) {
    const url = document.createElement('textarea')
    url.value = text
    document.body.appendChild(url)
    url.select()
    document.execCommand('copy')
    if (url && url.parentElement) {
      url.parentElement.removeChild(url)
    }
  }

  @Emit()
  close(): void {
    // console.log('モーダル閉じ')
  }

  @Emit()
  open(): void {
    // console.log('モーダル閉じ')
  }

  copyPush() {
    this.copyToClipboard(process.env.PATH + this.$route.path)
    this.isAlertPopShown = true
  }

  closePop(): void {
    this.isAlertPopShown = false
  }

  facebookPush() {
    location.href = 'https://www.facebook.com/sharer/sharer.php?u=' + process.env.PATH + this.$route.path
  }

  linePush() {
    location.href = 'https://social-plugins.line.me/lineit/share?url=' + process.env.PATH + this.$route.path
  }

  get storeInfo() {
    if (this.$store.getters['modules/listStore/getStore'].name !== '') {
      const data = this.$store.getters['modules/listStore/getStore']
      return data
    }
  }

  get urlRoute() {
    return process.env.PATH + this.$route.path
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
  margin-top: 32vh
  height: 320px
  .-base-modal
    position: relative
    margin: 0 auto
    background: #fff
    border-radius: 4px
    box-shadow: 0 1px 3px rgba(0,0,0,.3)
    box-sizing: border-box
    width: 100%
    .-close
      .-icon
        fill: #4d4d4d
        width: 20px
        height: 20px
        position: absolute
        top: 5%
        left: 90%
    .-content
      .head
        text-align: center
        padding: 20px
      .texts
        white-space: pre-wrap
        padding: 0px 20px 0px 20px
      .address
        padding: 20px 20px 0px 20px
    .-sns
      display: flex
      padding: 20px
      justify-content: center
      .box-common
        border-radius: 2px
        border: solid 1px #e4e4e4
        background-color: white
        width: 30%
        margin: 5px
        padding-top: 3px
        &:active
          opacity: 0.6
        @include pc_view
          margin: 10px
          width: 90px
          &:hover
            cursor: pointer
            opacity: 0.6
      .icon
        width: 24px
      .copyBox
        height: 65px
      .FacebookIcon
        height: auto
      .text
        line-height: 1.5em
@include pc_view
  .base-modal-wrapper
    margin: 0 auto
    width: 490px
    height: 320px
    margin-top: 32vh
    .-base-modal
      margin-top: 0
      margin-bottom: 0
      .-close
        &:hover
          cursor: pointer
        .-icon
          left: 92%
</style>
