<i18n src="~/locales/locale/mixin.yml"></i18n>

<template lang="pug">
  span.icon-cross {{ $t('title') }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import FileText from '~/components/atoms/icons/FileText.vue'

@Component({
  components: {
    FileText
  }
})
export default class extends Vue {
  @Prop({ type: String, required: true }) private t

  private imageUrl =
    'https://ucaab9542d83d941b6e30a52c6e7.previews.dropboxusercontent.com/p/orig/AAj4ruaOgA94h-6N7yHiJYErE0MecE_B7EN_Iv9edwFuHAL_3DbRWrDT0e_z4Nikv_gUru2T8RzXKKfd1eYszzk7pqt_zwdzddQLy9FONNvP5rMY5DKWYyb02462Vt3YCIp2Hxna6jG4UZPPzRlyT9XmrrnUFvc0-rH_hGaF4Agh8PGgQVFQiB56zizFJhiAtlS96mrurFrY5dHBs4lZCCGLYvbY5dvVgwWfynQo7Do7MZos2tGAny5LS1qjxD3yfQKS2N85sLP96KFjuM_mQupP5ygz-qHjgnDDO49mOkSCNbu7pEw-YA1PFOb1B_W8EXkxDXP8PVqYiE0JBheMTnxtfwVqWrBoWQihKT6mk7B3JA/p.svg?fv_content=true&size_mode=5'

  get dataSrc(): string {
    return this.t
  }
}
</script>
