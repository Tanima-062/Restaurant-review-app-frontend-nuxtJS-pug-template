<template lang="pug">
div
  .tabitem
    cta-color-button#flexitem1(
      :fontSize='fontSizeLeft',
      :type='typeLeft',
      :text='textLeft',
      @click='leftclick()',
      :class='[selectedTab === 1 ? "nowitem" : ""]',
      :color='nowcolorleft',
      @my-hover='changeLeft()',
      @hover-out='hoverOutLeft()',
      :disabled='leftDisabled'
    )
    cta-color-button#flexitem2(
      :fontSize='fontSizeRight',
      :type='typeRight',
      :text='textRight',
      @click='rightclick()',
      :class='[selectedTab === 2 ? "nowitem" : ""]',
      :color='nowcolorright',
      :CheckIcon='true',
      @my-hover='change()',
      @hover-out='hoverOut()',
      :disabled='rightDisabled'
    )
    .triangleRight(v-if='selectedTab === 2', :class='{ hover: isActive }')
    .triangleLeft(v-else, :class='{ hover: isActiveLeft }')
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Emit, Watch } from 'nuxt-property-decorator'
import { Span } from '~/components/atoms/typography'
import CtaColorButton from '~/components/atoms/button/CtaColorButton.vue'
import CheckIcon from '~/assets/icon/checkmark.svg'

@Component({
  components: {
    Span,
    CtaColorButton,
    CheckIcon
  }
})
export default class OthersTab extends Vue {
  @Prop() textLeft!: string
  @Prop() textRight!: string
  @Prop() typeLeft!: string
  @Prop() typeRight!: string
  @Prop() fontSizeLeft!: string
  @Prop() fontSizeRight!: string
  @Prop() selectedTab!: number
  //  初期値
  nowcolorleft = 'dark_gray'
  nowcolorright = 'white'
  isActive = false
  isActiveLeft = false
  leftDisabled = false
  rightDisabled = true

  mounted() {
    this.switchTab()
  }

  leftclick() {
    this.switching(1)
    this.nowcolorleft = 'white'
    this.nowcolorright = 'white'
    this.leftDisabled = true
    this.rightDisabled = false
  }

  rightclick() {
    this.switching(2)
    this.nowcolorleft = 'dark_gray'
    this.nowcolorright = 'white'
    this.leftDisabled = false
    this.rightDisabled = true
  }

  change() {
    this.isActive = true
  }

  hoverOut() {
    this.isActive = false
  }

  changeLeft() {
    this.isActiveLeft = true
  }

  hoverOutLeft() {
    this.isActiveLeft = false
  }

  @Emit()
  switching(isState: number): number {
    return isState
  }

  @Watch('selectedTab')
  switchTab() {
    if (this.selectedTab === 1) {
      this.leftclick()
    } else {
      this.rightclick()
    }
  }
}
</script>
<style lang="sass" scoped>
.tabitem
  position: relative
  min-height: 70px
  width: 100%
  z-index: 1
  text-align: center
  display: flex
  margin: 0px auto
  #flexitem1
    width: 29%
    height: 40px
    line-height: 0px
    margin: 0 auto
    outline: none
  #flexitem1:hover
    opacity: 0.6
    @include sp_view
      opacity: 1
  #flexitem2
    position: relative
    line-height: 0px
    width: 70%
    height: 40px
    margin: 0 auto
    outline: none
  .checkicon
    position: absolute
    fill: #ffc11c
    top: 5%
    left: 50%
    width: 18px
    text-align: center
  .triangleRight
    position: absolute
    top: 55%
    left: 63.8%
    border-top: 13px solid #1c5db5
    border-right: 7px solid transparent
    border-left: 7px solid transparent
  .triangleRight.hover
    position: absolute
    top: 55%
    left: 63.8%
    border-top: 13px solid $sub_color
    border-right: 7px solid transparent
    border-left: 7px solid transparent
    @include sp_view
      border-top: 13px solid #1c5db5
      border-right: 7px solid transparent
      border-left: 7px solid transparent
  .triangleLeft
    position: absolute
    top: 56%
    left: 14%
    border-top: 13px solid #1c5db5
    border-right: 7px solid transparent
    border-left: 7px solid transparent
    @include sp_view
      left: 13.1%
  .triangleLeft.hover
    @include pc_view
      opacity: 0.6
  .nowitem
    background-color: $sub_color
    background-color: #1c5db5
</style>
