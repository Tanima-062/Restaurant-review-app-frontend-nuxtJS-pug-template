<template lang="pug">
div
  step-bar.col-grid-page-content(
    :stepList='stepList',
    :active='active',
    :backUrl='backUrl',
    :isOnlySeat='isOnlySeat'
  )
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import StepBar from '~/components/molecules/flow/StepBar.vue'

@Component({
  components: {
    StepBar
  }
})
export default class PaymentStepBar extends Vue {
  @Prop() active!: 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4
  @Prop() backUrl?: string
  @Prop({ default: false }) isOnlySeat!: boolean

  get stepList() {
    if (!this.isOnlySeat) {
      return [
        { title: '入力', index: 1 },
        { title: '確認', index: 2 },
        { title: 'お支払い', index: 3 },
        { title: '完了', index: 4 }
      ]
    } else {
      return [
        { title: '入力', index: 1 },
        { title: '確認', index: 2 },
        { title: '完了', index: 3 }
      ]
    }
  }
}
</script>
