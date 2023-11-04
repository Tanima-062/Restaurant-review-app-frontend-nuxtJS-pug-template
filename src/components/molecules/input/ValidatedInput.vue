<template lang="pug">
validation-provider(:rules="rules" v-slot='{ errors }' :mode="mode" :name="name")
  input(
    :value="value"
    :placeholder="placeholder"
    :class="{invalid: errors.length > 0}"
    :type="type"
    :maxlength="maxlength"
    :id="id"
    :disabled="disabled"
    @input="input($event.target.value)"
    @change="change($event.target.value)"
  ).string-input.validated-input
  slot
  paragraph.error-msg(fontSize='small' color="error") {{ errors[0] }}
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
export default class ValidatedInput extends Vue {
  @Prop() value!: string
  @Prop() rules!: string
  @Prop() name!: string
  @Prop() id!: string
  @Prop() placeholder!: string
  @Prop() maxlength!: string
  @Prop({ default: 'text' }) type?: string
  @Prop({ default: 'aggressive' }) mode?: InteractionMode
  @Prop({ default: false }) disabled?: boolean
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
</style>
