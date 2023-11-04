<template lang="pug">
el-input.loading(
  v-if='loading',
  v-loading='loading',
  element-loading-spinner='el-icon-loading'
)
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
@Component
export default class extends Vue {
  @Prop() loading!: boolean
}
</script>
<style lang="sass" scoped>
.loading :deep()
  padding-top: 8px
  > input
    opacity: 0.3
    border: none
</style>
