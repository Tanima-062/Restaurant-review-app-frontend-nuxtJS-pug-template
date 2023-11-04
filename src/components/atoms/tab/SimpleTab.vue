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
      radius='3px 0px 0px 3px',
      :ComingSoon='ComingSoon'
    )
    cta-color-button#flexitem2(
      :fontSize='fontSizeRight',
      :type='typeRight',
      :text='textRight',
      @click='rightclick()',
      :class='[selectedTab === 2 ? "nowitem" : ""]',
      :color='nowcolorright',
      radius='0px 3px 3px 0px'
    )
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
export default class SimpleTab extends Vue {
  @Prop() textLeft!: string
  @Prop() textRight!: string
  @Prop() typeLeft!: string
  @Prop() typeRight!: string
  @Prop() fontSizeLeft!: string
  @Prop() fontSizeRight!: string
  @Prop({ default: false }) ComingSoon!: boolean
  @Prop() selectedTab!: number

  //  初期値
  nowcolorleft = 'dark_gray'
  nowcolorright = 'white'

  mounted() {
    this.switchTab()
  }

  leftclick() {
    this.switching(1)
    this.nowcolorleft = 'white'
    this.nowcolorright = 'dark_gray'
  }

  rightclick() {
    this.switching(2)
    this.nowcolorleft = 'dark_gray'
    this.nowcolorright = 'white'
  }

  @Emit()
  switching(tabId: number): number {
    return tabId
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
  min-height: 75px
  width: 90%
  margin: 0 auto
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
    &:hover
      opacity: 0.6
      @include sp_view
        opacity: 1
    &:active
      opacity: 0.6
  #flexitem2
    position: relative
    line-height: 0px
    width: 50%
    height: 40px
    margin: 0 auto
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
    background-color: #1c5db5
</style>
