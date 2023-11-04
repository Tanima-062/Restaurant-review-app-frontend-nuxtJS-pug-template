<template lang="pug">
.carouselParent
  carousel(
    v-if='!$device.isDesktop',
    ref='carousel',
    :per-page='perPage',
    :autoplay="onAutoPlay"
    :loop='true',
    :pagination-padding='5',
    :autoplay-timeout='4000',
    :centerMode='true',
    :paginationEnabled='true',
    :paginationSize='8',
    paginationActiveColor='#1c5db5',
  )
    template(v-for='i in imageList')
      slide
        img(
          :src='i.imageUrl',
          width='100%',
          :alt='i.name'
        )
  carousel(
    v-else,
    ref='carousel',
    :per-page='perPage',
    :autoplay="onAutoPlay"
    :loop='true',
    :pagination-padding='5',
    :autoplay-timeout='4000',
    :centerMode='true',
    :paginationEnabled='true',
    :paginationSize='8',
    paginationActiveColor='#1c5db5',
  )
    template(v-for='i in imageList')
      slide
        img(:src='i.imageUrl', width='100%', :alt='i.name')
  template(v-if="isShowNavButton")
    .navNext(@click='clickNext')
      next.nexticon-right
    .navPrev(@click='clickPrev')
      next.nexticon-left
</template>
<script lang="ts">
import { defineComponent, Ref, ref } from '@nuxtjs/composition-api'
import Carousel from 'vue-carousel/src/Carousel.vue'
import Slide from 'vue-carousel/src/Slide.vue'
import { Paragraph, ParagraphBold, Span, SpanBold } from '~/components/atoms/typography'
import Next from '~/assets/icon/arrow-next.svg'
import ImagesIcon from '~/assets/icon/images.svg'

export default defineComponent({
  name: 'BuffetCarouselSlider',
  components: {
    Paragraph,
    ParagraphBold,
    Span,
    SpanBold,
    Carousel,
    Slide,
    Next,
    ImagesIcon
  },
  props: {
    imageList: {
      type: Array,
      default: () => []
    },
    isShowNavButton: {
      type: Boolean,
      default: false
    },
    isShowPagination: {
      type: Boolean,
      default: false
    },
    onAutoPlay: {
      type: Boolean,
      default: false
    },
    perPage: {
      type: Number,
      default: 3
    }
  },
  setup() {
    const carousel: Ref<
      (Vue & { goToPage: (num: number) => void; getNextPage: () => number; getPreviousPage: () => number }) | null
    > = ref(null)

    const clickNext = () => {
      carousel.value?.goToPage(carousel.value.getNextPage())
    }

    const clickPrev = () => {
      carousel.value?.goToPage(carousel.value.getPreviousPage())
    }

    return {
      carousel,
      clickNext,
      clickPrev
    }
  }
})
</script>
<style lang="sass" scoped>
.VueCarousel :deep()
  width: 100%
  height: 100%
  position: relative
  .VueCarousel-pagination
    position: absolute
    bottom: 0
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
      left: 83%
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
    width: 100%
    height: 210px
    object-fit: cover
@include pc_view
  .VueCarousel :deep()
    width: 100%
    height: 100%
    position: relative
    .VueCarousel-pagination
      position: absolute
      bottom: 0
  .carouselParent
    .navNext
      width: 46px
      height: 46px
      &:hover
        opacity: 1
        cursor: pointer
    .navPrev
      width: 46px
      height: 46px
      &:hover
        opacity: 1
        cursor: pointer
    img
      width: 100%
      height: 180px
</style>
