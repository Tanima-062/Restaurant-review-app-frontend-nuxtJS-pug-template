<template lang="pug">
.area-select
  area-drawer(
    :is-show='isShow',
    :area-list='areaList',
    @select-area='selectArea',
    @close='closeDrawer'
  )
  .content(@click='openDrawer', :class='{ disabled: disabled }')
    paragraph.text(fontSize='medium') {{ areaName || placeholer }}
    select-arrow.right
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'
import { Paragraph } from '~/components/atoms/typography'
import { AreaTypes } from '~/types/areaTypes'
import AreaDrawer from '~/components/atoms/drawers/AreaDrawer.vue'
import SelectArrow from '~/assets/icon/nextV2.svg'
@Component({
  components: {
    AreaDrawer,
    Paragraph,
    SelectArrow
  }
})
export default class AreaSelect extends Vue {
  @Prop() selectedAreaCd!: string
  @Prop() areaList!: AreaTypes.SelectAreaTypes[]
  @Prop({ default: 'エリアを選択してください' }) placeholer!: string
  @Prop({ default: false }) disabled!: boolean

  isShow = false

  get areaName() {
    let areaName
    if (this.areaList && this.areaList.length > 0) {
      areaName = this.areaList.find((area) => area.areaCd === this.selectedAreaCd)
    }
    return areaName && areaName.name ? areaName.name : ''
  }

  @Emit()
  selectArea(areaInfo) {
    this.closeDrawer()
    return areaInfo
  }

  openDrawer() {
    if (this.disabled) {
      return
    }
    this.isShow = true
  }

  closeDrawer() {
    this.isShow = false
  }
}
</script>
<style lang="sass" scoped>
.area-select
  width: 100%
  .content
    position: relative
    display: grid
    align-items: center
    padding: 12px 24px 12px 16px
    border: solid 1px $dark_gray
    border-radius: 3px
    &:hover
      cursor: pointer
    .text
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
    svg
      position: absolute
      right: 8px
      width: 12px !important
      height: 12px !important
      fill: $dark_gray
.disabled
  background-color: $gray
  cursor: not-allowed
  .text
    color: $dark_gray
.right
  transform: rotate(0deg) !important
</style>
