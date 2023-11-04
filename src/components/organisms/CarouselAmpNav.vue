<template lang="pug">
nav.global-nav
  .-menu
    #AmpSlides.-slide
      no-ssr
        .backs(v-if='$window.width > 767', @click='goLefts')
          next.arrows-left
      no-ssr
        .nexts(v-if='$window.width > 767', @click='goRights')
          next.arrows-right
      .-main-menu
        .-items(
          v-for='item in List',
          :key='List.title',
          @click='listClick(item.guideUrl)'
        )
          img.carouselimg(
            v-if='item.image',
            :src='item.image.imageUrl + "?imwidth=241&imdensity=1"',
            :alt='item.title',
            loading='lazy'
          )
          template(v-if='item.title.length > 52')
            span-bold#title.-text.-link(fontSize='small') {{ item.title }}
            download-icon.-icons
          template(v-else)
            span-bold#title.-text.-link(fontSize='medium') {{ item.title }}
            download-icon.-icons
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'
import Next from '~/assets/icon/arrow-next.svg'
import DownloadIcon from '~/assets/icon/download.svg'
import { Heading, SpanBold, Span, Paragraph, ParagraphBold } from '~/components/atoms/typography'
type list = [{ daimei: string }]
@Component({
  components: {
    Heading,
    SpanBold,
    Span,
    Paragraph,
    ParagraphBold,
    Next,
    DownloadIcon
  }
})
export default class CarouselAmpNav extends Vue {
  @Prop() List?: list
  @Emit()
  listClick(url) {
    open(url, '_blank')
    //  親に教える
  }

  private goRights(): void {
    const scroll = document.getElementById('AmpSlides')
    if (scroll) {
      scroll.scrollLeft += 320
    }
  }

  private goLefts(): void {
    const scroll = document.getElementById('AmpSlides')
    if (scroll) {
      scroll.scrollLeft -= 320
    }
  }
}
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
    top: 34%
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
  #title
    line-height: 1.2
    font-weight: 800
  .nexts
    position: absolute
    right: -1%
    top: 34%
    width: 50px
    height: 50px
    border-radius: 50px
    background-color: #ffffff
    opacity: 0.6
    z-index: 10
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
        position: relative
        text-align: center
        flex: 1 1 auto
        .carouselimg
          width: 180px
          height: 300px
          margin: 10px 10px
          border-radius: 4px
          object-fit: cover
        .-link
          position: absolute
          top: 70%
          left: 0%
          padding: 0 20px
          line-height: 1.5em
          text-align: left
          color: white
        .-icons
          position: absolute
          top: 10%
          left: 75%
      .-items:hover
        opacity: 0.6
        cursor: pointer
@include pc_view
  .global-nav
    .-menu
      .-slide
        width: 100%
      .-main-menu
        .-items
          position: relative
          text-align: center
          flex: 1 1 auto
          .carouselimg
            width: 241px
            height: 180px
            margin: 10px 10px 10px 0px
            border-radius: 4px
            object-fit: cover
          .-link
            position: absolute
            top: 65%
            left: 0%
            padding: 0 10px
            line-height: 1.5em
            text-align: left
            color: white
          .-icons
            position: absolute
            top: 15%
            left: 80%
  .-slide::-webkit-scrollbar
    display: none
#title
  line-height: 1
  font-weight: 800
</style>
