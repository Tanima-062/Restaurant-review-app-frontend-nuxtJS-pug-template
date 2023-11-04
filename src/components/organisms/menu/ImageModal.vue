<template lang="pug">
base-drawer(:isActive='isActive', @close='closeDrawer', title='写真')
  div
    template
      .top
        .course
          .courseTime
            paragraph(fontSize='medium', v-if='menus.menu') 料理
            paragraph(fontSize='medium', v-else) 内観/外観
        .courseType
          paragraph-bold.colors(fontSize='medium', v-if='menus.menu') {{ menus.menu.name }}
      paragraph.-prices
        span-bold(v-if='menus.menu') ¥{{ $moneyFormat(Number(menus.menu.price.price)) }}
        Span(v-if='menus.menu') （税込）
      .-imgsArea
        div(v-if='menus.menu')
          img.imgs(
            v-if='menus.image',
            :src='menus.image.imageUrl + "?imwidth=320&imdensity=1"',
            :alt='menus.menu.name'
          )
        div(v-else)
          img.imgs(
            v-if='menus.image',
            :src='menus.image.imageUrl + "?imwidth=320&imdensity=1"',
            alt='内観/外観'
          )
        no-image.-img(v-else, size='s', alt='SkyticketグルメNoImage')
      .btn(v-if='menus.menu')
        CTA-button#bt(
          text='テイクアウトを見る',
          type='secondary_sub',
          fontSize='large',
          @click='search()'
        )
      review-detail(
        v-if='$feature("review") && menus.reviews',
        :reviews='menus.reviews'
      )
</template>
<script lang="ts">
import Vue from 'vue'
import { Prop, Component, Emit } from 'nuxt-property-decorator'
import BaseDrawer from '~/components/atoms/drawers/BaseDrawer.vue'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
import NoImage from '~/components/atoms/noImage/index.vue'
import ReviewDetail from '~/components/organisms/store/ReviewDetail.vue'
import { Heading, SpanBold, Span, Paragraph, ParagraphBold } from '~/components/atoms/typography'
@Component({
  components: {
    Heading,
    SpanBold,
    Span,
    Paragraph,
    ParagraphBold,
    CTAButton,
    BaseDrawer,
    NoImage,
    ReviewDetail
  }
})
export default class ImageModal extends Vue {
  @Prop({ default: false }) isActive!: boolean
  @Emit('close')
  closeDrawer() {
    // 親に伝えるだけ
  }

  get menus() {
    return this.$store.getters['modules/listStore/getImageDetail']
  }

  @Emit('searchPush')
  search() {
    // 親に伝えるだけ
  }
}
</script>

<style lang="sass" scoped>
.top
  display: flex
  .course
    .courseTime
      border-radius: 2px
      border: solid 1px #a6a6a6
      height: 25px
      width: 115px
      text-align: center
      margin: 0 auto
  .courseType
    margin-left: 20px
    .colors
      color: #222
.sectionLast
  margin: 10px calc(50% - 46vw)
  height: 1px
  background-color: #e4e4e4
.-prices
  text-align: right
.-imgsArea
  text-align: center
  .imgs
    height: 225px
    width: 300px
    margin: 20px 0
    object-fit: cover
    @include pc_view
      height: 300px
      width: 400px
.btn
  display: flex
  justify-content: center
  align-items: center
  text-align: center
#bt:hover
  opacity: 0.6
@include pc_view
  .top
    .course
      .courseTime
        border-radius: 2px
        border: solid 1px #a6a6a6
        height: 25px
        width: 130px
        text-align: center
        margin: 0 auto
    .colors
      color: #1ba1ff
      font-size: 20px
      margin-top: -5px
    .-imgsArea
      text-align: center
</style>
