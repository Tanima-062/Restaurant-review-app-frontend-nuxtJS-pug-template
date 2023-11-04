<template lang="pug">
.review-detail
  .not-reviews(v-if='reviews.length === 0')
    paragraph クチコミ情報はまだ投稿されていません。
  template(v-else)
    template(v-if='isReadMore')
      .reviews(v-for='review in displayingReviews', :key='review.id')
        review-card(:review='review')
      pagination.-pagination(
        v-if='reviews.length > 6',
        :nowPage='Number(nowPage)',
        :pageMax='maxPage',
        @updateDisplayPage='updateDisplayPage'
      )
    template(v-else)
      review-card(:review='reviews[0]')
      .read-more
        CTA-button(
          v-if='reviews.length',
          text='クチコミをもっと読む',
          type='secondary_sub',
          fontSize='medium',
          @click='isReadMore = true'
        )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import cloneDeep from 'lodash/cloneDeep'
import isFunction from 'lodash/isFunction'
import { Paragraph, ParagraphBold, Span, SpanBold } from '~/components/atoms/typography'
import { StoreTypes } from '~/types/storeTypes'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
import Pagination from '~/components/molecules/pagination/Pagination.vue'
import ReviewCard from '~/components/molecules/card/ReviewCard.vue'

@Component({
  components: {
    CTAButton,
    Pagination,
    Paragraph,
    ParagraphBold,
    ReviewCard,
    Span,
    SpanBold
  }
})
export default class ReviewDetail extends Vue {
  @Prop({ default: [] }) reviews!: StoreTypes.Review[]
  @Prop({ default: null }) scrollTop!: () => void | null
  nowPage = 1
  isReadMore = false
  get maxPage() {
    return Math.ceil(this.reviews.length / 5)
  }

  get displayingReviews() {
    return cloneDeep(this.reviews).slice((this.nowPage - 1) * 5, this.nowPage * 5)
  }

  defaultScrollTop = () => {
    const top = document.getElementsByClassName('review-detail')[0]
    if (top instanceof HTMLElement) {
      top.scrollIntoView(true)
    }
  }

  updateDisplayPage(value) {
    if (this.scrollTop && isFunction(this.scrollTop)) {
      this.scrollTop()
    } else {
      this.defaultScrollTop()
    }
    this.nowPage = value
  }
}
</script>
<style lang="sass" scoped>
.review-detail
  .not-reviews
    display: flex
    justify-content: center
    align-items: center
  .reviews
    margin-bottom: 16px
    border-bottom: solid 1px $gray
  .-pagination
    width: 65%
    margin: 20px auto
    @include pc_view
      margin: 25px auto
  .read-more
    display: flex
    justify-content: center
</style>
