<template lang="pug">
div.item-price(:class="{has_quantity: quantity}")
  div.-item
    span-bold(v-if="itemSpanBold" :color="itemColor" :fontSize='itemFontSize') {{item}}
    Span(v-else :color="itemColor" :fontSize='itemFontSize') {{item}}
  div(v-if='quantity').-quantity
    Span {{quantity}}
  div.-price
    span-bold(v-if="itemSpanBold" :color="priceColor" :fontSize='unitFontSize') {{unit}}
    Span(v-else :color="priceColor" :fontSize='unitFontSize') {{unit}}
    span-bold(v-if="priceSpanBold" :fontSize='priceFontSize' textAlign='right' :color="priceColor") {{localePrice}}
    Span(v-else :fontSize='priceFontSize' textAlign='right' :color="priceColor") {{localePrice}}
    Span.-tax(v-if="tax" textAlign='right' :fontSize='taxFontSize' :color="taxColor") {{tax}}
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { Span, SpanBold } from '~/components/atoms/typography'

@Component({
  components: {
    Span,
    SpanBold
  }
})
export default class ItemPrice extends Vue {
  @Prop() item!: string
  @Prop({ default: 'black' }) itemColor?: string
  @Prop({ default: 'base' }) itemFontSize?: string
  @Prop({ type: Boolean, default: false }) itemSpanBold?: boolean
  @Prop() quantity?: number
  @Prop() price!: number
  @Prop({ default: 'black' }) priceColor!: string
  @Prop({ default: 'base' }) priceFontSize?: string
  @Prop({ type: Boolean, default: false }) priceSpanBold?: boolean
  @Prop() unit!: string
  @Prop({ default: 'base' }) unitFontSize?: string
  @Prop({ type: Boolean, default: false }) unitSpanBold?: boolean
  @Prop() tax!: string
  @Prop({ default: 'small' }) taxFontSize?: string
  @Prop({ default: 'base' }) taxColor?: string

  get localePrice() {
    return this.price.toLocaleString()
  }
}
</script>
<style lang="sass" scoped>
.item-price
  display: grid
  grid-template-columns: 1fr 1fr
  -ms-grid-columns: 1fr 1fr
  grid-template-areas: "item price"
  .-item
    grid-area: item
  .-quantity
    text-align: right
    grid-area: quantity
  .-price
    text-align: right
    grid-area: price
    .-unit
      display: inline-block
    .-tax
      display: block
.has_quantity
  grid-template-columns: 1fr 100px 1fr
  grid-template-areas: "item quantity price"
</style>
