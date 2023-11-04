<template lang="pug">
i(:class='createFlagClass').flags.country-flag
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
  @Prop() private countryCode!: string

  get createFlagClass(): string {
    return this.countryCode ? `flags-${this.countryCode}` : 'flags-ad'
  }
}
</script>

<style lang="sass" scoped>
.country-flag
  background-image: url('~assets/mock/flags.png')
.flag-icon_first_view,
.flag-icon_first_view_sp,
.flags-ad,
.flags-ae,
.flags-af,
.flags-ag,
.flags-ai,
.flags-al,
.flags-am,
.flags-ao,
.flags-aq,
.flags-ar,
.flags-as,
.flags-at,
.flags-au,
.flags-aw,
.flags-ax,
.flags-az,
.flags-ba,
.flags-bb,
.flags-bd,
.flags-be,
.flags-bf,
.flags-bg,
.flags-bh,
.flags-bi,
.flags-bj,
.flags-bl,
.flags-bm,
.flags-bn,
.flags-bo,
.flags-bq,
.flags-br,
.flags-bs,
.flags-bt,
.flags-bv,
.flags-bw,
.flags-by,
.flags-bz,
.flags-ca,
.flags-cc,
.flags-cd,
.flags-cf,
.flags-cg,
.flags-ch,
.flags-ci,
.flags-ck,
.flags-cl,
.flags-cm,
.flags-cn,
.flags-co,
.flags-cr,
.flags-cu,
.flags-cv,
.flags-cw,
.flags-cx,
.flags-cy,
.flags-cz,
.flags-de,
.flags-dj,
.flags-dk,
.flags-dm,
.flags-do,
.flags-dz,
.flags-ec,
.flags-ee,
.flags-eg,
.flags-eh,
.flags-er,
.flags-es,
.flags-es-ct,
.flags-et,
.flags-eu,
.flags-fi,
.flags-fj,
.flags-fk,
.flags-fm,
.flags-fo,
.flags-fr,
.flags-ga,
.flags-gb,
.flags-gb-eng,
.flags-gb-nir,
.flags-gb-sct,
.flags-gb-wls,
.flags-gd,
.flags-ge,
.flags-gf,
.flags-gg,
.flags-gh,
.flags-gi,
.flags-gl,
.flags-gm,
.flags-gn,
.flags-gp,
.flags-gq,
.flags-gr,
.flags-gs,
.flags-gt,
.flags-gu,
.flags-gw,
.flags-gy,
.flags-hk,
.flags-hm,
.flags-hn,
.flags-hr,
.flags-ht,
.flags-hu,
.flags-id,
.flags-ie,
.flags-il,
.flags-im,
.flags-in,
.flags-io,
.flags-iq,
.flags-ir,
.flags-is,
.flags-it,
.flags-je,
.flags-jm,
.flags-jo,
.flags-jp,
.flags-ke,
.flags-kg,
.flags-kh,
.flags-ki,
.flags-km,
.flags-kn,
.flags-kr,
.flags-kw,
.flags-ky,
.flags-kz,
.flags-la,
.flags-lb,
.flags-lc,
.flags-li,
.flags-lk,
.flags-lr,
.flags-ls,
.flags-lt,
.flags-lu,
.flags-lv,
.flags-ly,
.flags-ma,
.flags-mc,
.flags-md,
.flags-me,
.flags-mf,
.flags-mg,
.flags-mh,
.flags-mk,
.flags-ml,
.flags-mm,
.flags-mn,
.flags-mo,
.flags-mp,
.flags-mq,
.flags-mr,
.flags-ms,
.flags-mt,
.flags-mu,
.flags-mv,
.flags-mw,
.flags-mx,
.flags-my,
.flags-mz,
.flags-na,
.flags-nc,
.flags-ne,
.flags-nf,
.flags-ng,
.flags-ni,
.flags-nl,
.flags-no,
.flags-np,
.flags-nr,
.flags-nu,
.flags-nz,
.flags-om,
.flags-pa,
.flags-pe,
.flags-pf,
.flags-pg,
.flags-ph,
.flags-pk,
.flags-pl,
.flags-pm,
.flags-pn,
.flags-pr,
.flags-ps,
.flags-pt,
.flags-pw,
.flags-py,
.flags-qa,
.flags-re,
.flags-ro,
.flags-rs,
.flags-ru,
.flags-rw,
.flags-sa,
.flags-sb,
.flags-sc,
.flags-sd,
.flags-se,
.flags-sg,
.flags-sh,
.flags-si,
.flags-sj,
.flags-sk,
.flags-sl,
.flags-sm,
.flags-sn,
.flags-so,
.flags-sr,
.flags-ss,
.flags-st,
.flags-sv,
.flags-sx,
.flags-sy,
.flags-sz,
.flags-tc,
.flags-td,
.flags-tf,
.flags-tg,
.flags-th,
.flags-tj,
.flags-tk,
.flags-tl,
.flags-tm,
.flags-tn,
.flags-to,
.flags-tr,
.flags-tt,
.flags-tv,
.flags-tw,
.flags-tz,
.flags-ua,
.flags-ug,
.flags-um,
.flags-un,
.flags-us,
.flags-uy,
.flags-uz,
.flags-va,
.flags-vc,
.flags-ve,
.flags-vg,
.flags-vi,
.flags-vn,
.flags-vu,
.flags-wf,
.flags-ws,
.flags-ye,
.flags-yt,
.flags-za,
.flags-zm,
.flags-zw
  width: 20px
  height: 15px
.flag-icon_first_view,.flag-icon_first_view_sp,.flags
  background-repeat: no-repeat
  display: inline-block
.flag-icon_first_view
  border: 1px solid #eee
  margin-right: 10px
  line-height: 15px
.flag-icon_first_view_sp
  margin-right: 10px
  line-height: 20px
.flags
  margin: auto 0
.flags-ad
  background-position: 0 0
.flags-ae
  background-position: -20px 0
.flags-af
  background-position: -40px 0
.flags-ag
  background-position: -60px 0
.flags-ai
  background-position: -80px 0
.flags-al
  background-position: -100px 0
.flags-am
  background-position: -120px 0
.flags-ao
  background-position: -140px 0
.flags-aq
  background-position: -160px 0
.flags-ar
  background-position: -180px 0
.flags-as
  background-position: -200px 0
.flags-at
  background-position: -220px 0
.flags-au
  background-position: -240px 0
.flags-aw
  background-position: 0 -15px
.flags-ax
  background-position: -20px -15px
.flags-az
  background-position: -40px -15px
.flags-ba
  background-position: -60px -15px
.flags-bb
  background-position: -80px -15px
.flags-bd
  background-position: -100px -15px
.flags-be
  background-position: -120px -15px
.flags-bf
  background-position: -140px -15px
.flags-bg
  background-position: -160px -15px
.flags-bh
  background-position: -180px -15px
.flags-bi
  background-position: -200px -15px
.flags-bj
  background-position: -220px -15px
.flags-bl
  background-position: -240px -15px
.flags-bm
  background-position: 0 -30px
.flags-bn
  background-position: -20px -30px
.flags-bo
  background-position: -40px -30px
.flags-bq
  background-position: -60px -30px
.flags-br
  background-position: -80px -30px
.flags-bs
  background-position: -100px -30px
.flags-bt
  background-position: -120px -30px
.flags-bv
  background-position: -140px -30px
.flags-bw
  background-position: -160px -30px
.flags-by
  background-position: -180px -30px
.flags-bz
  background-position: -200px -30px
.flags-ca
  background-position: -220px -30px
.flags-cc
  background-position: -240px -30px
.flags-cd
  background-position: 0 -45px
.flags-cf
  background-position: -20px -45px
.flags-cg
  background-position: -40px -45px
.flags-ch
  background-position: -60px -45px
.flags-ci
  background-position: -80px -45px
.flags-ck
  background-position: -100px -45px
.flags-cl
  background-position: -120px -45px
.flags-cm
  background-position: -140px -45px
.flags-cn
  background-position: -160px -45px
.flags-co
  background-position: -180px -45px
.flags-cr
  background-position: -200px -45px
.flags-cu
  background-position: -220px -45px
.flags-cv
  background-position: -240px -45px
.flags-cw
  background-position: 0 -60px
.flags-cx
  background-position: -20px -60px
.flags-cy
  background-position: -40px -60px
.flags-cz
  background-position: -60px -60px
.flags-de
  background-position: -80px -60px
.flags-dj
  background-position: -100px -60px
.flags-dk
  background-position: -120px -60px
.flags-dm
  background-position: -140px -60px
.flags-do
  background-position: -160px -60px
.flags-dz
  background-position: -180px -60px
.flags-ec
  background-position: -200px -60px
.flags-ee
  background-position: -220px -60px
.flags-eg
  background-position: -240px -60px
.flags-eh
  background-position: 0 -75px
.flags-er
  background-position: -20px -75px
.flags-es
  background-position: -40px -75px
.flags-es-ct
  background-position: -60px -75px
.flags-et
  background-position: -80px -75px
.flags-eu
  background-position: -100px -75px
.flags-fi
  background-position: -120px -75px
.flags-fj
  background-position: -140px -75px
.flags-fk
  background-position: -160px -75px
.flags-fm
  background-position: -180px -75px
.flags-fo
  background-position: -200px -75px
.flags-fr
  background-position: -220px -75px
.flags-ga
  background-position: -240px -75px
.flags-gb
  background-position: 0 -90px
.flags-gb-eng
  background-position: -20px -90px
.flags-gb-nir
  background-position: -40px -90px
.flags-gb-sct
  background-position: -60px -90px
.flags-gb-wls
  background-position: -80px -90px
.flags-gd
  background-position: -100px -90px
.flags-ge
  background-position: -120px -90px
.flags-gf
  background-position: -140px -90px
.flags-gg
  background-position: -160px -90px
.flags-gh
  background-position: -180px -90px
.flags-gi
  background-position: -200px -90px
.flags-gl
  background-position: -220px -90px
.flags-gm
  background-position: -240px -90px
.flags-gn
  background-position: 0 -105px
.flags-gp
  background-position: -20px -105px
.flags-gq
  background-position: -40px -105px
.flags-gr
  background-position: -60px -105px
.flags-gs
  background-position: -80px -105px
.flags-gt
  background-position: -100px -105px
.flags-gu
  background-position: -120px -105px
.flags-gw
  background-position: -140px -105px
.flags-gy
  background-position: -160px -105px
.flags-hk
  background-position: -180px -105px
.flags-hm
  background-position: -200px -105px
.flags-hn
  background-position: -220px -105px
.flags-hr
  background-position: -240px -105px
.flags-ht
  background-position: 0 -120px
.flags-hu
  background-position: -20px -120px
.flags-id
  background-position: -40px -120px
.flags-ie
  background-position: -60px -120px
.flags-il
  background-position: -80px -120px
.flags-im
  background-position: -100px -120px
.flags-in
  background-position: -120px -120px
.flags-io
  background-position: -140px -120px
.flags-iq
  background-position: -160px -120px
.flags-ir
  background-position: -180px -120px
.flags-is
  background-position: -200px -120px
.flags-it
  background-position: -220px -120px
.flags-je
  background-position: -240px -120px
.flags-jm
  background-position: 0 -135px
.flags-jo
  background-position: -20px -135px
.flags-jp
  background-position: -40px -135px
.flags-ke
  background-position: -60px -135px
.flags-kg
  background-position: -80px -135px
.flags-kh
  background-position: -100px -135px
.flags-ki
  background-position: -120px -135px
.flags-km
  background-position: -140px -135px
.flags-kn
  background-position: -160px -135px
.flags-kp
  width: 20px
  height: 15px
  background-position: -180px -135px
.flags-kr
  background-position: -200px -135px
.flags-kw
  background-position: -220px -135px
.flags-ky
  background-position: -240px -135px
.flags-kz
  background-position: 0 -150px
.flags-la
  background-position: -20px -150px
.flags-lb
  background-position: -40px -150px
.flags-lc
  background-position: -60px -150px
.flags-li
  background-position: -80px -150px
.flags-lk
  background-position: -100px -150px
.flags-lr
  background-position: -120px -150px
.flags-ls
  background-position: -140px -150px
.flags-lt
  background-position: -160px -150px
.flags-lu
  background-position: -180px -150px
.flags-lv
  background-position: -200px -150px
.flags-ly
  background-position: -220px -150px
.flags-ma
  background-position: -240px -150px
.flags-mc
  background-position: 0 -165px
.flags-md
  background-position: -20px -165px
.flags-me
  background-position: -40px -165px
.flags-mf
  background-position: -60px -165px
.flags-mg
  background-position: -80px -165px
.flags-mh
  background-position: -100px -165px
.flags-mk
  background-position: -120px -165px
.flags-ml
  background-position: -140px -165px
.flags-mm
  background-position: -160px -165px
.flags-mn
  background-position: -180px -165px
.flags-mo
  background-position: -200px -165px
.flags-mp
  background-position: -220px -165px
.flags-mq
  background-position: -240px -165px
.flags-mr
  background-position: 0 -180px
.flags-ms
  background-position: -20px -180px
.flags-mt
  background-position: -40px -180px
.flags-mu
  background-position: -60px -180px
.flags-mv
  background-position: -80px -180px
.flags-mw
  background-position: -100px -180px
.flags-mx
  background-position: -120px -180px
.flags-my
  background-position: -140px -180px
.flags-mz
  background-position: -160px -180px
.flags-na
  background-position: -180px -180px
.flags-nc
  background-position: -200px -180px
.flags-ne
  background-position: -220px -180px
.flags-nf
  background-position: -240px -180px
.flags-ng
  background-position: 0 -195px
.flags-ni
  background-position: -20px -195px
.flags-nl
  background-position: -40px -195px
.flags-no
  background-position: -60px -195px
.flags-np
  background-position: -80px -195px
.flags-nr
  background-position: -100px -195px
.flags-nu
  background-position: -120px -195px
.flags-nz
  background-position: -140px -195px
.flags-om
  background-position: -160px -195px
.flags-pa
  background-position: -180px -195px
.flags-pe
  background-position: -200px -195px
.flags-pf
  background-position: -220px -195px
.flags-pg
  background-position: -240px -195px
.flags-ph
  background-position: 0 -210px
.flags-pk
  background-position: -20px -210px
.flags-pl
  background-position: -40px -210px
.flags-pm
  background-position: -60px -210px
.flags-pn
  background-position: -80px -210px
.flags-pr
  background-position: -100px -210px
.flags-ps
  background-position: -120px -210px
.flags-pt
  background-position: -140px -210px
.flags-pw
  background-position: -160px -210px
.flags-py
  background-position: -180px -210px
.flags-qa
  background-position: -200px -210px
.flags-re
  background-position: -220px -210px
.flags-ro
  background-position: -240px -210px
.flags-rs
  background-position: 0 -225px
.flags-ru
  background-position: -20px -225px
.flags-rw
  background-position: -40px -225px
.flags-sa
  background-position: -60px -225px
.flags-sb
  background-position: -80px -225px
.flags-sc
  background-position: -100px -225px
.flags-sd
  background-position: -120px -225px
.flags-se
  background-position: -140px -225px
.flags-sg
  background-position: -160px -225px
.flags-sh
  background-position: -180px -225px
.flags-si
  background-position: -200px -225px
.flags-sj
  background-position: -220px -225px
.flags-sk
  background-position: -240px -225px
.flags-sl
  background-position: 0 -240px
.flags-sm
  background-position: -20px -240px
.flags-sn
  background-position: -40px -240px
.flags-so
  background-position: -60px -240px
.flags-sr
  background-position: -80px -240px
.flags-ss
  background-position: -100px -240px
.flags-st
  background-position: -120px -240px
.flags-sv
  background-position: -140px -240px
.flags-sx
  background-position: -160px -240px
.flags-sy
  background-position: -180px -240px
.flags-sz
  background-position: -200px -240px
.flags-tc
  background-position: -220px -240px
.flags-td
  background-position: -240px -240px
.flags-tf
  background-position: 0 -255px
.flags-tg
  background-position: -20px -255px
.flags-th
  background-position: -40px -255px
.flags-tj
  background-position: -60px -255px
.flags-tk
  background-position: -80px -255px
.flags-tl
  background-position: -100px -255px
.flags-tm
  background-position: -120px -255px
.flags-tn
  background-position: -140px -255px
.flags-to
  background-position: -160px -255px
.flags-tr
  background-position: -180px -255px
.flags-tt
  background-position: -200px -255px
.flags-tv
  background-position: -220px -255px
.flags-tw
  background-position: -240px -255px
.flags-tz
  background-position: -260px 0
.flags-ua
  background-position: -260px -15px
.flags-ug
  background-position: -260px -30px
.flags-um
  background-position: -260px -45px
.flags-un
  background-position: -260px -60px
.flags-us
  background-position: -260px -75px
.flags-uy
  background-position: -260px -90px
.flags-uz
  background-position: -260px -105px
.flags-va
  background-position: -260px -120px
.flags-vc
  background-position: -260px -135px
.flags-ve
  background-position: -260px -150px
.flags-vg
  background-position: -260px -165px
.flags-vi
  background-position: -260px -180px
.flags-vn
  background-position: -260px -195px
.flags-vu
  background-position: -260px -210px
.flags-wf
  background-position: -260px -225px
.flags-ws
  background-position: -260px -240px
.flags-ye
  background-position: -260px -255px
.flags-yt
  background-position: 0 -270px
.flags-za
  background-position: -20px -270px
.flags-zm
  background-position: -40px -270px
.flags-zw
  background-position: -60px -270px
</style>
