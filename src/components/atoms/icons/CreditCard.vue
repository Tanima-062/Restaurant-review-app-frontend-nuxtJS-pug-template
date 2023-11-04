<template lang="pug">
component(:is="brand" :class="`${brand}`")
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import Visa from '~/assets/creditCard/visa.svg'
import Master from '~/assets/creditCard/master.svg'
import Jcb from '~/assets/creditCard/jcb.svg'
import Amex from '~/assets/creditCard/amex.svg'
import Diners from '~/assets/creditCard/diners.svg'

@Component({
  components: {
    Visa,
    Master,
    Jcb,
    Amex,
    Diners
  }
})
export default class CreditCard extends Vue {
  @Prop() brand!: 'visa' | 'master' | 'jcb' | 'amex' | 'diners'

  get getBrand() {
    return `-${this.brand}`
  }
}
</script>
<style lang="sass" scoped>
.credit-card
  display: inline-block
  height: 30px
  width: 30px
</style>
