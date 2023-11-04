<template lang="pug">
button.check-panel(@click='click', :class='[selected ? "checked" : ""]')
  span-bold.-text(:font-size='14') {{ text }}
</template>
<script lang="ts">
import Vue from 'vue'
import { Prop, Component, Emit } from 'nuxt-property-decorator'
import { SpanBold } from '~/components/atoms/typography'

@Component({
  components: {
    SpanBold
  }
})
export default class CheckPanel extends Vue {
  @Prop({ default: 'テキスト' }) text!: string
  @Prop() id?: number
  // Tが選択状態 Fが未選択
  @Prop({ default: false }) selected?: boolean

  @Emit('click')
  click() {
    return this.id
  }
}
</script>
<style lang="sass" scoped>
.check-panel
  text-align: left
  padding: 7px 6px
  width: 100%
  min-height: 40px
  border: none
  border-radius: 3px
  background-color: $white
  border: 1px solid $dark_gray
  &:hover
    cursor: pointer
    opacity: 0.7
.checked
  border: none
  background-color: $sub_color
  .-text
    color: white
</style>
