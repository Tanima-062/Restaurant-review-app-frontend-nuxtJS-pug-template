<template lang="pug">
validation-provider(
  :rules='rules',
  v-slot='{ errors }',
  :mode='mode',
  :name='name'
)
  textarea.string-input.validated-input(
    :v-model='value',
    :placeholder='placeholder',
    :class='{ invalid: errors.length > 0, inputform: inputform }',
    :type='type',
    :maxlength='maxlength',
    :id='id',
    @input='input($event.target.value)',
    @change='change($event.target.value)',
    :style='"height:" + height + "px"',
    :readonly='flag'
  ) {{ value }}
  slot
  paragraph.error-msg(fontSize='small', color='error') {{ errors[0] }}
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'
import Paragraph from '~/components/atoms/typography/Paragraph.vue'
// https://logaretm.github.io/vee-validate/guide/interaction-and-ux.html#interaction-modes
type InteractionMode = 'aggressive' | 'passive' | 'lazy' | 'eager'

@Component({
  components: {
    Paragraph
  }
})
export default class ValidatedTextArea extends Vue {
  @Prop() value!: string
  @Prop() rules!: string
  @Prop() name!: string
  @Prop() id!: string
  @Prop() placeholder!: string
  @Prop() maxlength!: string
  @Prop({ default: 'text' }) type?: string
  @Prop({ default: 'aggressive' }) mode?: InteractionMode
  @Prop() height!: number
  @Prop() flag!: boolean
  @Prop() inputform?: boolean

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
.validated-input.invalid
  background-color: $warning_color
  border-color: $error_color
.error-msg
  margin-top: 4px
.string-input.validated-input
  padding-top: 7px
  line-height: 1.29 !important
#user-alert.validated-input.inputform
  padding-left: 16px
  font-size: 14px
  line-height: 1.29 !important
  &:first-line
    font-weight: bold
</style>
