<template lang="pug">
div.plan-service-tag(:class='{ disabled: isDisabled }')
  Span(:color='!isDisabled ? "white" : "dark_gray"' fontSize='tiny') {{service}}
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { Span } from '~/components/atoms/typography'

@Component({
  components: {
    Span
  }
})
export default class extends Vue {
  @Prop() service!: string
  @Prop({ type: Boolean, default: false }) isDisabled?: boolean
}
</script>
<style lang="sass" scoped>
.plan-service-tag
  display: inline-block
  font-weight: bold
  background-color: $sub_color
  line-height: 16px
  margin-bottom: 4px
  padding: 4px 8px
  border-radius: 3px
  &.disabled
    background-color: $light_gray
  &:not(:last-child)
    margin-right: 4px
</style>
