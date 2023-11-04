<template lang="pug">
div(v-if="size === 's'").no-image-s
  image-single.-svg
  span No Image
div(v-else-if="size === 'm'").no-image-m
  image-single.-svg
  span No Image
div(v-else-if="size === 'xs'").no-image-xs
  image-single.-svg
  span No Image
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import ImageSingle from '~/assets/icon/image-single.svg'

@Component({ components: { ImageSingle } })
export default class NoImage extends Vue {
  @Prop({ default: 's' }) size!: 's' | 'm' | 'xs'
}
</script>
<style lang="sass" scoped>
.no-image-xs
  width: 100%
  height: 100%
  background-color: #e4e4e4
  display: flex
  justify-content: center
  align-items: center
  span
    color: #fff
    font-size: 14px
    font-weight: 700
  .-svg
    width: 16px
    height: 16px
    margin-right: 8px
.no-image-s
  width: 100%
  height: 100%
  background-color: #e4e4e4
  display: flex
  justify-content: center
  align-items: center
  span
    color: #fff
    font-size: 16px
    font-weight: 700
  .-svg
    width: 24px
    height: 24px
    margin-right: 8px
.no-image-m
  width: 100%
  height: 100%
  background-color: #e4e4e4
  display: flex
  justify-content: center
  align-items: center
  span
    color: #fff
    font-size: 32px
    font-weight: 700
  .-svg
    width: 48px
    height: 48px
    margin-right: 16px
</style>
