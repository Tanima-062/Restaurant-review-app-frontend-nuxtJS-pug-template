<template lang="pug">
div
  .tabitem
    cta-color-button#flexitem1(
      :fontSize='fontSize',
      :type='type',
      :text='textFirst',
      @click='clickTab(1)',
      :class='[selectedTab === 1 ? "nowitem" : ""]',
      :color='fontColors(1)',
      radius='3px 0px 0px 3px'
    )
    cta-color-button#flexitem2(
      :fontSize='fontSize',
      :type='type',
      :text='textSecound',
      @click='clickTab(2)',
      :class='[selectedTab === 2 ? "nowitem" : ""]',
      :color='fontColors(2)',
      :ComingSoon='!$feature("review")'
    )
    cta-color-button#flexitem3(
      :fontSize='fontSize',
      :type='type',
      :text='textThird',
      @click='clickTab(3)',
      :class='[selectedTab === 3 ? "nowitem" : ""]',
      :color='fontColors(3)',
      radius='0px 3px 3px 0px'
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
      return 'dark_gray'
    }
  }

  clickTab(num: number): void {
    this.switching(num)
  }
}
</script>
<style lang="sass" scoped>
.tabitem
  position: relative
  min-height: 75px
  width: 95%
  margin: 0 auto
  z-index: 1
  text-align: left
  display: flex
  #flexitem1
    line-height: 0px
    width: 33%
    height: 40px
    border: none
    outline: none
    &:hover
      opacity: 0.6
      @include sp_view
        opacity: 1
    &:active
      opacity: 0.6
  #flexitem2
    position: relative
    line-height: 0px
    width: 33%
    height: 40px
    border: none
    outline: none
  #flexitem3
    line-height: 0px
    width: 33%
    height: 40px
    border: none
    outline: none
    &:hover
      opacity: 0.6
      @include sp_view
        opacity: 1
    &:active
      opacity: 0.6
  .nowitem
    background-color: $sub_color
    color: white !important
  .circle
    position: absolute
    border-radius: 50%
    background-color: white
    border: solid 1px #e4e4e4
    width: 40px
    height: 40px
    outline: none
    margin: 3px
    right: 0%
    .-locationicon
      top: 0%
      left: 87%
      width: 26px
      height: 24px
      fill: #4d4d4d
</style>
