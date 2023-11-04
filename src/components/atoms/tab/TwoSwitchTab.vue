<template lang="pug">
div
  .tabitem
    cta-color-button#flexitem1(
      :fontSize='fontSizeLeft',
      :type='typeLeft',
      :text='textLeft',
      :style='"background-color:" + backgroundcolorLeft',
      :color='colorLeft',
      radius='3px 0px 0px 3px',
      :ComingSoon='!$feature("phase1")',
      @click='left()'
    )
    cta-color-button#flexitem2(
      :fontSize='fontSizeRight',
      :type='typeRight',
      :text='textRight',
      :style='"background-color:" + backgroundcolorRight',
      :color='colorRight',
      radius='0px 3px 3px 0px',
      @click='right()'
    )
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { Span } from '~/components/atoms/typography'
import CtaColorButton from '~/components/atoms/button/CtaColorButton.vue'
import { switchActiveServiceToRestaurant, switchActiveServiceToTakeout } from '~/utils/switchActiveService'

@Component({
  components: {
    Span,
    CtaColorButton
  }
})
export default class TwoSwitchTab extends Vue {
  @Prop() textLeft!: string
  @Prop() stating!: number
  @Prop() textRight!: string
  @Prop() typeLeft!: string
  @Prop() typeRight!: string
  @Prop() fontSizeLeft!: string
  @Prop() fontSizeRight!: string
  @Prop() colorLeft!: string
  @Prop() colorRight!: string
  @Prop() backgroundcolorLeft!: string
  @Prop() backgroundcolorRight!: string
  left() {
    this.$router.push('/restaurant')
    switchActiveServiceToRestaurant()
  }

  right() {
    this.$router.push('/takeout')
    switchActiveServiceToTakeout()
  }
}
</script>
<style lang="sass" scoped>
.tabitem
  min-height: 75px
  padding: 16px 0
  width: 100%
  z-index: 1
  text-align: center
  display: flex
  #flexitem1
    line-height: 0px
    width: 50%
    height: 40px
    margin: 0 auto
    border: none
    outline: none
    &:active
      opacity: 0.6
  #flexitem2
    line-height: 0px
    width: 50%
    height: 40px
    margin: 0 auto
    border: none
    outline: none
    &:active
      opacity: 0.6
@media screen and (min-width: 768px)
  .tabitem
    min-height: 75px
    padding: 24px 0
    width: 344px
    margin: 0 auto
    z-index: 1
    text-align: center
    display: flex
    #flexitem1
      line-height: 0px
      width: 50%
      height: 40px
      border: none
      outline: none
      &:hover
        opacity: 0.6
    #flexitem2
      line-height: 0px
      width: 50%
      height: 40px
      border: none
      outline: none
      &:hover
        opacity: 0.6
</style>
