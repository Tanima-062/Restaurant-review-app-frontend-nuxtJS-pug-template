<template lang="pug">
  <img :src="imageUrl" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
  @Prop() private imageUrl
}
</script>
