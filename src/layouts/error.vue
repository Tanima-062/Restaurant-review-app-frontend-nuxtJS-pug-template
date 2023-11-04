<template lang="pug">
  div
    h1 {{ error.statusCode }}
    p {{ error.message }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
  @Prop({ type: Object })
  error!: {
    type: { string }
    default: null
  }
}
</script>
