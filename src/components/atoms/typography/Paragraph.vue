<template lang="pug">
text-styler(v-bind="$props" type="p" @click="click")
  slot
</template>
<script lang="ts">
import Vue from 'vue'
import { Prop, Component, Emit } from 'nuxt-property-decorator'
import TextStyler from '~/components/atoms/typography/TextStyler.vue'

@Component({
  components: {
    TextStyler
  }
})
export default class Paragraph extends Vue {
  @Prop() fontSize?: string
  @Prop() lineHeight?: string // TextStylerに定義
  @Prop() letterSpacing?: string
  @Prop() color?: string
  @Prop() textAlign?: string
  @Prop() verticalAlign?: string
  @Prop() whiteSpace?: string
  @Prop() textUnderline?: boolean // テキストリンクなどの下線
  @Prop() textEllipsis?: boolean
  @Prop() fontFamily!: string

  @Emit()
  click(): void {
    // 親コンポーネントにクリックイベントを通知するだけ
  }
}
</script>
