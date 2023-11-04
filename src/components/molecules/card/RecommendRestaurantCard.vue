<template lang="pug">
nuxt-link.recommendcard(:to='"/restaurant/detail/takeout/" + recommendbox.id')
  .imgarea
    img#-imgs.imgs(
      v-if='recommendbox.thumbImage.imageUrl',
      :src='recommendbox.thumbImage.imageUrl + "?imwidth=504&imdensity=1"',
      :alt='recommendbox.name',
      loading='lazy'
    )
    no-image.-img(v-else, size='xs')
  .text
    paragraph-bold.names(fontSize='medium') {{ recommendbox.name }}
    Paragraph.description.pt-10(fontSize='tiny') {{ recommendbox.description }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Warning from '~/assets/icon/warning.svg'
import Info from '~/assets/icon/info-button-fill.svg'
import NoImage from '~/components/atoms/noImage/index.vue'
import { Paragraph, ParagraphBold, SpanBold, Span } from '~/components/atoms/typography/'

@Component({
  components: {
    Span,
    Warning,
    Info,
    SpanBold,
    Paragraph,
    ParagraphBold,
    NoImage
  }
})
export default class RestaurantRecommendCard extends Vue {
  @Prop() recommendbox
  @Prop() keys!: number
  @Prop() boxLength!: number
}
</script>
<style lang="sass" scoped>
.recommendcard
  width: 100%
  &:hover
    opacity: 0.6
  .pt-10
    padding: 5px 0
  .imgarea
    width: 100%
    height: 240px
    text-align: center
    overflow-y: hidden
    #-imgs
      width: 100%
      height: 100%
      min-height: 280px
      text-align: center
      object-fit: cover
  .names
    margin-top: 16px
  .genreDistance
    display: flex
    margin-bottom: 30px
    #genre
      width: 50%
      text-align: left
    #distance
      width: 50%
      text-align: right
.text
  padding: 0 16px
  @media screen and (min-width: 1024px)
    padding: 0
  .description
    white-space: pre-wrap
@media screen and (min-width: 1024px)
  .recommendcard
    width: 100%
    margin: 10px auto
    .pt-10
      padding: 5px 0
    .imgarea
      width: 100%
      height: 366px
      text-align: center
      overflow-y: hidden
      #-imgs
        width: 100%
        height: 100%
        min-height: 366px
        text-align: center
    .names
      margin-top: 16px
</style>
