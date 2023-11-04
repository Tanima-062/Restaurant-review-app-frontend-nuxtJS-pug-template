<template lang="pug">
.notices
  .notification.message
    .-icon-wrapper
      component.-icon(:is='icon', v-if='getNewestId')
    .-text-wrapper(v-if='getNewestId', @click='goToNotice(getNewestId)')
      Span.-title(fontSize='small') {{ getNewestTitle }}
  template(v-if='SortNotice')
    ul(v-for='i in SortNotice.length - 1', v-if='isClickInfo')
      .notification.message
        .-icon-wrapper
          component.-icon(:is='icon')
        .-text-wrapper(
          v-if='SortNotice',
          @click='goToNotice(SortNotice[i].id)'
        )
          Span.-title(fontSize='small') {{ SortNotice[i].title }}
    Next-mark.accordionButton(
      @click='isClickInfo = !isClickInfo',
      :class='[isClickInfo ? "rotateicon" : ""]',
      v-if='getNewestId'
    )
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Warning from '~/assets/icon/warning.svg'
import Info from '~/assets/icon/info-button-fill.svg'
import { SpanBold, Span } from '~/components/atoms/typography/'
import NextMark from '~/assets/icon/nextV2.svg'
@Component({
  components: {
    Span,
    Warning,
    Info,
    SpanBold,
    NextMark
  }
})
export default class NotificationTakeout extends Vue {
  @Prop() noticebox
  @Prop() linkUrl!: string
  @Prop() icon!: 'warning' | 'info'
  @Prop() appCd!: string

  isClickInfo = false
  get SortNotice() {
    if (this.noticebox) {
      if (this.noticebox.length > 0) {
        return this.noticebox.slice().reverse() // 新しい順にsort
      }
    }
  }

  get getNewestTitle() {
    if (this.SortNotice) {
      return this.SortNotice[0].title // 最新のタイトル取得
    }
  }

  get getNewestId() {
    if (this.SortNotice) {
      return this.SortNotice[0].id // 最新のid取得
    }
  }

  goToNotice(id) {
    if (this.appCd === 'TO') {
      this.$router.push({ path: `/news/takeout/${id}` })
    } else {
      this.$router.push({ path: `/news/restaurant/${id}` })
    }
  }
}
</script>
<style lang="sass" scoped>
.notices
  position: relative
  .accordionButton
    position: absolute
    right: 10px
    top: 2px
    width: 12px !important
    fill: $dark_gray
    cursor: pointer
    transform: rotate(90deg)
  .rotateicon
    transform: rotate(270deg)
  .reverse
    transform: rotate(270deg)
  .notification
    border-radius: 3px
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
      position: relative
      cursor: pointer
      .-icon
        position: absolute
      span
        display: block
      .-title
        padding-right: 30px
    &.message
      .-icon
        fill: $accent_color
      .-title
        color: $main_color
</style>
