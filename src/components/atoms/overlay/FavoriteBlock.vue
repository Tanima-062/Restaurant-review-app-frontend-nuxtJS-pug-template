<template lang="pug">
.card-box
  .card
    img(
      src='https://unsplash.it/630/400',
      @click='click()',
      :class='[isFlag == 1 || isFlag == 2 ? "filter" : ""]'
    )
    Cross#-icon(@click='DeleteFav')
    span(v-if='isFlag == 0')
    span(v-if='isFlag == 1')
      paragraph#onImgText 売り切れ
    span(v-if='isFlag == 2')
      paragraph#onImgText 販売終了
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'nuxt-property-decorator'
import { Heading, SpanBold, Span, Paragraph, ParagraphBold } from '~/components/atoms/typography'
import Cross from '~/assets/icon/modal-close.svg'
@Component({
  components: {
    Heading,
    SpanBold,
    Span,
    Paragraph,
    ParagraphBold,
    Cross
  }
})
export default class ChildBox extends Vue {
  @Prop({ default: '料理名' }) sidetitle?: string
  @Prop({ default: 432 }) sideprice?: number
  @Prop({ default: 0 }) isFlag?: number
  count = 0
  click(): void {
    switch (this.isFlag) {
      case 0:
        this.modalopen()
        break
      case 1:
        console.log('売り切れ')
        break
      default:
        console.log('販売終了してる')
    }
  }

  DeleteFav(): void {
    // console.log('×を押したよ')
  }

  @Emit()
  modalopen(): void {
    // 親に伝えるだけ
  }
}
</script>

<style lang="sass">
.card
  position: relative
  #-icon
    position: absolute
    top: 0%
    left: 85%
    width: 15px
    fill: $white
  #onImgText
    position: absolute
    color: white
    top: 40%
    left: 30%
  img
    transition: filter 0.3s
    width: 123px
    height: 123px
.filter
  filter: invert(25%)
</style>
