<template lang="pug">
div.full-loading(v-show='isLoading')
  .-spinner
    loading.-circular
    p.-text loading
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import Loading from '~/assets/icon/loading.svg'

@Component({
  components: {
    Loading
  }
})
export default class extends Vue {
  @Prop() isLoading!: boolean
}
</script>
<style lang="sass" scoped>
.full-loading
  position: fixed
  left: 0
  top: 0
  width: 100%
  min-height: 100%
  background-color: rgba(255, 255, 255, .7)
  z-index: 13000
  .-spinner
    position: absolute
    top: 50%
    margin-top: -21px
    width: 100%
    text-align: center
  .-circular
    height: 42px
    width: 42px
    fill: $main_color
    animation: loading-rotate 2s linear infinite
  .-text
    margin: 8px 0
    text-align: center
    color: $main_color
    font-size: $font_size_default_sp
</style>
