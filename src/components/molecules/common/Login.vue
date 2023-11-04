<i18n src="~/locales/locale/mixin.yml"></i18n>

<template lang="pug">
  div
    IconFileText
    p {{ $t('reservation_confirming') }}
</template>

<script>
import IconFileText from '@/components/atoms/icons/FileText.vue'

export default {
  components: {
    IconFileText
  }
}
</script>
