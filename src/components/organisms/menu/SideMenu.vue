<template lang="pug">
.sideMenusContents
  paragraph-bold.texts(fontSize='large') メニューを選ぶ
  item-nav.navs(:List='genreList')
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
import ItemNav from '~/components/organisms/ItemNav.vue'
import AmountButton from '~/components/atoms/button/AmountButton.vue'
import { Heading, SpanBold, Span, Paragraph, ParagraphBold } from '~/components/atoms/typography'

@Component({
  components: {
    Heading,
    SpanBold,
    Span,
    Paragraph,
    ParagraphBold,
    CTAButton,
    ItemNav,
    AmountButton
  }
})
export default class SideMenuList extends Vue {
  private sideprice = 0
  genreList = ['すべて', '中華', '和食', '洋食', 'ファストフード', 'カフェ', 'スイーツ']
  calcprice(newCount: number): void {
    this.sideprice = newCount
  }
}
</script>
<style lang="sass" scoped>
.sideMenusContents
  margin-top: 30px
  .navs
    width: 100vw
    margin-left: calc(-50vw + 50%)
  .texts
    margin: 20px auto
    width: 90%
@include pc_view
  .sideMenusContents
    margin-top: 30px
    .navs
      width: 100%
      margin-left: auto
</style>
