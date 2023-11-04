<template lang="pug">
div
  base-drawer(:title="drawerTitle" :isActive="isActive" @close="handleCloseEvent" :wrapperClosable="wrapperClosable")
    slot
    template(v-slot:footer)
      slot(name="drawer-footer")
  base-modal(:title="modalTitle" :isActive="isModalVisible" @close="closeModal")
    template(v-slot:modal-text)
      slot(name="modal-text")
        p 終了しますか？
    template(v-slot:modal-footer)
      div.-modal-button
        CTA-button(text="キャンセル" type="secondary_sub" @click="closeModal")
        CTA-button(text="OK" type="secondary" @click="handleOkEvent")
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'nuxt-property-decorator'
import BaseDrawer from '~/components/atoms/drawers/BaseDrawer.vue'
import BaseModal from '~/components/atoms/modals/BaseModal.vue'
import CTAButton from '~/components/atoms/button/CTAButton.vue'
import { Span } from '~/components/atoms/typography/'

@Component({
  components: {
    CTAButton,
    Span,
    BaseDrawer,
    BaseModal
  }
})
export default class CustomDrawer extends Vue {
  @Prop({ default: false }) isActive!: boolean
  @Prop() drawerTitle?: string
  @Prop() modalTitle?: string
  @Prop({ default: true }) wrapperClosable?: boolean // 背景の黒い部分を押してdrawerが閉じるか否か
  @Prop({ default: true }) withModal?: boolean // drawerを閉じる時にmodalを表示するか否か

  // モーダル表示
  private isModalVisible = false

  closeModal(): void {
    this.isModalVisible = false
  }

  @Emit('closeDrawer')
  closeDrawer() {
    //
  }

  handleCloseEvent() {
    if (this.withModal) {
      this.isModalVisible = true
    } else {
      this.closeDrawer()
    }
  }

  @Emit('clickOk')
  handleOkEvent() {
    this.closeModal()
  }
}
</script>

<style lang="sass" scoped>
.-modal-button
  display: flex
  justify-content: space-evenly
  button
    width: 100%
    &:first-child
      margin-right: 8px
    &:last-child
      margin-left: 8px
</style>
