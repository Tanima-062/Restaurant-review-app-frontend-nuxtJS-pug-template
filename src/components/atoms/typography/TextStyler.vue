<script lang="ts">
import Vue from 'vue'
import { Prop, Component, Emit } from 'nuxt-property-decorator'

type FontSize = 'huge' | 'big' | 'large' | 'medium' | 'base' | 'small' | 'tiny'

type Color =
  | 'main'
  | 'main_hover'
  | 'accent'
  | 'accent_hover'
  | 'error'
  | 'success'
  | 'notice'
  | 'warning'
  | 'link'
  | 'fb'
  | 'tw'
  | 'ya'
  | 'go'
  | 'white'
  | 'black'
  | 'sub'
  | 'accent_sub'
  | 'notice_sub'
  | 'spare_gray'
  | 'dark_gray'
  | 'gray'
  | 'light_gray'

type VerticalAlign =
  | 'baseline'
  | 'bottom'
  | 'inherit'
  | 'middle'
  | 'sub'
  | 'super'
  | 'text-bottom'
  | 'text-top'
  | 'top'
  | 'unset'

type WhiteSpace = 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line' | 'break-spaces'

type LetterSpace = 'none' | 'default' | 'condensed' | 'expanded'

type TextAlign = 'start' | 'end' | 'left' | 'center' | 'right' | 'justify'

@Component
export default class TextStyler extends Vue {
  @Prop({ default: 'base' }) fontSize?: FontSize
  @Prop() lineHeight?: string // 基本はこのコンポーネントに定義した値を自動でセット。定義以外の指定をしたい場合は直接「lineHeight="1.6"」のように指定。
  @Prop({ default: 'default' }) letterSpacing?: LetterSpace
  @Prop({ default: 'black' }) color?: Color
  @Prop() textAlign?: TextAlign
  @Prop() verticalAlign?: VerticalAlign
  @Prop() whiteSpace?: WhiteSpace
  @Prop() textUnderline?: boolean // テキストリンクなどの下線
  @Prop() textEllipsis?: boolean
  @Prop() type!: 'p' | 'span'
  @Prop({ default: false }) isBold?: boolean
  @Prop() fontFamily!: string

  @Emit()
  click(): void {
    // 親コンポーネントにクリックイベントを通知するだけ
  }

  render(createElement) {
    return createElement(
      this.type,
      {
        class: [
          this.fontSizeClass,
          this.colorClass,
          this.verticalAlignClass,
          this.whiteSpaceClass,
          this.letterSpaceClass,
          this.textAlignClass,
          { 'text-bold': this.isBold },
          { 'text-underline': this.textUnderline },
          { 'text-ellipsis': this.textEllipsis },
          'default-text'
        ],
        style: {
          lineHeight: this.lineHeight,
          fontFamily: this.fontFamily
        },
        on: {
          click: this.click
        }
      },
      this.$slots.default
    )
  }

  get fontSizeClass() {
    if (!this.fontSize) {
      return ''
    }
    switch (this.fontSize) {
      case 'huge':
      case 'big':
      case 'large':
      case 'medium':
      case 'base':
      case 'small':
      case 'tiny':
        return `font-size-${this.fontSize}`
      default:
        return ''
    }
  }

  get colorClass() {
    if (!this.color) {
      return ''
    }
    switch (this.color) {
      case 'main':
      case 'accent':
      case 'error':
      case 'success':
      case 'notice':
      case 'warning':
      case 'link':
      case 'fb':
      case 'tw':
      case 'ya':
      case 'go':
      case 'sub':
        return `${this.color}-color`
      case 'white':
      case 'black':
      case 'gray':
        return this.color
      case 'main_hover':
        return 'main-color-hover'
      case 'accent_hover':
        return 'accent-color-hover'
      case 'accent_sub':
        return 'accent-sub-color'
      case 'light_gray':
        return 'light-gray'
      case 'spare_gray':
        return 'spare-gray'
      case 'dark_gray':
        return 'dark-gray'
      default:
        return ''
    }
  }

  get letterSpaceClass() {
    if (!this.letterSpacing) {
      return ''
    }
    return `letter-space-${this.letterSpacing}`
  }

  get textAlignClass() {
    if (!this.textAlign) {
      return ''
    }
    return `text-align-${this.textAlign}`
  }

  get verticalAlignClass() {
    if (!this.verticalAlign) {
      return ''
    }
    return `vertical-align-${this.verticalAlign}`
  }

  get whiteSpaceClass() {
    if (!this.whiteSpace) {
      return ''
    }
    return `white-space-${this.whiteSpace}`
  }
}
</script>
<style lang="sass" scoped>
/*
 ** デザインガイドラインの指定先：variable.sass
 heading（見出し要素）はHeading.vueコンポーネントに指定
 */
.default-text
  font-family: $base_font_family
.text-bold
  font-weight: bold
/*
 ** フォントサイズ、行の高さ
 */
.font-size-huge
  font-size: $font_size_huge
  line-height: 1.4
.font-size-big
  font-size: $font_size_big
  line-height: 1.4
.font-size-large
  font-size: $font_size_large
  line-height: 1.4
.font-size-base
  @include pc_view
    font-size: $font_size_default_pc
    line-height: 1.6
  @include sp_view
    font-size: $font_size_default_sp
    line-height: 1.6
.font-size-medium
  font-size: $font_size_medium
  line-height: 1.6
.font-size-small
  font-size: $font_size_small
  line-height: 1.6
.font-size-tiny
  font-size: $font_size_tiny
  line-height: 1.8
/*
 ** 文字間スペース
 */
.letter-space-none
  letter-spacing: 0
.letter-space-default
  letter-spacing: 0
.letter-space-condensed
  letter-spacing: 0.8px
.letter-space-expanded
  letter-spacing: 1.4px
/*
 ** カラー
 */
.main-color
  color: $main_color
.main-color-hover
  color: $main_color_hover
.accent-color
  color: $accent_color
.accent-color-hover
  color: $accent_color_hover
.sub-color
  color: $sub_color
.accent-sub-color
  color: $accent_sub_color
.error-color
  color: $error_color
.success-color
  color: $success_color
.notice-color
  color: $notice_color
.warning-color
  color: $warning_color
.white
  color: $white
.black
  color: $black
.dark-gray
  color: $dark_gray
.spare-gray
  color: $spare_gray
.gray
  color: $gray
.light-gray
  color: $light_gray
.link-color
  color: $link_color
  text-decoration: underline
  cursor: pointer
.fb-color
  color: $fb_color
.tw-color
  color: $tw_color
.ya-color
  color: $ya_color
.go-color
  color: $go_color
/*
 ** 水平方向の揃え
 */
.text-align-start
  text-align: start
.text-align-end
  text-align: end
.text-align-left
  text-align: left
.text-align-center
  text-align: center
.text-align-right
  text-align: right
.text-align-justify
  text-align: justify
/*
 ** 垂直方向の揃え
 */
.vertical-align-baseline
  vertical-align: baseline
.vertical-align-bottom
  vertical-align: bottom
.vertical-align-inherit
  vertical-align: inherit
.vertical-align-initial
  vertical-align: initial
.vertical-align-middle
  vertical-align: middle
.vertical-align-sub
  vertical-align: sub
.vertical-align-super
  vertical-align: super
.vertical-align-text-bottom
  vertical-align: text-bottom
.vertical-align-text-top
  vertical-align: text-top
.vertical-align-top
  vertical-align: top
.vertical-align-unset
  vertical-align: unset
/*
 ** 要素内のホワイトスペース
 */
.white-space-normal
  white-space: normal
.white-space-nowrap
  white-space: nowrap
.white-space-pre
  white-space: pre
.white-space-pre-wrap
  white-space: pre-wrap
.white-space-pre-line
  white-space: pre-line
.white-space-break-spaces
  white-space: break-spaces
.text-underline
  text-decoration: underline
</style>
