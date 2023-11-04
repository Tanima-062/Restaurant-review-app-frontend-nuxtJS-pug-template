<template lang="pug">
div
  .adminheads
    paragraph-bold(fontSize='small', color='spare_gray') テイクアウト
      span(style='color: #a4cef8') 注文受付画面
    logout-icon.-logouticon(@click='clickIcon')
    paragraph.-subtext(fontSize='tiny') ログアウト
  Nuxt.page
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import LogoutIcon from '~/assets/icon/logout.svg'
import { Heading, SpanBold, Paragraph, ParagraphBold } from '~/components/atoms/typography'
@Component({
  components: {
    Heading,
    SpanBold,
    Paragraph,
    ParagraphBold,
    LogoutIcon
  }
})
export default class AdminSmallLayout extends Vue {
  clickIcon() {
    this.$store.dispatch('modules/client/logoutClient')
  }
}
</script>
<style lang="sass">
.adminheads
  height: 30px
  text-align: center
  padding: 20px 0
  position: relative
  .-logouticon
    position: absolute
    top: 0
    right: 0
    @include pc_view
      right: 18%
    margin-top: 10px
    margin-right: 35px
    width: 20px
    fill: #1ba1ff
  .-subtext
    position: absolute
    top: 0
    right: 0
    @include pc_view
      right: 18%
    margin-top: 35px
    margin-right: 15px
    font-size: 10px
@include pc_view
  .adminheads
    height: 30px
    text-align: center
    padding: 20px 0
    position: relative
</style>
