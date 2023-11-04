/* eslint-disable */
import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $checksEnv(): boolean
    $distanceFormat(distance): string
    $feature(id): boolean
    $moneyFormat(price: number): string
    $telNumberFormat(val: string): string
    $internationalTelFormat(val: string): string
    $zipCodeFormat(val: string): string
    $device: {
      isDesktop: boolean
      isMobile: boolean
      isTablet: boolean
      isMobileOrTablet: boolean
      isDesktopOrTablet: boolean
      isIos: boolean
      isWindows: boolean
      isMacOS: boolean
      isAndroid: boolean
      isFirefox: boolean
      isEdge: boolean
      isChrome: boolean
      isSamsung: boolean
      isCrawler: boolean
    }
  }
}
