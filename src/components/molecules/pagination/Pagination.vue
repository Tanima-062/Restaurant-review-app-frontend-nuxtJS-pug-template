<template lang="pug">
.search-result-footer
  button.-search-result-footer-button(
    @click='pagenation(nowPage - 1)',
    :class='{ disabled: isDisabledPrev }'
  )
    next.back
  Paragraph.-search-result-footer-text(fontSize='base') {{ nowPage }} / {{ pageMax }}
  button.-search-result-footer-button(
    @click='pagenation(nowPage + 1)',
    :class='{ disabled: isDisabledNext }'
  )
    next
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Emit } from 'nuxt-property-decorator'
import { Paragraph } from '~/components/atoms/typography'
import Next from '~/assets/icon/next.svg'

@Component({
  components: {
    Paragraph,
    Next
  }
})
export default class extends Vue {
  // 表示するページ
  @Prop() nowPage!: number
  // 表示するリストの長さ
  @Prop() pageMax!: number

  get isDisabledPrev(): boolean {
    return !(this.nowPage > 1)
  }

  get isDisabledNext(): boolean {
    return !(this.nowPage < this.pageMax)
  }

  @Emit('updateDisplayPage')
  pagenation(val: number) {
    if (val === 0 && this.isDisabledPrev) {
      return 0
    } else if (val === this.pageMax && this.isDisabledNext) {
      return 0
    }
    return val
  }
}
</script>
<style lang="sass" scoped>
.search-result-footer
  display: flex
  flex-shrink: 0
  justify-content: space-between
  align-items: center
  .-search-result-footer-button
    padding: 16px 24px
    background-color: $white
    border: 1px solid $gray
    border-radius: 3px
    width: 68px
    height: 52px
    line-height: 0
    cursor: pointer
    svg
      width: 20px
      height: 20px
      fill: $black
      text-align: center
    .back
      transform: rotate(180deg)
      display: inline-block
    &.disabled
      pointer-events: none
      opacity: .4
      svg
        fill: $dark_gray
  .-search-result-footer-button:active
    opacity: 0.6
  .-search-result-footer-text
    padding: 8px
@include pc_view
  .-search-result-footer-button:hover
    opacity: 0.6
</style>
