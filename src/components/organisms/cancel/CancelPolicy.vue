<template lang="pug">
.cancel-policy
  paragraph-bold.cancel-title(fontSize='base') キャンセルポリシー
  paragraph.cancel-info(fontSize='small') 本予約をキャンセルされた場合、下記の料金を頂戴いたします。
  .cancel-policy-inner(
    v-for='(policy, index) in cacelPolicyFormat',
    :key='index'
  )
    .label
      paragraph.-title(fontSize='small', letterSpacing='none') {{ policy.head }}
    .cancel-wrapper
      paragraph-bold(fontSize='small', letterSpacing='none') {{ policy.tail }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import cloneDeep from 'lodash/cloneDeep'
import { Paragraph, ParagraphBold } from '~/components/atoms/typography'
import { CancelTypes } from '~/types/cancelTypes'
@Component({
  components: {
    Paragraph,
    ParagraphBold
  }
})
export default class CancelPolicy extends Vue {
  @Prop({ default: [] }) cancelPolicy!: CancelTypes.CancelPolicy[]

  // キャンセルポリシー １.日付、時間順、 2.期間は長い順
  get cancelPolicySort() {
    const policies = cloneDeep(this.cancelPolicy)
    policies?.forEach((policy, index) => {
      if (policy.beforeTime) {
        const tmp = policies[index]
        policies.splice(index, 1)
        policies.push(tmp)
      }
    })

    const cancelDaySort = policies
      ?.filter((policy) => {
        return Number(policy.beforeDay) >= 0
      })
      .sort((firstValue, secondValue) => {
        if (Number(firstValue.beforeDay) < Number(secondValue.beforeDay)) {
          return 1
        }
        if (Number(firstValue.beforeDay) > Number(secondValue.beforeDay)) {
          return -1
        }
        return 0
      })

    const cancelTimeSort = policies
      ?.filter((policy) => {
        return Number(policy.beforeTime) >= 0
      })
      .sort((firstValue, secondValue) => {
        if (Number(firstValue.beforeTime) < Number(secondValue.beforeTime)) {
          return 1
        }
        if (Number(firstValue.beforeTime) > Number(secondValue.beforeTime)) {
          return -1
        }
        return 0
      })
    return [...cancelDaySort, ...cancelTimeSort]
  }

  // キャンセルポリシー計上単位の出し分け
  get cacelPolicyFormat() {
    const cancelPolicy = this.cancelPolicySort
      .filter((policy: any) => {
        return policy.isAfter === 0
      })
      .map((policy: any) => {
        let headPharse = ''
        let tailPharse = ''
        if (policy.beforeDay === 0 && !policy.beforeTime) {
          if (policy.cancelFeeUnit === 'FIXED_RATE') {
            headPharse = '来店日の当日まで'
            tailPharse = `予約料金の${policy.cancelFee}%`
          } else {
            headPharse = '来店日の当日まで'
            tailPharse = `【${this.$moneyFormat(Number(policy.cancelFee))}円】`
          }
          return { head: headPharse, tail: tailPharse }
        } else if (policy.beforeDay) {
          if (policy.cancelFeeUnit === 'FIXED_RATE') {
            headPharse = `来店日の${policy.beforeDay}日前まで`
            tailPharse = `予約料金の${policy.cancelFee}%`
          } else {
            headPharse = `来店日の${policy.beforeDay}日前まで`
            tailPharse = `【${this.$moneyFormat(Number(policy.cancelFee))}円】`
          }
          return { head: headPharse, tail: tailPharse }
        } else if (policy.beforeTime) {
          if (policy.cancelFeeUnit === 'FIXED_RATE') {
            headPharse = `来店日の${policy.beforeTime}時間前まで`
            tailPharse = `予約料金の${policy.cancelFee}%`
          } else {
            headPharse = `来店日の${policy.beforeDay}時間前まで`
            tailPharse = `【${this.$moneyFormat(Number(policy.cancelFee))}円】`
          }
          return { head: headPharse, tail: tailPharse }
        } else if (policy.after) {
          headPharse = `来店日の${policy.beforeTime}時間前まで`
          tailPharse = `予約料金の${policy.cancelFee}%`
          return { head: headPharse, tail: tailPharse }
        } else {
          return { head: headPharse, tail: tailPharse }
        }
      })
    return cancelPolicy
  }
}
</script>
<style lang="sass" scoped>
.cancel-policy
  margin-top: 50px
  .cancel-info
    margin-top: 8px
    margin-bottom: 8px
    line-height: 1.29
  .cancel-policy-inner
    display: flex
    align-items: center
    min-height: 60px
    background-color: $light_gray
    border-bottom: solid 1px $gray
    .label
      display: flex
      align-items: center
      min-width: 150px
    .-title
      width: 130px
      padding: 0 16px
@include pc_view
  .cancel-policy
    margin-top: 32px
    .cancel-title
      font-size: 24px
    .cancel-info
      margin-top: 16px
      margin-bottom: 24px
      font-size: 16px
      line-height: 1.25
    .cancel-policy-inner
      display: flex
      align-items: center
      min-height: 60px
      background-color: $light_gray
      border-bottom: solid 1px $gray
      .label
        display: flex
        align-items: center
        min-width: 200px
      .-title
        padding: 0 16px
        width: 100%
</style>
