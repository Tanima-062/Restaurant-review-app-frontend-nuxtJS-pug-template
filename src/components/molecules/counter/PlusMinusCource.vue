<template lang="pug">
.plus-minus-counter(:style='counterStyle')
  .-button(@click='decrement', :class='{ disabled: isDecrementDisabled }')
    paragraph-bold.-icon-text(
      fontSize='m',
      textAlign='center',
      :color='fontcolor'
    ) ー
  .-current-count(:style='{ color: numcolor }') {{ currentCount }}
  .-button(@click='increment', :class='{ disabled: isIncrementDisabled }')
    paragraph-bold.-icon-text(
      fontSize='m',
      textAlign='center',
      :color='fontcolor'
    ) ＋
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'
import ParagraphBold from '~/components/atoms/typography/ParagraphBold.vue'

@Component({
  components: {
    ParagraphBold
  }
})
export default class PlusMinusCource extends Vue {
  @Prop({ default: 0 }) minCount?: number
  @Prop({}) maxCount!: number
  @Prop({}) currentCount!: number
  @Prop({}) price!: number
  @Prop({}) identifier!: number
  @Prop({ default: '160px' }) width?: string
  @Prop({ default: 'black' }) fontcolor?: string
  @Prop({ default: 'black' }) numcolor?: string
  get counterStyle() {
    return { width: this.width }
  }

  get isIncrementDisabled(): boolean {
    return this.maxCount > 10 ? this.currentCount >= 10 : this.maxCount <= this.currentCount
  }

  get isDecrementDisabled(): boolean {
    if (this.minCount !== undefined) {
      return this.minCount >= this.currentCount
    } else {
      return false
    }
  }

  increment(): void {
    if (this.isIncrementDisabled) {
      return
    }
    this.changeCount(this.currentCount + 1, this.price, 1, this.identifier)
  }

  decrement(): void {
    if (this.isDecrementDisabled) {
      return
    }
    this.changeCount(this.currentCount - 1, this.price, 0, this.identifier)
  }

  @Emit()
  changeCount(newCount: number, price: number, upDown: number, identifier: number) {
    return { newCount, price, upDown, identifier }
  }
}
</script>

<style lang="sass" scoped>
$counter_button_height: 20px
$counter_button_width: 22px
.plus-minus-counter
  display: flex
  justify-content: space-between
  .-button
    width: $counter_button_width
    height: $counter_button_height
    border-radius: 50%
    border: 1px solid #e4e4e4
    cursor: pointer
    line-height: 1.4em
  .disabled
    cursor: not-allowed
    opacity: 0.5
  .font-size-large.-icon-text
    line-height: $counter_button_height
  .-current-count
    line-height: $counter_button_height
    font-weight: bold
    font-size: 16px
@include pc_view
  .plus-minus-counter
    .-button
      width: $counter_button_width
      height: $counter_button_height
      border-radius: 50%
      border: 1px solid #e4e4e4
      cursor: pointer
      line-height: 1.2em
</style>
