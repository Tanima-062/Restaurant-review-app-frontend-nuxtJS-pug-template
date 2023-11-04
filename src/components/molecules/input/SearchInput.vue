<template lang="pug">
validation-provider(
  :rules='rules'
  v-slot='{ errors }'
  :mode='mode'
  :name='name'
)
  .searchbox
    input.string-input.validated-input(
      :value='value'
      :placeholder='placeholder'
      :class='{ invalid: errors.length > 0 }'
      :type='type'
      :maxlength='maxlength'
      :id='id'
      @input='input($event.target.value)'
      @change='change($event.target.value)'
    )
    search-icon#-icon
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'
import Paragraph from '~/components/atoms/typography/Paragraph.vue'
import SearchIcon from '~/assets/icon/search.svg'
// https://logaretm.github.io/vee-validate/guide/interaction-and-ux.html#interaction-modes
type InteractionMode = 'aggressive' | 'passive' | 'lazy' | 'eager'
@Component({
  components: {
    Paragraph,
    SearchIcon
  }
})
export default class SearchInput extends Vue {
  @Prop() value!: string
  @Prop() rules!: string
  @Prop() name!: string
  @Prop() id!: string
  @Prop() placeholder!: string
  @Prop() maxlength!: string
  @Prop({ default: 'text' }) type?: string
  @Prop({ default: 'aggressive' }) mode?: InteractionMode

  @Emit()
  input(inputedText) {
    return inputedText
  }

  @Emit()
  change(changedText) {
    return changedText
  }
}
</script>

<style lang="sass" scoped>
.searchbox
    position: relative
    .string-input
        padding-left: 30px
        background-color: #f4f4f4
        &::placeholder
            color: gray
        &:focus
            background-color: white
    #-icon
        position: absolute
        left: 4%
        top: 17%
        width: 20px
        fill: #a6a6a6
.validated-input.invalid
    background-color: $warning_color
    border-color: $error_color
.error-msg
    margin-top: 4px
</style>
