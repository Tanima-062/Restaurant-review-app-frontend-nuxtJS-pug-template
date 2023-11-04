<template lang="pug">
.location-button(@click='click')
  paragraph-bold.title(color='dark_gray', fontSize='tiny', lineHeight='1') 現在地
  location-mark-icon
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Emit } from 'nuxt-property-decorator'
import { ParagraphBold } from '~/components/atoms/typography'
import LocationMarkIcon from '~/assets/icon/location-mark.svg'
@Component({
  components: {
    ParagraphBold,
    LocationMarkIcon
  }
})
export default class LocationButton extends Vue {
  @Emit()
  click(): void {
    // 親コンポーネントにクリックイベントを通知するだけ
  }
}
</script>
<style lang="sass" scoped>
.location-button
  display: flex
  flex-direction: column
  align-items: center
  width: 100%
  &:hover
    cursor: pointer
    .title
      color: $sub_color
    svg
      fill: $sub_color
  .title
    margin-bottom: 8px
  svg
    width: 22px
    height: 22px
    fill: $dark_gray
</style>
