<template lang="pug">
.select-restaurant-top
  .search-condition-date
    date-select(
      :selected-date='selectedDate',
      :disabled='inactive || isLoading',
      @change-date='changeDate'
    )
  .search-condition-time
    time-button(
      :selected-time='selectedTime',
      :inactive='inactive',
      :isLoading='isLoading',
      @change-time='changeTime'
    )
  .search-condition-people
    people-select(
      :selected-people='selectedPeople',
      :inactive='inactive',
      :isLoading='isLoading',
      @change-people='changePeople'
    )
  commitment-button.search-condition-choice(
    v-if='visChoice',
    :hasChoices='hasChoices',
    @commitmentClick='commitmentClick()'
  )
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'
import { Paragraph, ParagraphBold, Span, SpanBold } from '~/components/atoms/typography'
import DateSelect from '~/components/molecules/select/DateSelect.vue'
import PeopleSelect from '~/components/molecules/select/PeopleSelect.vue'
import TimeButton from '~/components/atoms/button/TimeButton.vue'
import CommitmentButton from '~/components/atoms/button/CommitmentButton.vue'

@Component({
  components: {
    DateSelect,
    Paragraph,
    ParagraphBold,
    PeopleSelect,
    Span,
    SpanBold,
    TimeButton,
    CommitmentButton
  }
})
export default class SelectRestaurantTop extends Vue {
  @Prop() selectedPeople!: number
  @Prop() selectedTime!: string
  @Prop() selectedDate!: string
  @Prop({ default: false }) inactive!: boolean
  @Prop({ default: true }) visChoice!: boolean
  @Prop({ default: false }) isLoading!: boolean
  @Prop({ default: false }) hasChoices!: boolean

  @Emit('commitmentClick')
  commitmentClick() {
    // こだわり検索押した
  }

  @Emit()
  changeTime(time: string) {
    return time
  }

  @Emit()
  changePeople(people: string) {
    return people
  }

  @Emit()
  changeDate(val) {
    return val.metaDate
  }
}
</script>
<style lang="sass" scoped>
.select-restaurant-top
  display: flex
  width: 100%
  justify-content: space-between
  padding-bottom: 8px
  border-bottom: solid 1px $dark_gray
@media screen and (max-width: 374px)
  .select-restaurant-top
    .search-condition-choice
      display: none
</style>
