<template lang="pug">
.commitment(@click='commitmentClick()')
  paragraph-bold.commitment__title(
    color='dark_gray',
    fontSize='tiny',
    lineHeight='1'
  ) こだわり
  .commitment-content
    filter-check-icon.commitment-content__check-icon(v-if='hasChoices')
    filter-icon.commitment-content__icon(v-else)
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'nuxt-property-decorator'
import { Paragraph, ParagraphBold } from '~/components/atoms/typography'
import FilterIcon from '~/assets/icon/filter.svg'
import FilterCheckIcon from '~/assets/icon/filter-check.svg'
@Component({
  components: {
    FilterIcon,
    FilterCheckIcon,
    Paragraph,
    ParagraphBold
  }
})
export default class CommitmentButton extends Vue {
  @Prop({ default: false }) hasChoices!: boolean
  @Emit('commitmentClick')
  commitmentClick() {
    // こだわり検索押した
  }
}
</script>

<style lang="sass" scoped>
.commitment
  cursor: pointer
  .commitment__title
    margin-bottom: 8px
    white-space: nowrap
  .commitment-content
    display: flex
    align-items: center
    justify-content: center
    &__icon
      width: 20px
      height: 20px
      fill: $dark_gray
    .commitment-content__icon
      width: 26px
      fill: $dark_gray
    .commitment-content__check-icon
      width: 40px
      height: 22px
      fill: $sub_color
  &:hover
    .commitment__title
      color: $sub_color
    .commitment-content__icon
      fill: $sub_color
</style>
