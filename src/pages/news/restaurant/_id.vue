<template lang="pug">
.newspage
  full-loading(:isLoading='!dataInit')
  .newspage-wrapper(v-if='dataInit')
    Heading.headText(fontSize='m') {{ dataInit.title }}
    paragraph.dateText(fontSize='tiny') 公開日:{{ dataInit.publishedAt }}
    paragraph.dateText(fontSize='tiny') 更新日:{{ dataInit.updatedAt }}
    hr.sectionLast
    paragraph.pre(fontSize='small') {{ dataInit.message }}
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Heading, SpanBold, Paragraph, ParagraphBold } from '~/components/atoms/typography'
import FullLoading from '~/components/molecules/loading/FullLoading.vue'

@Component({
  components: {
    Heading,
    SpanBold,
    Paragraph,
    ParagraphBold,
    FullLoading
  }
})
export default class NewsIndex extends Vue {
  head() {
    return {
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  }

  get dataInit() {
    const num = Number(this.$route.params.id)
    let data = this.$store.getters['modules/notification/getDetailRS'](num)
    if (!data) {
      this.$store.dispatch('modules/notification/InitNotificationRS').then(() => {
        data = this.$store.getters['modules/notification/getDetailRS'](num)
        if (!data) {
          return this.$router.push('/restaurant')
        }
        return data
      })
    } else {
      return data
    }
  }
}
</script>
<style lang="sass" scoped>
.headText
  margin-top: 20px
.dateText
  margin-top: 10px
.sectionLast
  height: 1px
  background-color: #e4e4e4
.pre
  white-space: pre-wrap
</style>
