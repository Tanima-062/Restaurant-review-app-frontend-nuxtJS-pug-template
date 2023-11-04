<template lang="pug">
nuxt-link.recommendcard(
  :to='`/restaurant/detail/takeout/${recommendbox.store.id}/?type=take`'
)
  .imgarea
    img#-imgs.imgs(
      :src='recommendbox.thumbImage.imageUrl + "?imwidth=504&imdensity=1"',
      :alt='recommendbox.name',
      loading='lazy'
    )
  .content
    paragraph-bold.names(fontSize='medium') {{ recommendbox.name }}
    Paragraph.description.pt-10(fontSize='small') {{ recommendbox.description }}
      Span(v-if='recommendbox.price') （¥{{ recommendbox.price.price }}）
    paragraph-bold.pt-10(fontSize='small') {{ recommendbox.store.name }}
    .genreDistance
      Paragraph.genre(
        fontSize='tiny',
        v-if='recommendbox.store.genres',
        v-for='(genre, keys) in recommendbox.store.genres',
        :key='keys'
      ) {{ genre.name }}
      Paragraph(
        v-if='recommendbox.store.distance',
        fontSize='tiny',
        :class='[!recommendbox.store.genres && recommendbox.store.distance ? "distance-left" : "distance"]'
      ) {{ $distanceFormat(recommendbox.store.distance) }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Warning from '~/assets/icon/warning.svg'
import Info from '~/assets/icon/info-button-fill.svg'
import { RecommendTypes } from '~/types/recommendTypes'
import { Paragraph, ParagraphBold, SpanBold, Span } from '~/components/atoms/typography/'

@Component({
  components: {
    Span,
    Warning,
    Info,
    SpanBold,
    Paragraph,
    ParagraphBold
  }
})
export default class RecommendCard extends Vue {
  @Prop() recommendbox!: RecommendTypes.ListTypesTO
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
    .imgs
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
    .genre
      width: 100%
      text-align: left
    .distance
      width: 100%
      text-align: right
    .distance-left
      width: 100%
      text-align: left
.content
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
      .imgs
        width: 100%
        height: 366px
        text-align: center
    .names
      margin-top: 16px
</style>
