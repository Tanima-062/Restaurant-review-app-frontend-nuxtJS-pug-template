<template lang="pug">
header.wrapper
  .inner
    nuxt-link(:to='path', v-if='path !== ""')
      component.-icon(is='next')
    heading.-title(:number='1') {{ title }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import Next from '~/assets/icon/arrow.svg'
import Heading from '~/components/atoms/typography/Heading.vue'

@Component({
  components: {
    Next,
    Heading
  }
})
export default class ReservationHeader extends Vue {
  @Prop({ default: '' }) title?: string
  @Prop({ default: '' }) path?: string
}
</script>

<style lang="sass" scoped>
.wrapper
  display: flex
  justify-content: center
  width: 100%
  height: 48px
  background: $main_color
  .inner
    position: relative
    display: flex
    justify-content: center
    align-items: center
    width: 100%
    max-width: 1024px
a
  position: absolute
  display: flex
  justify-content: center
  align-items: center
  width: 48px
  height: 48px
  left: 0
.-icon
  transform: rotate(-180deg)
  width: 28px
  height: 24px
  display: inline-block
  fill: $white
  position: absolute
.-title
  text-align: center
  width: 80%
  font-size: 16px
  font-weight: 600
  color: $white
  margin: 0 auto
@include pc_view
  .-icon
    transform: rotate(-180deg)
    width: 28px
    height: 24px
    display: inline-block
    fill: $white
  .wrapper
    display: flex
    justify-content: center
    width: 100%
    height: 60px
    background: $main_color
    .inner
      position: relative
      display: flex
      justify-content: center
      align-items: center
      width: 100%
      max-width: 1024px
  .-title
    font-size: 16px
    font-weight: 600
    color: $white
    margin: 0 auto
</style>
