<template lang="pug">
  div
    Footer
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Footer from '../components/organisms/Footer.vue'

@Component({
  components: {
    Footer
  }
})
export default class extends Vue {}
</script>
