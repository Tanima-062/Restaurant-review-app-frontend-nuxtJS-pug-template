<template lang="pug">
.carouselParent
  carousel(
    v-if='!$device.isDesktop',
    ref='carousel',
    :per-page='2.5',
    :loop='true',
    :pagination-padding='5',
    :autoplay-timeout='4000',
    :paginationEnabled='isShowPagination',
    :paginationSize='8',
    paginationActiveColor='#1c5db5',
  )
    template(v-for='store in recommendStoreList')
      slide
        .slide-inner
          img(:src='store.images[0].imageUrl', :alt='store.name')
          .store-name {{ store.name }}
  carousel(
    v-else,
    ref='carousel',
    :per-page='4',
    :loop='true',
    :pagination-padding='5',
    :autoplay-timeout='4000',
    :paginationEnabled='isShowPagination',
    :paginationSize='8',
    paginationActiveColor='#1c5db5',
  )
    template(v-for='store in recommendStoreList')
      slide
        .slide-inner
          img(:src='store.images[0].imageUrl', width='100%', :alt='store.name')
          .store-name {{ store.name }}
  .navNext(
    v-if='!$device.isDesktop && recommendStoreList && recommendStoreList.length > 2',
    @click='clickNext'
  )
    next.nexticon-right
  .navNext(
    v-else-if='$device.isDesktop && recommendStoreList && recommendStoreList.length > 4',
    @click='clickNext'
  )
    next.nexticon-right
  .navPrev(
    v-if='!$device.isDesktop && recommendStoreList && recommendStoreList.length > 2',
    @click='clickPrev'
  )
    next.nexticon-left
  .navPrev(
    v-else-if='$device.isDesktop && recommendStoreList && recommendStoreList.length > 4',
    @click='clickPrev'
  )
    next.nexticon-left
</template>
<script lang="ts">
import { defineComponent, PropType, Ref, ref } from '@nuxtjs/composition-api'
import Carousel from 'vue-carousel/src/Carousel.vue'
import Slide from 'vue-carousel/src/Slide.vue'
import { Paragraph, ParagraphBold, Span, SpanBold } from '~/components/atoms/typography'
import Next from '~/assets/icon/arrow-next.svg'
import ImagesIcon from '~/assets/icon/images.svg'
import { HotelRestaurant } from '~/types/hotelRestaurantTypes'

export default defineComponent({
  name: 'RecommendBuffetCarouselSlider',
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
    recommendStoreList: {
      type: [] as PropType<HotelRestaurant[]>,
      default: () => []
    },
    isShowNavButton: {
      type: Boolean,
      default: false
    },
    isShowPagination: {
      type: Boolean,
      default: false
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
  position: relative
  .VueCarousel-inner
    flex-basis: 0 !important
  .VueCarousel-pagination
    position: absolute
    bottom: -15px
  .VueCarousel-slide
    width: 130px
    height: 120px
    margin-right: 16px
    .slide-inner
      display: flex
      flex-direction: column
      align-items: center
      img
        width: 130px
        height: 73px
      .store-name
        margin-top: 8px
        overflow: hidden
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical
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
    top: 5%
    right: -3%
    @include pc_view
      right: 0%
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
    top: 5%
    left: -3%
    @include pc_view
      left: 0%
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
  .VueCarousel :deep()
    position: relative
    .VueCarousel-pagination
      position: absolute
      bottom: -20px
    .VueCarousel-slide
      width: 254px
      height: 60px
      margin-right: 0px
      cursor: pointer
      &:hover
        opacity: 0.6
      .slide-inner
        display: flex
        flex-direction: row
        align-items: center
        justify-content: space-between
        img
          width: 60px
          height: 60px
        .store-name
          width: 160px
          padding: 0 16px 0 8px
  .carouselParent
    padding: 0 60px 0 60px
    .navNext
      &:hover
        opacity: 1
        cursor: pointer
    .navPrev
      &:hover
        opacity: 1
        cursor: pointer
</style>
