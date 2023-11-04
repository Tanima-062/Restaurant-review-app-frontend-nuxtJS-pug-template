<template lang="pug">
  p(v-text="titleText")
</template>

<script lang="ts">
import { Prop, Vue } from 'nuxt-property-decorator'
export default class extends Vue {
  @Prop({ type: String, required: true }) headTitle
  public titleText(): string {
    return this.$attrs.headTitle
  }
}
</script>
