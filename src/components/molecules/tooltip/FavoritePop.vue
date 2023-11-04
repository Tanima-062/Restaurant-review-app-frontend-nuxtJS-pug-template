<template lang="pug">
paragraph.font(
  fontSize='medium',
  color='white',
  letterSpacing='none',
  fontFamily='HiraKakuPro-W6'
) {{ text }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Paragraph } from '~/components/atoms/typography'
@Component({
  components: {
    Paragraph
  }
})
export default class FavoritePop extends Vue {
  @Prop() text!: string
}
</script>

<style lang="sass" scoped>
.font
  font-size: 16px
  @include pc_view
    font-size: 18px
</style>
