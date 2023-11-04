<template lang="pug">
  nuxt-link.-block-skyticketSVG(to="#")
    Skyticket
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Skyticket from '~/components/atoms/logo/Skyticket.vue'

@Component({
  components: {
    Skyticket
  }
})
export default class extends Vue {}
</script>

<style lang="sass" scoped>
.-block-skyticketSVG
  align-self: center
  line-height: 1
  svg
    width: 110px
    fill: #fff
  @media screen and (max-width: 980px)
    justify-self: baseline
    svg
      width: get_vw(110)
</style>
