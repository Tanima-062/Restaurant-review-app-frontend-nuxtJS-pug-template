<template lang="pug">
transition(:name='`drawer-${direction}`')
  .base-drawer(:class='[direction]', v-if='isActive')
    .-header(v-show='withHeader')
      heading(:number='2', :fontSize='textSize') {{ title }}
      button.-close(@click.prevent='close')
        cross.-icon
    .-content
      slot
    .-footer(v-if='$slots.footer', :class='[direction]')
      slot(name='footer')
</template>

<script lang="ts">
import { Component, Prop, Emit, Watch, Vue } from 'nuxt-property-decorator'
import Cross from '~/assets/icon/cross-gray.svg'
import Heading from '~/components/atoms/typography/Heading.vue'

const DRAWER_OVERLAY_CLASS = 'base-drawer-overlay'

@Component({
  components: {
    Cross,
    Heading
  }
})
export default class BaseDrawer extends Vue {
  @Prop({ default: false }) isActive!: boolean
  @Prop({ default: 'rtl' }) direction?: 'rtl' | 'ltr'
  @Prop() title?: string
  @Prop({ default: true }) wrapperClosable?: boolean // 背景の黒い部分を押してdrawerが閉じるか否か
  @Prop({ default: true }) withHeader?: boolean // ヘッダーを表示するか
  @Prop({ default: 'm' }) textSize!: string

  beforeDestroy() {
    document.body.style.overflow = 'auto'
    // body直下のオーバーレイを削除
    const overlay = document.querySelector(`.${DRAWER_OVERLAY_CLASS}`)
    if (overlay && overlay.parentNode) {
      overlay.parentNode.removeChild(overlay)
    }
  }

  @Watch('isActive')
  onIsActiveChange(newIsActive) {
    if (newIsActive) {
      this.open()
      // ドロワーの下の要素をスクロールさせないための処理
      document.body.style.overflow = 'hidden'
      // body直下にオーバーレイを挿入
      const overlay = document.createElement('div')
      overlay.classList.add(DRAWER_OVERLAY_CLASS)
      overlay.addEventListener('click', () => {
        if (this.wrapperClosable) {
          this.close()
        }
      })
      document.body.appendChild(overlay)
    } else {
      // ドロワーの下の要素のスクロール禁止を解除
      document.body.style.overflow = 'auto'
      // body直下のオーバーレイを削除
      const overlay = document.querySelector(`.${DRAWER_OVERLAY_CLASS}`)
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
.base-drawer-overlay
  position: fixed
  left: 0
  top: 0
  bottom
  right: 0
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, 0.5)
  z-index: 100000
  @include sp_view
    display: none
</style>
<style lang="sass" scoped>
$drawer_pc_width: 675px
.base-drawer
  overflow-y: auto
  box-sizing: border-box
  background-color: $white
  position: fixed
  top: 0
  bottom: 0
  height: 100%
  z-index: 100002
  box-shadow: 0 8px 10px -5px rgba(0,0,0,.2), 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12)
  @include pc_view
    width: $drawer_pc_width
    &.rtl
      right: 0
    &.ltr
      left: 0
  @include sp_view
    width: 100%
    left: 0
    right: 0
  .-header
    display: flex
    justify-content: space-between
    align-items: baseline
    padding: 24px 16px
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
      &:hover
        opacity: 0.6
      .-icon
        fill: $dark_gray
        width: 20px
        height: 20px
  .-content
    padding: 0 16px
    margin-bottom: 75px
  .-footer
    min-height: 75px
    position: fixed
    bottom: 0
    right: 0
    background: white
    padding: 12px 16px
    box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.24)
    width: 100%
    z-index: 1
    @include pc_view
      width: $drawer_pc_width
  .-footer.ltr
    left: 0
.drawer-rtl-enter, .drawer-rtl-leave-to
  transform: translate(100%, 0)
.drawer-rtl-enter-active, .drawer-rtl-leave-active
  transition: transform .3s
.drawer-ltr-enter, .drawer-ltr-leave-to
  transform: translate(-100%, 0)
.drawer-ltr-enter-active, .drawer-ltr-leave-active
  transition: transform .3s
</style>
