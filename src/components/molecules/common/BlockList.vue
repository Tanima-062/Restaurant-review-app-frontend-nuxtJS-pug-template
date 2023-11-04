<template lang="pug">
ul.-sub-menu
  li(v-for="(data, index) in supportList").-items
    a(:href='data.link' data-name="support").-link {{data.title}}
      next.-icon
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Span } from '~/components/atoms/typography'
import Next from '~/assets/icon/next.svg'

@Component({
  components: {
    Span,
    Next
  }
})
export default class BlockList extends Vue {
  @Prop({ type: Array, required: true }) supportList
}
</script>

<style lang="sass" scoped>
.-sub-menu
  position: absolute
  top: 32px
  right: 0
  width: 200px
  background-color: $white
  border: 1px solid $light_gray
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .4)
  z-index: 2
  &::before
    content: ''
    display: block
    position: absolute
    top: -19px
    right: 25px
    border: 10px solid transparent
    border-bottom-color: $white
  .-link
    display: block
    position: relative
    height: 40px
    line-height: 40px
    padding: 0 16px
    font-size: 12px
    text-decoration: none
    text-align: left
    &:hover
      background: $light_gray
    .-icon
      position: absolute
      top: 50%
      right: 12px
      width: 16px
      height: 16px
      margin-top: -8px
      font-size: 10px
      padding-right: 5px
      speak: none
</style>
