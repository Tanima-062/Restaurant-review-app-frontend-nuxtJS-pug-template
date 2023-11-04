<template lang="pug">
.accesspage
  template(v-if='storeInfo')
    Heading.headText(fontSize='s', v-if='storeInfo.name') {{ storeInfo.name }}
    paragraph.dateText(fontSize='tiny', v-if='storeInfo.storeGenres') {{ genreText() }}
    hr.sectionLast
    .detailFlex
      paragraph.head(fontSize='small') 住所
      paragraph.text(fontSize='small') {{ storeInfo.address }}
    hr.sectionLast
    .detailFlex
      paragraph.head(fontSize='small') 交通手段
      paragraph.text(fontSize='small') {{ storeInfo.access }}
    .maps
      iframe.frame(
        :src='"https://www.google.com/maps/embed/v1/place?key=AIzaSyAyY8FXs9TbzZQ1NwBmG--DTHdo5NzNpzw&q=" + storeInfo.latitude + "," + storeInfo.longitude',
        frameborder='0'
      )
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Heading, SpanBold, Paragraph, ParagraphBold } from '~/components/atoms/typography'

@Component({
  components: {
    Heading,
    SpanBold,
    Paragraph,
    ParagraphBold
  }
})
export default class AccessIndex extends Vue {
  head() {
    return {
      title: 'アクセス',
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  }

  fetch({ store }) {
    const id = store.getters['modules/listStore/getStore'].id
    store.dispatch('modules/layout/setHeaderInfo', {
      layoutType: 3,
      returnPath: '/restaurant/detail/takeout/' + id,
      headerTitle: 'アクセス'
    })
  }

  mounted() {
    const num = Number(this.$route.params.id)
    this.$store.dispatch('modules/listStore/InitStore', num)
  }

  get storeInfo() {
    if (this.$store.getters['modules/listStore/getStore'].name !== '') {
      return this.$store.getters['modules/listStore/getStore']
    }
  }

  genreText(): string {
    const genreBox = this.storeInfo.storeGenres
    let textdata = ''
    let count = 0
    for (let i = 0; i < genreBox.length; i++) {
      if (genreBox[i].path.startsWith('/b-cooking')) {
        if (count === 0) {
          textdata = textdata + genreBox[i].name
        } else {
          textdata = textdata + '/' + genreBox[i].name
        }
        count++
      }
    }
    return textdata
  }
}

//   get infomation() {
//     return this.$store.getters['modules/notification/getNotification']
//   }
</script>
<style lang="sass" scoped>
.accesspage
  .headText
    margin-top: 20px
  .sectionLast
    height: 1px
    background-color: #e4e4e4
  .detailFlex
    display: flex
    margin-bottom: 16px
    .head
      width: 20%
    .text
      width: 80%
      white-space: pre-line
  .maps
    width: 100vw
    margin: 5px calc(50% - 50vw)
    height: 500px
    .frame
      width: 100%
      height: 100%
@include pc_view
  .accesspage
    .maps
      width: 100%
      margin: 5px auto
      height: 500px
      .frame
        width: 100%
        height: 100%
</style>
