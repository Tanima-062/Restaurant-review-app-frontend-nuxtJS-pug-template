<template lang="pug">
.fromHere
  paragraph.fromHere-labels
    span-bold.fromHere-text 現在地を選択
    location-mark-icon.-icon(
      @click='clickBtn',
      :class='[disabledSwitch ? "fillBule" : ""]'
    )
    Span.-text(
      fontSize='medium',
      @click='clickBtn',
      :class='[disabledSwitch ? "fillBule" : ""]'
    ) 現在地
  geo-location(v-if='locationFlag', @denied='denied')
</template>
<script lang="ts">
import { Vue, Component, Emit } from 'nuxt-property-decorator'
import GeoLocation from '~/components/atoms/Location/GeoLocation.vue'
import LocationMarkIcon from '~/assets/icon/location-mark.svg'
import { SpanBold, Span, Paragraph, ParagraphBold } from '~/components/atoms/typography'
// type positionType = {
//   latitude: number
//   longitude: number
// }
@Component({
  components: {
    Paragraph,
    ParagraphBold,
    SpanBold,
    Span,
    GeoLocation,
    LocationMarkIcon
  }
})
export default class FromHereButton extends Vue {
  locationFlag = this.disabledSwitch
  private currentPosition = { latitude: 0, longitude: 0 }
  clickBtn() {
    if (this.disabledSwitch) {
      this.locationFlag = true
    }
    this.locationFlag = !this.locationFlag
    this.pushBtn()
    if (this.locationFlag === false) {
      this.$store.dispatch('modules/user/resetLocation')
    } else {
      //
    }
  }

  get locationInfo() {
    return this.$store.getters['modules/user/getLocationInfo']
  }

  get disabledSwitch(): boolean {
    if (this.locationInfo.latitude != null) {
      // 位置情報セットされている
      return true
    } else {
      // 位置情報セットされていない
      return false
    }
  }

  @Emit()
  pushBtn() {
    // 親に伝える
  }

  @Emit()
  denied() {
    this.locationFlag = false
  }
}
</script>
<style lang="sass" scoped>
.fromHere
  width: 100%
  .fromHere-labels
    position: relative
    margin-left: 30px
    font-size: 10px
    color: #a6a6a6
    .fromHere-text
      font-size: 12px
      color: #a6a6a6
    .-icon
      position: absolute
      top: 105%
      left: 0
      width: 20px
      fill: #a6a6a6
    .-text
      position: absolute
      left: 0%
      top: 100%
      margin-left: 25px
      width: 100%
      color: #a6a6a6
    .fillBule
      fill: #1c5db5
      color: #1c5db5
@include pc_view
</style>
