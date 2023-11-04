<template lang="pug">
div
  .tabitem
    cta-color-button#flexitem1(
      :type='typeLeft',
      :text='textLeft',
      @click='leftclick()',
      :class='[stating === 1 ? "nowitem" : ""]',
      :color='nowcolorleft'
    )
    cta-color-button#flexitem2(
      :type='typeRight',
      :text='textRight',
      @click='rightclick()',
      :class='[stating === 2 ? "nowitem" : ""]',
      :color='nowcolorright'
    )
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Emit } from 'nuxt-property-decorator'
import { Span } from '~/components/atoms/typography'
import CtaColorButton from '~/components/atoms/button/CtaColorButton.vue'

@Component({
  components: {
    Span,
    CtaColorButton
  }
})
export default class AdminTab extends Vue {
  @Prop() textLeft!: string
  @Prop() textRight!: string
  @Prop() typeLeft!: string
  @Prop() typeRight!: string
  @Prop() fontSizeLeft!: string
  @Prop() fontSizeRight!: string
  //  初期値
  stating = 1
  nowcolorleft = 'white'
  nowcolorright = 'dark_gray'

  leftclick() {
    this.switching(1)
    this.stating = 1
    this.nowcolorleft = 'white'
    this.nowcolorright = 'dark_gray'
  }

  rightclick() {
    this.switching(2)
    this.stating = 2
    this.nowcolorleft = 'dark_gray'
    this.nowcolorright = 'white'
  }

  @Emit()
  switching(isState: number): number {
    return isState
  }
}
</script>
<style lang="sass" scoped>
.tabitem
  min-height: 110px
  padding-top: 15px
  width: 100%
  z-index: 1
  text-align: center
  display: flex
  font-size: 20px !important
#flexitem1
  line-height: 0px
  width: 48%
  height: 60px
  margin: 0 auto
  border: none
  outline: none
#flexitem2
  line-height: 0px
  width: 48%
  height: 60px
  margin: 0 auto
  border: none
  outline: none
.nowitem
  background-color: #1ba1ff
</style>
