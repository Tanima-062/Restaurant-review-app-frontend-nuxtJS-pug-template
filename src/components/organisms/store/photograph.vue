<template lang="pug">
.photograph
  .flexbutton(:class='{ sticky: $feature("phase1") }')
    button.tops.first(
      @click='statingFlagChange(1)',
      :class='statingFlag === 1 ? "nowitems" : ""'
    ) すべて({{ images.length }})
    button.tops(
      @click='statingFlagChange(2)',
      :class='statingFlag === 2 ? "nowitems" : ""',
      :disabled='Counter(1) === 0'
    ) 料理({{ Counter(1) }})
    button.tops(
      @click='statingFlagChange(3)',
      :class='statingFlag === 3 ? "nowitems" : ""',
      :disabled='Counter(2) === 0'
    ) 内観/外観({{ Counter(2) }})
    button.tops.last(
      @click='statingFlagChange(4)',
      :class='statingFlag === 4 ? "nowitems" : ""',
      :disabled='Counter(3) === 0'
    ) その他({{ Counter(3) }})
  .photographCard(v-if='statingFlag === 1')
    image-store-block.child(
      :sidetitle='sidetitle',
      :sideprice='sideprice',
      :type='3',
      :textFlag='false',
      :stating='statingFlag',
      :key='statingFlag'
    )
  .photographCard(v-if='statingFlag === 2')
    image-store-block.child(
      :sidetitle='sidetitle',
      :sideprice='sideprice',
      :type='3',
      :textFlag='false',
      :stating='statingFlag',
      :key='statingFlag'
    )
  .photographCard(v-if='statingFlag === 3')
    image-store-block.child(
      :sidetitle='sidetitle',
      :sideprice='sideprice',
      :type='3',
      :textFlag='false',
      :stating='statingFlag',
      :key='statingFlag'
    )
  .photographCard(v-if='statingFlag === 4')
    image-store-block.child(
      :sidetitle='sidetitle',
      :sideprice='sideprice',
      :type='3',
      :textFlag='false',
      :stating='statingFlag',
      :key='statingFlag'
    )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Paragraph, ParagraphBold, Span, SpanBold } from '~/components/atoms/typography'
import ImageStoreBlock from '~/components/atoms/overlay/ImageStoreBlock.vue'
@Component({
  components: {
    Paragraph,
    ParagraphBold,
    Span,
    SpanBold,
    ImageStoreBlock
  }
})
export default class Photograph extends Vue {
  @Prop({ default: '鴨胸肉のロースト' }) title?: string
  sidetitle = '鴨肉のロースト'
  sideprice = '890'
  stating = 1
  isShow = false
  statingFlag = 1
  databox = [
    {
      type: 1,
      url: 'https://unsplash.it/630/400'
    }
  ]

  get images() {
    if (this.$store.getters['modules/listStore/getImage']) {
      if (this.$store.getters['modules/listStore/getImage'].length > 0) {
        return this.$store.getters['modules/listStore/getImage']
      }
    }
  }

  Counter(flags) {
    let viewPhoto = 0
    let otherPhoto = 0
    let foodPhoto = 0
    for (let i = 0; i < this.images.length; i++) {
      if (this.images[i].image.imageCd === 'MENU_MAIN') {
        foodPhoto++
      } else if (this.images[i].image.imageCd === 'STORE_INSIDE' || this.images[i].image.imageCd === 'STORE_OUTSIDE') {
        viewPhoto++
      } else if (this.images[i].image.imageCd === 'OTHER') {
        otherPhoto++
      } else {
        //
      }
    }
    if (flags === 1) {
      return foodPhoto
    } else if (flags === 2) {
      return viewPhoto
    } else {
      return otherPhoto
    }
  }

  statingFlagChange(id) {
    this.statingFlag = id
  }

  clickimg() {
    this.isShow = true
  }
}
</script>
<style lang="sass">
.photograph
  .flexbutton
    display: flex
    width: 100%
    background-color: #f4f4f4
    padding-bottom: 16px
  .sticky
    position: sticky
    top: 75px
    z-index: 1001
  .tops
    outline: none
    font-family: HiraKakuPro-W3
    font-size: 14px
    font-weight: normal
    position: relative
    display: flex
    justify-content: center
    flex: 1
    height: 30px
    text-align: center
    border: none
    text-decoration: none
    background-color: #f4f4f4
    padding-bottom: 20px
    border-bottom: solid 1px #a6a6a6
    z-index: 1
  .tops:active
    color: $gray
  .tops:disabled
    color: $dark_gray
  .first
    @include pc_view
      margin-left: 16px
  .last
    width: 33.5% !important
    @include pc_view
      margin-right: 16px
  // opacity使うと背景画像が透過するのでbackgroudで直接指定する
  .tops:hover
    opacity: 0.6
    cursor: pointer
    background: #f8f8f8
  .nowitems
    color: #1c5db5
    border-bottom: solid 3px #1c5db5
    font-weight: 600
  .photographCard
    background-color: white
    margin: 24px 0
  .pagenation
    background-color: white
    .-pagination
      margin: 0 auto
      padding-top: 0px
      padding-bottom: 0px
@include pc_view
  .photograph
    .pagenation
      background-color: white
      .-pagination
        width: 30%
        margin: 0 auto
        padding-top: 24px
        padding-bottom: 32px
    .tops:hover
      opacity: 0.8
</style>
