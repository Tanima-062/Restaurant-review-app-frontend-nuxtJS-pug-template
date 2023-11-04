<template lang="pug">
  div.plus-minus-counter(:style="counterStyle")
    div.-button(@click="decrement" :class="{disabled: isDecrementDisabled}")
      paragraph-bold(fontSize="large" textAlign="center" color="main").-icon-text ー
    div.-current-count {{ currentCount }}
    div.-button(@click="increment" :class="{disabled: isIncrementDisabled}")
      paragraph-bold(fontSize="large" textAlign="center" color="main").-icon-text ＋
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'
import ParagraphBold from '~/components/atoms/typography/ParagraphBold.vue'

@Component({
  components: {
    ParagraphBold
  }
})
export default class PlusMinusCounter extends Vue {
  @Prop({ default: 0 }) minCount?: number
  @Prop({}) maxCount!: number
  @Prop() currentCount!: number
  @Prop({ default: '160px' }) width?: string

  get counterStyle() {
    return { width: this.width }
  }

  get isIncrementDisabled(): boolean {
    return this.maxCount <= this.currentCount
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
    this.changeCount(this.currentCount + 1)
  }

  decrement(): void {
    if (this.isDecrementDisabled) {
      return
    }
    this.changeCount(this.currentCount - 1)
  }

  @Emit()
  changeCount(newCount: number): number {
    return newCount
  }
}
</script>

<style lang="sass" scoped>
$counter_button_height: 50px
$counter_button_width: 52px
.plus-minus-counter
  display: flex
  justify-content: space-between
  .-button
    width: $counter_button_width
    height: $counter_button_height
    border-radius: 3px
    border: 1px solid $main_color
    cursor: pointer
  .disabled
    cursor: not-allowed
    opacity: 0.5
  .font-size-large.-icon-text
    line-height: $counter_button_height
  .-current-count
    line-height: $counter_button_height
    font-weight: bold
    font-size: 20px
</style>
