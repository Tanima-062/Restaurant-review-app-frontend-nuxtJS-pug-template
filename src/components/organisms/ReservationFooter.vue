<template lang="pug">
.-footer
  .-top
    .-wrap
      .logo
        .jpx
          img(src='~/static/img/take_img/jpx_20220402.png')
        .jata
          img(src='~/static/img/take_img/jata.png')
      .description
        paragraph-bold(
          fontSize='tiny',
          letterSpacing='none',
          lineHeight='1.33'
        ) 株式会社アドベンチャー（東証グロース上場）
        paragraph(fontSize='tiny', letterSpacing='none', lineHeight='1.33') 一般社団法人 日本旅行協会(JATA)正会員 / 観光庁長官登録旅行業第2035号
  .-middle
    .-wrap
      .-logo
        Skyticket
      nav.-service-nav
      .-geo
        //- script
        //-   | type="text/javascript"
        //-   | src="https://seal.websecurity.norton.com/getseal?host_name=skyticket.jp&amp;size=S&amp;use_flash=NO&amp;use_transparent=YES&amp;lang=ja"
  .-bottom
    .-wrap
      paragraph.-copyright(fontSize='tiny', letterSpacing='none') ©︎2021 ADVENTURE inc. All rights reserved.
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Skyticket from '~/components/atoms/logo/Skyticket.vue'
import { Span, Paragraph, ParagraphBold } from '~/components/atoms/typography'
@Component({
  components: {
    Skyticket,
    Span,
    Paragraph,
    ParagraphBold
  }
})
export default class FooterMenu extends Vue {}
</script>
<style lang="sass" scoped>
.-footer
  border-top: 8px solid rgb(244,244,244)
  .-top
    max-width: 1024px
    padding: 16px 12px 32px
    margin: 0 auto
    .-wrap
      display: flex
      .logo
        display: flex
        .jpx
          width: 32px
          height: 36px
          margin-right: 4px
          img
            width: 100%
        .jata
          width: 32px
          height: 32px
          margin-right: 4px
          img
            width: 100%
      .description
        display: flex
        flex-direction: column
        justify-content: space-between
  .-middle
    background-color: rgb(34,34,34)
    .-wrap
      display: flex
      justify-content: center
      height: 52px
      .-logo
        display: flex
        svg
          fill: $white
          width: 100px
  .-bottom
    background-color: $white
    .-wrap
      display: flex
      justify-content: center
      align-items: center
      height: 32px
      text-align: center
      .-copyright
        color: rgb(166, 166, 166)
</style>
