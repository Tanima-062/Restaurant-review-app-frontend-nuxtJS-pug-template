<template lang="pug">
  div.credit-card-brands
    credit-card(brand='visa' v-if="showVisa").credit-card
    credit-card(brand='master' v-if="showMaster").credit-card
    credit-card(brand='jcb' v-if="showJcb").credit-card
    credit-card(brand='amex' v-if="showAmex").credit-card
    credit-card(brand='diners' v-if="showDiners").credit-card
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import CreditCard from '~/components/atoms/icons/CreditCard.vue'

@Component({
  components: {
    CreditCard
  }
})
export default class CreditCardBrands extends Vue {
  @Prop({ default: true }) showVisa!: boolean
  @Prop({ default: true }) showMaster!: boolean
  @Prop({ default: true }) showJcb!: boolean
  @Prop({ default: true }) showAmex!: boolean
  @Prop({ default: true }) showDiners!: boolean
}
</script>
<style lang="sass" scoped>
.credit-card-brands
  .credit-card
    &:not(:first-child)
      margin-left: 16px
</style>
