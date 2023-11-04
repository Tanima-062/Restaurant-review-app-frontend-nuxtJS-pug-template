<template lang="pug">
.people-select(:class='{ inactive: inactive || isLoading }')
  paragraph-bold.title(color='dark_gray', fontSize='tiny', lineHeight='1') 人数
  .content
    user-shape-icon.icon
    select.text(
      :value='selectedPeople',
      :disabled='disabled',
      @change='changePeople($event.target.value)'
    )
      option(v-if='isLoading || disabled', value='')
      option(
        v-else,
        v-for='people in options',
        :label='people + "人"',
        :key='people',
        :selected='selectedPeople === people'
      ) {{ people }}
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'
import { ParagraphBold } from '~/components/atoms/typography'
import UserShapeIcon from '~/assets/icon/user-shape.svg'

@Component({
  components: {
    ParagraphBold,
    UserShapeIcon
  }
})
export default class PeopleSelect extends Vue {
  @Prop() selectedPeople!: number
  @Prop({ default: () => [] }) peoples?: number[]
  @Prop({ default: false }) inactive!: boolean
  @Prop({ default: false }) isLoading!: boolean
  @Prop({ default: false }) disabled!: boolean

  get options() {
    if (this.peoples && this.peoples.length) {
      return this.peoples
    } else if (this.disabled) {
      return []
    }
    const peoples: number[] = []
    for (let i = 1; i < 100; i++) {
      peoples.push(i)
    }
    return peoples
  }

  @Emit()
  changePeople(people: string) {
    return Number(people)
  }
}
</script>
<style lang="sass" scoped>
.people-select
  .title
    margin-bottom: 8px
  .content
    margin-left: 3px
    align-items: center
    display: grid
    grid-template-columns: max-content max-content
    gap: 6px
    .icon
      width: 16px
      height: 16px
      fill: $dark_gray
    .text
      background-color: transparent
      cursor: pointer
      outline: none
      border: none
      font-size: 16px
      color: #333
      font-family: HiraKakuPro-W3
      line-height: 1.6
      min-width: 40px
      &:disabled
        cursor: not-allowed
.inactive
  opacity: 0.38
</style>
