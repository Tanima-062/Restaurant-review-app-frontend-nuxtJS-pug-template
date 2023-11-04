<template lang="pug">
div
  .tabitems
    cta-color-button.btn(
      :fontSize='fontSize',
      :type='type',
      :text='textFirst',
      @click='switching(1)',
      :class='[selectedTab === 1 ? "nowitem" : ""]',
      :color='fontColors(1)',
      radius='3px 0 0 3px'
    )
    cta-color-button.btn(
      :fontSize='fontSize',
      :type='type',
      :text='textSecound',
      @click='switching(2)',
      :class='[selectedTab === 2 ? "nowitem" : ""]',
      :color='fontColors(2)',
      :ComingSoon='!$feature("review")'
    )
    cta-color-button.btn(
      :fontSize='fontSize',
      :type='type',
      :text='textThird',
      @click='switching(3)',
      :class='[selectedTab === 3 ? "nowitem" : ""]',
      :color='fontColors(3)'
    )
    cta-color-button.btn(
      :fontSize='fontSize',
      :type='type',
      :text='textFourth',
      @click='switching(4)',
      :class='[selectedTab === 4 ? "nowitem" : ""]',
      :color='fontColors(4)',
      radius='0 3px 3px 0'
    )
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Emit } from 'nuxt-property-decorator'
import { Span } from '~/components/atoms/typography'
import CtaColorButton from '~/components/atoms/button/CtaColorButton.vue'
import CheckIcon from '~/assets/icon/checkmark.svg'
import LocationIcon from '~/assets/icon/location.svg'

@Component({
  components: {
    Span,
    CtaColorButton,
    CheckIcon,
    LocationIcon
  }
})
export default class SimpleTab extends Vue {
  @Prop() textFirst!: string
  @Prop() textSecound!: string
  @Prop() textThird!: string
  @Prop() textFourth!: string
  @Prop() type!: string
  @Prop() fontSize!: string
  @Prop() selectedTab!: number

  //  初期値
  @Emit()
  switching(isState: number): number {
    return isState
  }

  private fontColors(num): string {
    if (this.selectedTab === num) {
      return 'white'
    } else {
      return 'spare_gray'
    }
  }
}
</script>
<style lang="sass" scoped>
.tabitems
  display: flex
  height: 44px
  padding: 0 16px
  .btn
    outline: none
    border: 1px solid $dark_gray
    &:not(:last-child)
      border-right: none
    &:hover
      active: 0.6
    @include pc_view
      &:hover
        opacity: 0.6
  .nowitem
    background-color: $sub_color
    color: white !important
</style>
