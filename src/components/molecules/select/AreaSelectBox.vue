<template lang="pug">
.area-select-box
  select-box(@change='change($event)', :disabled='areaList.length === 0')
    option(
      value='',
      disabled,
      style='display: none',
      :selected='selectedAreaCd === ""'
    ) {{ placeholder }}
    option(value='') 選択してください
    optgroup(label='人気のエリア')
      option(
        v-for='(area, index) in areaList',
        :value='[area.areaCd, area.name]',
        :selected='area.areaCd === selectedAreaCd',
        :label='area.name',
        :key='area.id',
        v-if='index < 6'
      ) {{ area.name }}
    optgroup(label='エリア一覧')
      option(
        v-for='(area, index) in areaList',
        :value='[area.areaCd, area.name]',
        :selected='area.areaCd === selectedAreaCd',
        :label='area.name',
        :key='area.id',
        v-if='index >= 6'
      ) {{ area.name }}
  next.-nexticon
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'
import Next from '~/assets/icon/nextV2.svg'
import SelectBox from '~/components/molecules/select/SelectBox.vue'
@Component({
  components: {
    Next,
    SelectBox
  }
})
export default class AreaForm extends Vue {
  @Prop({ default: [] }) areaList!: []
  @Prop({ default: '' }) selectedAreaCd!: string
  @Prop({ default: '東京都内のエリアを選択' }) placeholder!: string

  @Emit('change')
  change(value) {
    const newval = value.split(',')
    let areaType = 'AREA'
    if (value === '') {
      areaType = ''
    }
    // 0にコード 1に名前
    return {
      suggestCd: areaType,
      suggestText: newval[0],
      suggestTextName: newval[1]
    }
  }
}
</script>

<style lang="sass" scoped>
.area-select-box
  cursor: pointer
  position: relative
  width: 100%
  height: 100%
  .-nexticon
    pointer-events: none
    position: absolute
    top: 17px
    right: 16px
    fill: $dark_gray
    transform: rotate(90deg)
</style>
