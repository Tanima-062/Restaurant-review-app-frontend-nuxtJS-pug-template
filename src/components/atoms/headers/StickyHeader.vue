<template lang="pug">
div.sticky-header
  slot
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

@Component
export default class StickyHeader extends Vue {}
</script>
<style lang="sass" scoped>
.sticky-header
  box-shadow: 0px 0px 4px rgba(0,0,0,0.2)
  border: 1px solid $light_gray
  background-color: $white
  position: fixed
  top: 0
  left: 0
  width: 100%
  min-height: 40px
  padding: 8px
  z-index: 100
</style>
