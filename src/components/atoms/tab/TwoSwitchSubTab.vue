<template lang="pug">
.tabitem
  button.tops(
    @click='switching(1)',
    :disabled='ComingSoon',
    :class='selectedTab === 1 ? "nowitems" : ""'
  ) {{ textFirst }}
    paragraph.comingsoon(v-if='ComingSoon', fontSize='tiny') Coming Soon!
  button.tops(
    @click='switching(2)',
    :class='selectedTab === 2 ? "nowitems" : ""'
  ) {{ textSecond }}
</template>
<script lang="ts">
import Vue from 'vue'
import { Prop, Component, Emit } from 'nuxt-property-decorator'
import { Span, SpanBold, Paragraph, ParagraphBold } from '~/components/atoms/typography'

@Component({
  components: {
    SpanBold,
    Span,
    Paragraph,
    ParagraphBold
  }
})
export default class TwoSwitchSubTab extends Vue {
  @Prop() textFirst!: string
  @Prop() textSecond!: string
  @Prop() appType?: string
  @Prop({ default: false }) ComingSoon!: boolean
  @Prop() selectedTab!: number

  @Emit()
  switching(isState: number): number {
    return isState
  }
}
</script>
<style lang="sass" scoped>
.tabitem
  display: flex
  justify-content: center
  padding: 0 16px
  .tops
    position: relative
    display: block
    flex: 1
    height: 40px
    margin-bottom: 20px
    font-size: 16px
    text-align: center
    background-color: $light_gray
    outline: none
    border: none
    border-bottom: solid 1px $dark_gray
    z-index: 1
    &:hover
      opacity: 0.6
      cursor: pointer
    &:disabled
      font-size: 14px
      color: $dark_gray
      line-height: 1
      opacity: 1
  .comingsoon
    color: $dark_gray
    font-size: 10px
  .nowitems
    color: $sub_color
    border-bottom: solid 3px $sub_color
    font-weight: 600
</style>
