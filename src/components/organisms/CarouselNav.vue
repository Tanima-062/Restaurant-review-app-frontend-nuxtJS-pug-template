<template lang="pug">
nav.global-nav
  .-menu
    #slides.-slide(ref="slides")
      .backs(v-if='$device.isDesktop && (Object.keys(List).length > 3)', @click='goLeft')
        next.arrows-left
      .nexts(v-if='$device.isDesktop  && (Object.keys(List).length > 3)', @click='goRight')
        next.arrows-right
      .-main-menu
        .-items(
          v-for='item in List',
          :key='item.id',
          @click='listClick(item)'
        )
          img#carouselimg(
            v-if='item.thumbImage',
            :src='item.thumbImage.imageUrl + "?imwidth=241&imdensity=1"',
            :alt='item.name',
            loading='lazy'
          )
          span-bold.-menuname(fontSize='small') {{ item.name }}
          Span.-details.ellipsis(fontSize='tiny') {{ item.description }}
</template>

<script lang="ts">
import { defineComponent, PropType, ref, useRouter } from '@nuxtjs/composition-api'
import Next from '~/assets/icon/arrow-next.svg'
import { RecommendTypes } from '~/types/recommendTypes'
import { Heading, SpanBold, Span, Paragraph, ParagraphBold } from '~/components/atoms/typography'
import { CampaignInfo } from '~/types/hotelRestaurantTypes'

export default defineComponent({
  name: 'CarouselNav',
  components: {
    Heading,
    SpanBold,
    Span,
    Paragraph,
    ParagraphBold,
    Next
  },
  props: {
    // eslint-disable-next-line vue/prop-name-casing
    List: {
      type: [] as PropType<RecommendTypes.ListTypesTO[] | RecommendTypes.ListTypesRS[] | CampaignInfo[]>,
      default: () => []
    },
    isTakeout: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const listClick = (item: any): void => {
      item.pageUrl
        ? router.push(item.pageUrl)
        : props.isTakeout
        ? router.push(`/restaurant/detail/takeout/${item.store.id}/?type=take`)
        : router.push(`/restaurant/detail/takeout/${item.id}/`)
    }
    const slides = ref<HTMLDivElement | null>(null)

    const goRight = (): void => {
      if (slides.value) {
        slides.value.scrollLeft += 320
      }
    }

    const goLeft = (): void => {
      if (slides.value) {
        slides.value.scrollLeft -= 320
      }
    }
    return {
      listClick,
      goRight,
      goLeft,
      slides
    }
  }
})
</script>

<style lang="sass" scoped>
.global-nav
  position: relative
  width: 100%
  background-color: $white
  button
    cursor: pointer
    border: none
    &:focus
      outline: none
  .backs
    position: absolute
    left: -2%
    top: 25%
    width: 50px
    height: 50px
    border-radius: 50px
    background-color: #ffffff
    z-index: 10
    opacity: 0.6
    .arrows-left
      margin-left: 8px
      margin-top: 15px
      height: 20px
      transform: rotate(90deg)
  .backs:hover
    opacity: 1
    cursor: pointer
  .nexts
    position: absolute
    right: - 1%
    top: 25%
    width: 50px
    height: 50px
    border-radius: 50px
    background-color: $white
    z-index: 1
    opacity: 0.6
    .arrows-right
      margin-left: 18px
      margin-top: 15px
      height: 20px
      transform: rotate(-90deg)
  .nexts:hover
    opacity: 1
    cursor: pointer
  .-menu
    position: relative
    .-slide
      width: 100%
      padding-bottom: 8px
      overflow-x: auto
      overflow-y: hidden
    .-main-menu
      display: flex
      flex-wrap: nowrap
      align-items: stretch
      justify-content: space-between
      box-pack: justify
      transition-duration: .5s
      transition-timing-function: ease-out
      .-items
        text-align: left
        flex: 1 1 auto
        cursor: pointer
        #carouselimg
          width: 180px
          height: 135px
          object-fit: cover
          border-radius: 4px
        .-text
          width: 180px
          margin: 0px 10px
        .ellipsis
          text-align: left
          display: -webkit-box
          -webkit-box-orient: vertical
          -webkit-line-clamp: 3
          overflow: hidden
          width: 180px
          margin-left: 10px
        .-menuname
          text-align: left
          margin-left: 10px
          margin-bottom: 10px
          display: -webkit-box
          -webkit-box-orient: vertical
          -webkit-line-clamp: 1
          overflow: hidden
      .-items:hover
        opacity: 0.6
.-details
  font-size: 14px
  line-height: 14px
  white-space: pre-wrap
@include pc_view
  .global-nav
    padding-bottom: 15px
    .-menu
      .-main-menu
        .-items
          #carouselimg
            width: 241px
            height: 180px
            object-fit: cover
            margin: 10px 10px 10px 0px
            border-radius: 4px
          .-text
            width: 241px
            margin: 0px 10px 0px 0px
            padding-left: 10px
          .ellipsis
            text-align: left
            display: -webkit-box
            -webkit-box-orient: vertical
            -webkit-line-clamp: 3
            overflow: hidden
            width: 241px
            margin-left: 10px
          .-menuname
            text-align: left
            margin-left: 10px
            margin-bottom: 10px
            display: -webkit-box
            -webkit-box-orient: vertical
            -webkit-line-clamp: 1
            overflow: hidden
            width: 241px
  .-link
    display: block
    position: relative
    width: 200px
    height: 45px
    line-height: 18em
    background-color: $white
    text-align: left
  .-menuname
    font-size: 16px
    line-height: 18px
  .-details
    font-size: 14px
    line-height: 18px
  .-slide::-webkit-scrollbar
    display: none
</style>
