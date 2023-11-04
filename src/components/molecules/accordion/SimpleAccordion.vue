<template lang="pug">
//- 細かい制御用にopenとcloseのクラスを付与する
.simple-accordion(
  :class='[isOpen ? "simple-accordion-open" : "simple-accordion-close"]'
)
  .accordion-header(@click='isOpen = !isOpen')
    p.title {{ title }}
    select-arrow(:class='{ open: isOpen }')
  .accordion-body(v-if='isOpen')
    slot
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import SelectArrow from '~/assets/icon/nextV2.svg'

@Component({
  components: {
    SelectArrow
  }
})
export default class SimpleAccordion extends Vue {
  @Prop({ default: false }) firstOpen!: boolean
  @Prop({ default: '' }) title!: string

  isOpen = false

  mounted() {
    setTimeout(() => {
      if (this.firstOpen) {
        this.isOpen = this.firstOpen
      }
    }, 0)
  }

  @Watch('firstOpen')
  initOpenFlag() {
    this.isOpen = this.firstOpen
  }
}
</script>

<style lang="sass" scoped>
.simple-accordion
  border-bottom: solid 1px $gray
  width: 100%
  @include sp_view
    width: calc(100% + 36px)
    margin-left: -16px
    margin-right: -16px
  .accordion-header
    padding: 24px 0
    cursor: pointer
    align-items: center
    display: grid
    position: relative
    @include sp_view
      margin: 0 16px
    .title
      line-height: 1
      font-size: 16px
      font-weight: bold
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      @include pc_view
        font-size: 18px
    svg
      position: absolute
      transform: rotate(90deg)
      right: 8px
      width: 12px
      height: 12px
      fill: $dark_gray
    .open
      transform: rotate(270deg)
  .accordion-body
    padding-bottom: 24px
    @include sp_view
      margin: 0 16px
</style>
