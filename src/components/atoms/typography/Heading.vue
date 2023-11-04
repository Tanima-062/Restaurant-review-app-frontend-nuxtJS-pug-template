<template lang="pug">
h1(v-if="number === 1" :class='getHeadingClass()')
  slot
h2(v-else-if="number === 2" :class='getHeadingClass()')
  slot
h3(v-else-if="number === 3" :class='getHeadingClass()')
  slot
h4(v-else-if="number === 4" :class='getHeadingClass()')
  slot
h5(v-else-if="number === 5" :class='getHeadingClass()')
  slot
h6(v-else-if="number === 6" :class='getHeadingClass()')
  slot
h1(v-else :class='getHeadingClass()')
  slot
</template>
<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'nuxt-property-decorator'

@Component
export default class Heading extends Vue {
  @Prop({ default: 1 }) number?: 1 | 2 | 3 | 4 | 5 | 6
  @Prop() fontSize?: 'l' | 'm' | 's'

  getHeadingClass(): string {
    switch (this.fontSize) {
      case 'l':
        return 'heading-large'
      case 'm':
        return 'heading-middle'
      case 's':
        return 'heading-small'
      default:
        return ''
    }
  }
}
</script>
<style lang="sass" scoped>
/*
  ** スタイル指定はTextStyler.vueと同様
  */
.heading-large
  @include pc_view
    font-size: $font_size_huge
    line-height: 1.4
    @include lineHeightCrop(1.4)
  @include sp_view
    font-size: $font_size_big
    line-height: 1.4
    @include lineHeightCrop(1.4)
.heading-middle
  @include pc_view
    font-size: $font_size_big
    line-height: 1.4
    @include lineHeightCrop(1.4)
  @include sp_view
    font-size: $font_size_large
    line-height: 1.4
    @include lineHeightCrop(1.4)
.heading-small
  @include pc_view
    font-size: $font_size_large
    line-height: 1.4
    @include lineHeightCrop(1.4)
  @include sp_view
    font-size: $font_size_medium
    line-height: 1.4
    @include lineHeightCrop(1.4)
</style>
