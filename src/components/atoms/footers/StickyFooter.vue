<template lang="pug">
div.sticky-footer
  slot
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

@Component
export default class StickyFooter extends Vue {}
</script>
<style lang="sass" scoped>
.sticky-footer
  box-shadow: 0px 0px 4px rgba(0,0,0,0.2)
  border: 1px solid $light_gray
  background-color: $white
  position: fixed
  bottom: 0
  left: 0
  width: 100%
  min-height: 60px
  padding: 16px 8px
  z-index: 100
</style>
