<template lang="pug">
.preference-card
  .preference
    simple-accordion.preference-name(
      :first-open='isOpen',
      :title='preference.name'
    )
      .panels
        check-panel(
          v-for='(child, index) in preference.child',
          :key='child.genreCd',
          :text='child.name',
          :id='child.id',
          :selected='isActives[index]',
          @click='click($event, index)'
        )
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'
import { ParagraphBold } from '~/components/atoms/typography'
import CheckPanel from '~/components/atoms/checkbox/CheckPanel.vue'
import Next from '~/assets/icon/nextV2.svg'
import SimpleAccordion from '~/components/molecules/accordion/SimpleAccordion.vue'

type Preference = {
  genreCd: string
  name: string
  child: {
    id: number
    name: string
    genreCd: string
    appCd: string
    path: string
    level: number
  }[]
}

@Component({
  components: {
    CheckPanel,
    Next,
    ParagraphBold,
    SimpleAccordion
  }
})
export default class PreferenceCard extends Vue {
  @Prop() preference!: Preference
  @Prop() selectedPreferences!: number[]
  isOpen = false
  isActives: boolean[] = []
  mounted() {
    this.isActives = this.preference.child.map(({ id }) => this.selectedPreferences.includes(id))
    this.isOpen = this.isActives.includes(true)
  }

  @Emit()
  click(id, index) {
    this.isActives.splice(index, 1, !this.isActives[index])
    return id
  }

  clear(): void {
    this.isActives = this.isActives.map(() => false)
  }
}
</script>

<style lang="sass" scoped>
.preference-card
  &:hover
    cursor: pointer
  .preference
    width: 100%
    height: 100%
    .panels
      display: grid
      grid-template-columns: repeat(auto-fill,minmax(152px,auto))
      grid-template-rows: auto
      grid-gap: 16px 8px
      box-sizing: border-box
</style>
