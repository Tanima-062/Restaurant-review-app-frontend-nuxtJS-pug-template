<template lang="pug">
transition(:name='`drawer-${direction}`')
  .base-drawer(:class='[direction]', v-if='isActive')
    .-header
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

@Component({
  components: {
    Cross,
    Heading
  }
})
export default class BaseDrawerUnder extends Vue {
  @Prop({ default: false }) isActive!: boolean
  @Prop({ default: 'rtl' }) direction?: 'rtl' | 'ltr'
  @Prop() title?: string
  @Prop({ default: true }) wrapperClosable?: boolean // 背景の黒い部分を押してdrawerが閉じるか否か
  @Prop({ default: true }) withHeader?: boolean // ヘッダーを表示するか
  @Prop({ default: 'm' }) textSize?: string
  @Prop({ default: 2 }) number?: number
  @Watch('isActive')
  onIsActiveChange(newIsActive) {
    if (newIsActive) {
      this.open()
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
$drawer_pc_width: 100%
.base-drawer
  overflow-y: auto
  box-sizing: border-box
  background-color: $white
  position: fixed
  top: 100
  bottom: 0
  right: 0
  left: 0
  margin: 0 auto
  height: 130px
  z-index: 2002
  box-shadow: 0 8px 10px -5px rgba(0,0,0,.2), 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12)
  @include pc_view
    width: $drawer_pc_width
    max-width: 1024px
    &.rtl
      right: 0
    &.ltr
      left: 0
  @include sp_view
    width: 100%
    left: 0
    right: 0
  .-header
    position: relative
    margin-bottom: 0px
    .imgs
      130px
    .-close
      position: absolute
      cursor: pointer
      background: none
      border: none
      min-width: 36px
      min-height: 36px
      line-height: 0
      padding: 8px
      margin-right: 0px
      right: 0
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
  transform: translate(0, 100%)
.drawer-rtl-enter-active, .drawer-rtl-leave-active
  transition: transform .2s
</style>
