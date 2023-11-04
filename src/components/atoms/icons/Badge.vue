<template lang="pug">
  span(v-if="badgeCount > 0").badge
    span.-count {{badgeCount}}
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
  @Prop() private badgeCount!: number
}
</script>
<style lang="sass" scoped>
.badge
  line-height: 1
  margin-left: 8px
  .-count
    display: inline-block
    min-width: 20px
    border-radius: 15px
    padding: 4px 2px
    text-align: center
    vertical-align: middle
    font-size: 10px
    color: $white
    background-color: $error_color
</style>
