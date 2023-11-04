<template lang="pug">
.fromHere(@mouseover='mouseOverAction', @mouseleave='mouseLeaveAction')
  location-mark-icon#icon.-icon(
    @click='clickBtn',
    :class='[mouseover ? "fillBule" : ""]'
  )
  Paragraph.-text(
    color='dark_gray',
    fontSize='small',
    @click='clickBtn',
    :class='[mouseover ? "fillBule" : ""]'
  ) 現在地
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import LocationMarkIcon from '~/assets/icon/location-mark.svg'
import { SpanBold, Span, Paragraph } from '~/components/atoms/typography'
// type positionType = {
//   latitude: number
//   longitude: number
// }
@Component({
  components: {
    Paragraph,
    SpanBold,
    Span,
    LocationMarkIcon
  }
})
export default class AreaHereButton extends Vue {
  mouseover = false
  mouseOverAction() {
    this.mouseover = true
  }

  mouseLeaveAction() {
    this.mouseover = false
  }

  clickBtn() {
    this.$router.push('/map/')
  }
}
</script>
<style lang="sass" scoped>
.fromHere
  display: flex
  width: 87px
  .-icon
    width: 16px
    height: 16px
    margin-top: -2px
    fill: $dark_gray
  .-text
    margin-left: 6px
  .fillBule
    fill: #1c5db5
    color: #1c5db5
    font-weight: bold
@include pc_view
  .fromHere
    display: flex
    width: 87px
    .-icon
      width: 16px
      height: 16px
      margin-top: -1px
      fill: $dark_gray
    .-text
      margin-left: 7px
    .fillBule
      fill: #1c5db5
      color: #1c5db5
      font-weight: bold
</style>
