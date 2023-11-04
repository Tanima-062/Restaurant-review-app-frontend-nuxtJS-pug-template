<template lang="pug">
.review-card
  .review-card-header
    //- コスパがいい
    paragraph-bold.review-type(
      :class='colorChange(review.evaluationCd)',
      color='white',
      fontSize='tiny'
    ) {{ textChange(review.evaluationCd) }}
    //- 投稿日
    paragraph.post-text(fontSize='small') 投稿日：{{ formatDate }}
  .review-card-body
    //- 内容
    paragraph.review-card-body-text(fontSize='tiny') {{ isReadMore ? review.body : formatText }}

    paragraph.user-name(v-if='isReadMore && review.username', fontSize='tiny') {{ `${review.username}さん` }}
    //- もっと読む
    .read-more(v-if='!isReadMore')
      paragraph.read-more-button(
        @click='isReadMore = true',
        fontSize='small',
        color='main'
      ) もっと読む
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { format, parseISO } from 'date-fns'
import { Paragraph, ParagraphBold, Span, SpanBold } from '~/components/atoms/typography'
import { StoreTypes } from '~/types/storeTypes'

@Component({
  components: {
    Paragraph,
    ParagraphBold,
    Span,
    SpanBold
  }
})
export default class ReviewCard extends Vue {
  @Prop({ default: {} }) review!: StoreTypes.Review

  formatText = ''
  mounted() {
    // PCでの最小大きさ : 768pxなのでウインドウサイズがこれよりも小さいの場合はSPとして扱う
    const limitText = window.innerWidth < 768 ? 84 : 210
    // 32bit対応
    const textLength = this.review.body.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '+').length
    if (limitText <= textLength) {
      this.isReadMore = false
      this.formatText = this.review.body.slice(0, limitText - 1) + '…'
    }
  }

  isReadMore = true
  get formatDate() {
    return format(parseISO(this.review.createdAt), 'yyyy/MM/dd')
  }

  colorChange(cd) {
    if (cd === 'COOKING') {
      return 'red'
    } else if (cd === 'GOOD_DEAL') {
      return 'yellow'
    } else if (cd === 'SHINE') {
      return 'green'
    } else {
      return 'blue'
    }
  }

  textChange(cd) {
    if (cd === 'COOKING') {
      return '料理がいい！'
    } else if (cd === 'GOOD_DEAL') {
      return 'コスパがいい！'
    } else if (cd === 'SHINE') {
      return '映えがいい！'
    } else {
      return 'リピートしたい！'
    }
  }
}
</script>
<style lang="sass" scoped>
.review-card
  &-header
    display: flex
    justify-content: space-between
    .red
      background-color: #fa5a64
    .yellow
      background-color: #ffc11c
    .green
      background-color: #0d8116
    .blue
      background-color: #1c5db5
    .review-type
      width: 112px
      padding: 4px
      text-align: center
  &-body
    padding-top: 16px
    &-text
      @include pc_view
        font-size: 14px
    .user-name
      padding: 12px 0
      text-align: right
    .read-more
      padding: 12px 0
      display: flex
      justify-content: flex-end
      &-button
        width: max-content
        cursor: pointer
</style>
