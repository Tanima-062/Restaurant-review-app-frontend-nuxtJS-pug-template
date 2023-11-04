<template lang="pug">
.carouselParent
  no-ssr
    carousel(
      v-if='$window.width < 767',
      ref='carousel',
      :per-page='1',
      :loop='true',
      :pagination-padding='5',
      :autoplay-timeout='4000',
      :centerMode='true',
      :paginationEnabled='true',
      :paginationSize='8',
      paginationActiveColor='#1c5db5',
      @pageChange='onPageChange'
    )
      template(v-for='i in imageList')
        slide
          img(
            :src='i.imageUrl + "?imwidth=640&imdensity=1"',
            width='100%',
            :alt='i.name'
          )
    carousel(
      v-else,
      ref='carousel',
      :per-page='3',
      :loop='true',
      :pagination-padding='5',
      :autoplay-timeout='4000',
      :centerMode='true',
      :paginationEnabled='true',
      :paginationSize='8',
      paginationActiveColor='#1c5db5',
      @pageChange='onPageChange'
    )
      template(v-for='i in imageList')
        slide
          img(:src='i.imageUrl', width='100%', :alt='i.name')
  no-ssr
    .navNext(
      v-if='$window.width < 768 && imageList.length > 1',
      @click='clickNext'
    )
      next.nexticon-right
    .navNext(
      v-else-if='$window.width > 767 && imageList.length > 3',
      @click='clickNext'
    )
      next.nexticon-right
    .navPrev(
      v-if='$window.width < 768 && imageList.length > 1',
      @click='clickPrev'
    )
      next.nexticon-left
    .navPrev(
      v-else-if='$window.width > 767 && imageList.length > 3',
      @click='clickPrev'
    )
      next.nexticon-left
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import Carousel from 'vue-carousel/src/Carousel.vue'
import Slide from 'vue-carousel/src/Slide.vue'
import { Paragraph, ParagraphBold, Span, SpanBold } from '~/components/atoms/typography'
import Next from '~/assets/icon/arrow-next.svg'
import ImagesIcon from '~/assets/icon/images.svg'

@Component({
  components: {
    Paragraph,
    ParagraphBold,
    Span,
    SpanBold,
    Carousel,
    Slide,
    Next,
    ImagesIcon
  }
})
export default class CarouselSlider extends Vue {
  @Prop() imageList!: []
  private allcounts = this.imageList.length
  private currentNum = 0
  onPageChange(num: number): void {
    this.currentNum = num
  }

  private clickNext(): void {
    this.refs.carousel.goToPage(this.refs.carousel.getNextPage())
  }

  private clickPrev(): void {
    this.refs.carousel.goToPage(this.refs.carousel.getPreviousPage())
  }
  // eslint-disable-next-line
  get refs(): any {
    return this.$refs
  }
}
</script>
<style lang="sass" scoped>
.VueCarousel-slide
  height: 250px
.carouselParent
  position: relative
  .nexticon-right
    position: absolute
    top: 35%
    left: 31%
    transform: rotate(-90deg)
  .nexticon-left
    position: absolute
    top: 35%
    left: 22%
    transform: rotate(90deg)
  .navNext
    position: absolute
    top: 37%
    left: 85%
    @include pc_view
      left: 94%
    fill: black
    background: white
    border-radius: 50px
    width: 50px
    height: 50px
    opacity: 0.6
    &:active
      opacity: 1
  .navPrev
    position: absolute
    top: 37%
    left: 1%
    fill: black
    background: white
    border-radius: 50px
    width: 50px
    height: 50px
    opacity: 0.6
    &:active
      opacity: 1
  #rexticon
    position: absolute
    top: 18%
    left: 30%
    width: 20px
  .rectBox
    position: absolute
    margin-right: 40px
    top: 70%
    right: 0%
    width: 70px
    height: 40px
    padding: 5px 0px 5px 0px
    border-radius: 2px
    background-color: rgba(34, 34, 34, 0.4)
    line-height: 0.5em
    text-align: center
    .-imagesIcon
      width: 30px
  img
    height: 250px
    object-fit: cover
@include pc_view
  .navNext
    &:hover
      opacity: 1
      cursor: pointer
  .navPrev
    &:hover
      opacity: 1
      cursor: pointer
</style>
