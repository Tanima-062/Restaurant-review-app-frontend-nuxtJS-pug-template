<template lang="pug">
.area-modal
  base-drawer(
    :is-active='isShow',
    @close='close',
    :title='"エリアを選択"',
    textSize='l',
    number=1
  )
    .popular-areas
      .popular-header
        p.title 人気のエリア
      .popular-columns(v-for='area in popularAreas', :key='area.id')
        area-button(:area='area', @click='selectArea')
    hr.section-line
    .categories(v-for='category in categories', :key='category.areaCd')
      .category-areas(v-if='areaByCategories[category.areaCd].length > 0')
        simple-accordion(:title='category.name')
          .category-areas(
            v-for='area in areaByCategories[category.areaCd]',
            :key='area.id'
          )
            area-button(:area='area', @click='selectArea')
</template>
<script lang="ts">
import { Component, Emit, Vue, Prop, Watch } from 'nuxt-property-decorator'
import cloneDeep from 'lodash/cloneDeep'
import { AreaTypes } from '~/types/areaTypes'
import AreaButton from '~/components/atoms/button/AreaButton.vue'
import BaseDrawer from '~/components/atoms/drawers/BaseDrawer.vue'
import SimpleAccordion from '~/components/molecules/accordion/SimpleAccordion.vue'

@Component({
  components: {
    AreaButton,
    BaseDrawer,
    SimpleAccordion
  }
})
export default class AreaDrawer extends Vue {
  @Prop() isShow!: boolean
  @Prop() areaList!: AreaTypes.SelectAreaTypes[]

  popularAreas: AreaTypes.SelectAreaTypes[] = []
  othersAreas: AreaTypes.SelectAreaTypes[] = []
  mounted() {
    this.initAreas()
  }

  @Watch('areaList', { deep: true })
  initAreas() {
    this.popularAreas = []
    this.othersAreas = []
    const areas = cloneDeep(this.areas)
    areas.forEach((area: AreaTypes.SelectAreaTypes) => {
      if (area.weight >= 1 && this.popularAreas.length < 6) {
        this.popularAreas.push(area)
      }
      this.othersAreas.push(area)
    })
    this.othersAreas.sort((a, b) => {
      return a.id < b.id ? -1 : a.id > b.id ? 1 : 0
    })
  }

  get categories() {
    return this.priorityArea(this.areaList.filter((area) => area.level === 1))
  }

  // weightが高い順で整列
  priorityArea(areas: Array<AreaTypes.SelectAreaTypes>) {
    const sortArea = areas.sort((a, b) => {
      return a.weight < b.weight ? -1 : a.weight > b.weight ? 1 : 0
    })
    return sortArea
  }

  get areas() {
    return this.areaList.filter((area) => area.level !== 1)
  }

  get areaByCategories() {
    return this.categories.reduce((categories, category) => {
      if (!categories[category.areaCd]) {
        categories[category.areaCd] = this.othersAreas.filter((area) => {
          const reg = new RegExp(`/${category.areaCd}`)
          return reg.test(area.path)
        })
      }
      return categories
    }, {})
  }

  @Emit()
  selectArea(areaInfo) {
    return areaInfo
  }

  @Emit()
  close() {
    // 親に伝える
  }
}
</script>
<style lang="sass" scoped>
.area-modal
  .section-line
    margin: 0
    height: 8px
    background-color: $light_gray
  .empty-area
    border-bottom: none
  .popular-areas
    .popular-header
      padding: 16px 16px 16px 0
      border-bottom: solid 1px $gray
      .title
        font-size: 16px
        font-weight: bold
        @include pc_view
          font-size: 18px
    .popular-columns:last-child
      .area-button
        border-bottom: none
  .categories
    .category-areas :deep()
      .simple-accordion
        border-bottom: none
        .accordion-header
          border-bottom: solid 1px $gray
        .accordion-body
          padding: 0
</style>
