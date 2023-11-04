<template lang="pug">
.area-button(@click='click')
  paragraph.text(fontSize='small') {{ area.name }}
  select-arrow
</template>
<script lang="ts">
import Vue from 'vue'
import { Prop, Component, Emit } from 'nuxt-property-decorator'
import { AreaTypes } from '~/types/areaTypes'
import { Paragraph } from '~/components/atoms/typography'
import SelectArrow from '~/assets/icon/nextV2.svg'
@Component({
  components: {
    Paragraph,
    SelectArrow
  }
})
export default class AreaButton extends Vue {
  @Prop({ default: {} }) area!: AreaTypes.SelectAreaTypes

  @Emit()
  click() {
    return this.area
  }
}
</script>
<style lang="sass" scoped>
.area-button
  align-items: center
  display: grid
  position: relative
  cursor: pointer
  padding: 16px 28px 16px
  border-bottom: solid 1px $gray
  &:hover
    background-color: $light_gray
  .text
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    @include pc_view
      font-size: 16px
  svg
    position: absolute
    right: 8px
    width: 12px
    height: 12px
    fill: $dark_gray
</style>
