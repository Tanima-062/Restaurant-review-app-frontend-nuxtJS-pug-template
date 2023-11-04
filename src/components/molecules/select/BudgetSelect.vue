<template lang="pug">
.budget-select
  select-box(@change='change')
    option(
      v-for='item in prices',
      :selected='item.price === selectedPrice',
      :value='item.price',
      :label='item.text',
      :key='item.price',
      :disabled='isDisabled(item.price)'
    ) {{ item.text }}
  select-arrow.-selecticon
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'
import SelectArrow from '~/assets/icon/nextV2.svg'
import SelectBox from '~/components/molecules/select/SelectBox.vue'
@Component({
  components: {
    SelectArrow,
    SelectBox
  }
})
export default class BudgetSelect extends Vue {
  @Prop({ default: true }) isLower!: boolean
  @Prop({ default: null }) selectedPrice!: null | number
  @Prop({ default: null }) standardPrice!: null | number
  prices: { text: string; price: null | number }[] = []
  mounted() {
    const PRICELIST: { text: string; price: null | number }[] = [
      { text: '1,000円', price: 1000 },
      { text: '2,000円', price: 2000 },
      { text: '3,000円', price: 3000 },
      { text: '4,000円', price: 4000 },
      { text: '5,000円', price: 5000 },
      { text: '7,000円', price: 7000 },
      { text: '10,000円', price: 10000 },
      { text: '15,000円', price: 15000 },
      { text: '20,000円', price: 20000 },
      { text: '30,000円', price: 30000 }
    ]
    const lowerText: { text: string; price: null | number }[] = [{ text: '下限なし', price: null }]
    const upperText: { text: string; price: null | number }[] = [{ text: '上限なし', price: null }]
    this.prices = this.isLower ? lowerText.concat(PRICELIST) : PRICELIST.concat(upperText)
  }

  isDisabled(price) {
    if (this.standardPrice === null || price === null) {
      return false
    } else if (this.isLower) {
      return this.standardPrice <= price
    } else {
      return this.standardPrice >= price
    }
  }

  @Emit()
  change(price): number | null {
    return price === '' ? null : +price
  }
}
</script>

<style lang="sass" scoped>
.budget-select
  position: relative
  .-selecticon
    pointer-events: none
    transform: rotate(90deg)
    position: absolute
    top: 56%
    right: 16px
    margin-top: -12px
    width: 16px
    height: 24px
    fill: $dark_gray
</style>
