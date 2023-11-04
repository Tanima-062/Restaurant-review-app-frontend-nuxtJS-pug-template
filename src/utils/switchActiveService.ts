/**
 *  FIXME: 複雑な構造のShadowRootにアクセスする必要があるため力技でアクセスしている、要修正
 *  共通コンポーネント側がSPA構成を想定していないことが原因。
 * */
export const switchActiveServiceToRestaurant = () => {
  const target1 = document.querySelector('skyticket-header')
  if (target1) {
    const target2 = target1.shadowRoot
    if (target2) {
      const target3 = target2.querySelector('skyticket-header-sp')
      if (target3) {
        const target4 = target3.shadowRoot
        if (target4) {
          const target5 = target4.querySelector('skyticket-header-nav-sp')
          if (target5) {
            const target6 = target5.shadowRoot
            if (target6) {
              const targetRestaurant = target6.querySelectorAll('skyticket-header-nav-item-sp')[8]
              if (targetRestaurant) {
                const target = targetRestaurant.shadowRoot
                if (target) {
                  const active = target.querySelector('div')
                  if (active) {
                    active.classList.remove('header-nav-item')
                    active.classList.add('header-nav-item-active')
                  }
                  const icon = target.querySelector('img')
                  if (icon) {
                    icon.src = 'https://wc.skyticket.jp/svg/header-sp/service-restaurant_white.svg?v0.1'
                  }
                }
              }
              const targetTakeout = target6.querySelectorAll('skyticket-header-nav-item-sp')[9]
              if (targetTakeout) {
                const target = targetTakeout.shadowRoot
                if (target) {
                  const div = target.querySelector('div')
                  if (div) {
                    div.classList.remove('header-nav-item-active')
                    div.classList.add('header-nav-item')
                  }
                  const icon = target.querySelector('img')
                  if (icon) {
                    icon.src = 'https://wc.skyticket.jp/svg/header-sp/service-takeout.svg?v0.2'
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

export const switchActiveServiceToTakeout = () => {
  const target1 = document.querySelector('skyticket-header')
  if (target1) {
    const target2 = target1.shadowRoot
    if (target2) {
      const target3 = target2.querySelector('skyticket-header-sp')
      if (target3) {
        const target4 = target3.shadowRoot
        if (target4) {
          const target5 = target4.querySelector('skyticket-header-nav-sp')
          if (target5) {
            const target6 = target5.shadowRoot
            if (target6) {
              const targetRestaurant = target6.querySelectorAll('skyticket-header-nav-item-sp')[8]
              if (targetRestaurant) {
                const target = targetRestaurant.shadowRoot
                if (target) {
                  const active = target.querySelector('div')
                  if (active) {
                    active.classList.remove('header-nav-item-active')
                    active.classList.add('header-nav-item')
                  }
                  const icon = target.querySelector('img')
                  if (icon) {
                    icon.src = 'https://wc.skyticket.jp/svg/header-sp/service-restaurant.svg?v0.1'
                  }
                }
              }
              const targetTakeout = target6.querySelectorAll('skyticket-header-nav-item-sp')[9]
              if (targetTakeout) {
                const target = targetTakeout.shadowRoot
                if (target) {
                  const active = target.querySelector('div')
                  if (active) {
                    active.classList.remove('header-nav-item')
                    active.classList.add('header-nav-item-active')
                  }
                  const icon = target.querySelector('img')
                  if (icon) {
                    icon.src = 'https://wc.skyticket.jp/svg/header-sp/service-takeout_white.svg?v0.4'
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
