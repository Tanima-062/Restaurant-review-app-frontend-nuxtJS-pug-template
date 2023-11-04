<template lang="pug">
div.maintenance
  section
    heading(:number="2" fontSize="l").mt-xl.mb-l ただいまメンテナンス中です。
    Paragraph.mb-m ただいまシステムメンテナンス中のため、サービスを一時停止しております。<br />メンテナンス終了まで、今しばらくお待ちください。<br />お客さまにはご大変不便をおかけいたしますが、何卒ご理解いただきますようお願い申し上げます。
    heading(:number="3" fontSize="s").mt-xl.mb-l メンテナンス日時
    Paragraph
      Span-bold 作業日：00/00/00
    Paragraph
      Span-bold 時間：00:00 〜 00:00 頃
    Paragraph.mt-l ※メンテナンス終了の時間が前後することがありますので、ご了承ください。
    heading(:number="2" fontSize="l").mt-xl.mb-l We'll be back soon!
    Paragraph.mb-m During the maintenance process, our website will be temporarily unavailable during the following hours.
    Paragraph
      Span-bold 00:00 - 00:00

</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Paragraph, Heading, SpanBold } from '~/components/atoms/typography/'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
@Component({
  components: {
    Paragraph,
    Heading,
    SpanBold,
    CTAButton
  },
  data() {
    return {
      activeName: '1',
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  }
})
export default class Maintenance extends Vue {
  head() {
    return {
      title: 'ただいまメンテナンス中です'
    }
  }

  fetch({ store }) {
    store.dispatch('modules/layout/setHeaderInfo', {
      layoutType: 1,
      returnPath: '',
      headerTitle: 'メンテナンス'
    })
  }
}
</script>
