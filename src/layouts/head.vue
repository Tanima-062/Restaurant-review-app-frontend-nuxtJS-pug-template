<template lang="pug">
  Header
</template>

<script lang="ts">

import { Component, Vue } from 'nuxt-property-decorator'
import Header from '../components/organisms/Header.vue'
import Navigation from '../components/organisms/Navigation.vue'
console.log(process.env.NODE_ENV)

@Component({
  components: {
    Header,
    Navigation
  }
})
export default class extends Vue {}
</script>
