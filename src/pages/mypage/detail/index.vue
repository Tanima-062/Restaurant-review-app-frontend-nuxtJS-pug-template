<template lang="pug">
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
@Component({
  components: {}
})
export default class MypageDetail extends Vue {
  head() {
    return {
      meta: [{ hid: 'robots', name: 'robots', content: 'noindex' }]
    }
  }

  async fetch({ redirect, query }) {
    const params = await query.reservationNo
    if (params !== undefined) {
      redirect(301, '/gourmet/mypage/?reservationNo=' + params)
    }
  }
}
</script>
