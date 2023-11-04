<template lang="pug">
base-drawer.rental-term-drawer(:title="companyName + 'レンタル規約'" :isActive="isOpenRentalTermDrawer" @close="closeRentalTermDrawer" :wrapperClosable="true")
  div(v-if="rentalTerm").-contents
    section(v-for="(chapter, chapters_key) in rentalTerm.chapters" :key="chapters_key+'_'+chapter.title")
      heading.mt-xxl(:number="2" fontSize="m" v-show="chapter.display") {{chapter.title}}
      div.mt-l(v-for="(section, sections_key) in chapter.sections" :key="sections_key+'_'+section.title")
        heading(:number="3" fontSize="s" v-show="section.display") {{section.title}}
        ul.mt-l(v-for="(clause, clauses_key) in section.clauses" :key="clauses_key+'_'+clause.title")
          li
            paragraph
              span-bold(v-show="clause.display") {{clause.title}}
            div.mt-l(v-for="(subClause, key) in clause.subClauses" :key="key" v-show="subClause.display")
              paragraph(v-for="(clauseOption, options_key) in subClause.clauseOptions" :key="options_key+'_'+clauseOption.title" v-show="clauseOption.display")
                span-bold {{clauseOption.title}}
                paragraph.mt-s(whiteSpace="pre-line" v-html="clauseOption.description")
  div(v-else).-contents
    section
      heading.mt-xxl(:number="2" fontSize="m") 補償される内容 レンタル料金に含まれているもの
      div.mt-l
        heading(:number="3" fontSize="s") 保険、カバー、免除
        ul.mt-l
          li
            paragraph
              span-bold 自車両損害補償保険
            paragraph.mt-s レンタル中にレンタル車両に対する損傷が発生し、自車両損害補償保険の補償範囲内の場合、お支払いいただく修理代金は最大でも定められた免責額までです。 本補償は貸渡約款が順守された場合のみに有効です。その他車体部位（例：ガラス、タイヤ、内装、屋根、車台）、請求金額（例：けん引料金、オフロードタイム）、車内用品（例：チャイルドシート、GPSデバイスまたは個人の所持品）は補償されません。
          li.mt-l
            paragraph
              span-bold 第三者傷害保険 (TPL)
            paragraph.mt-s 本補償は、ポリシー補償範囲の負傷や物的損害に対する運転者の賠償責任を補償します。運転者の負傷やレンタカーへの損傷は補償対象外です。本補償は貸渡約款が順守された場合のみに有効です。
          li.mt-l
            paragraph
              span-bold 盗難保険 (TP)
            paragraph.mt-s レンタル中にレンタル車両が盗難に遭い、盗難保険の補償範囲内の場合、車両の買い替えのためにお支払いいただく金額は最大でも定められた免責額までです。本保険は貸渡約款が順守された場合のみに有効です。
          li.mt-l
            paragraph
              span-bold 搭乗者傷害保険 (PAI)
            paragraph.mt-s 事故の際、本補償は死亡および四肢の欠損を含むポリシー補償範囲内の負傷に対する医療費および訴訟費用を補償します。本補償は貸渡約款が順守された場合のみに有効です。
      div.mt-l
        heading.mt-xl(:number="3" fontSize="s") 追加料金不要で含まれている
        ul.mt-l
          li
            paragraph 空港サーチャージ
            paragraph.mt-s カーナビレンタル
      div.mt-l
        heading.mt-xl(:number="3" fontSize="s") マイレージ/走行距離
        ul.mt-l
          li
            paragraph レンタルプランに、無制限の無料走行距離が含まれます。<br>レンタル期間を変更すると、無料走行距離（km）に影響する場合があります。また、超過した距離の1kmごとにかかる料金も変更になる可能性があります。
    section
      heading.mt-xxl(:number="2" fontSize="m") レンタル料金には含まれていないもの
      div.mt-l
        heading.mt-xl(:number="3" fontSize="s") 現地費用
        ul.mt-l
          li
            paragraph.mt-s 本項目ではレンタルする場所や運転手、および走行場所に応じて、営業所で支払う各種料金を規定しています。
            paragraph.mt-s なお本項目には燃料費、チャイルドシート、追加サービスなど、営業所で支払うその他の料金の規定は含まれていません。それらの料金の詳細については、本利用規約の別の項目に記載されています。
            paragraph.mt-s レンタル中に発生する各種料金や罰金は、すべてお客様の負担となります。これには有料道路料金、渋滞税、スピード違反罰則金、駐車違反、および交通違反罰則金などが含まれます。
          li.mt-l
            paragraph
              span-bold レンタカー返却後
            paragraph.mt-s レンタル中にスピード違反の罰金や渋滞税の課金が発生した場合、レンタカー会社は当局から運転手の照会があり次第、運転手に連絡をとることがあります。このような連絡は、返却から数ヶ月後になる場合もあります。なお、当該の発生費用のほかに、レンタカー会社への手数料が請求されます。
            paragraph.mt-s 備考：異なる料金形態を比較しやすくするため、統一した各種料金の名称を使用していますが、レンタカー会社によってはそれらの名称が若干異なる場合があります。
          li.mt-l
            paragraph
              span-bold 通行料金
            paragraph.mt-s 道路によっては通行料金が設定されています。これらの料金はレンタル代金に含まれていませんので、ご留意ください。走行する地域によっては、通行料金の支払い方法に複数選択肢がある可能性があります。詳細については、車を受け取る際にカウンターのスタッフにお尋ねください。
        heading.mt-xl(:number="3" fontSize="s") 乗捨てレンタル
        ul.mt-l
          li
            paragraph.mt-s 乗捨てレンタルー貸出場所と返却場所が異なる場合、乗捨て料金が発生する場合がございます。乗捨てレンタルの場合は必ず事前にお知らせ下さい。契約時と異なった場所に返却されるとレンタカー会社より”ペナルティ”が課せられます。
        heading.mt-xl(:number="3" fontSize="s") その他の料金
        ul.mt-l
          li
            paragraph.mt-s 以下の項目に1つでも該当する場合、出発時または返却時に、営業所にて追加料金が請求されます
            paragraph.mt-l
              span-bold 清掃料
            paragraph.mt-s 返却時において、通常の清掃以外の対応が発生する場合は、レンタカー会社より清掃料が別途請求されます。
            paragraph.mt-s レンタカー会社から、この料金の金額は通知されていません。この料金が適用されるかは、受付スタッフが確認します。
    section
      heading.mt-xxl(:number="2" fontSize="m") お車受け取りの際に必要なもの
      div.mt-l
        heading.mt-xl(:number="3" fontSize="s") 現地での支払い方法
        ul.mt-l
          li
            paragraph
              span-bold このご予約にはクレジットカードをお持ち頂く必要がございます。
            paragraph.mt-s メインドライバー様はお車をお受取になる際お客様名義のクレジットカードをお持ち頂く必要がございます。カードには免責/デポジット額（レンタル期間中にカードにブロックがかかります）をカバーできる十分な限度額がある必要がございます。カードにてレンタカー窓口では現地費用、追加の商品や追加でご購入される全てについてお支払頂くことになります。
            paragraph.mt-s 現金、デビッドカードはご利用不可
            paragraph.mt-l
              span-bold ご利用可能なクレジットカード
            paragraph.mt-s アメリカンエキスプレス
            paragraph.mt-s マスターカード
            paragraph.mt-s ビザ
            paragraph.mt-s JCB
            paragraph.mt-l
              span-bold ご確認ください：
            paragraph.mt-s こちらの会社は受け付けません プリペイド, 補充型、仮想クレジットカード 及びエンボス加工（凹凸加工）の無い全てのクレジットカード
            paragraph.mt-s Visa Dankort カードはご利用不可。
            paragraph.mt-s Chinese UnionPay credit card （銀連カード）のクレジットカードはご利用いただけない場合がございます。詳しくはUnionPayのウェブサイトをご参照ください。
      div.mt-l
        heading.mt-xl(:number="3" fontSize="s") 免許証の条件
        ul.mt-l
          li
            paragraph.mt-s ご利用開始時に、ご登録運転手様と全ての追加運転手様のご本人様名義、かつ有効な運転免許証の提示が必要です。
            paragraph.mt-s 全ての運転手様が発行から最低 1 年 の運転免許証が必要となります。
            paragraph.mt-s 中国パスポートの保有者で、フィリピンで発行された国際運転免許証を使用する場合は、フィリピンに1ヶ月以上滞在していたことを示すスタンプがパスポート上で確認できる必要があります。確認できない場合は車を受け取ることができません。
            paragraph.mt-s 国際免許書が必要です。
            paragraph.mt-s すべての運転者は、過去12ヶ月間以内に発行された国際運転免許証を所持している必要があります。
            paragraph.mt-s ベルギー、エストニア、 フランス、ドイツ、モナコ、スロベニア、スイス、台湾の免許証をお持ちの方は、免許証の公式な翻訳が必要となります（国際運転免許証とは異なりますので、ご注意ください）。翻訳は、日本における自国の領事館・大使館、または日本における日本自動車連盟（JAF）の営業所が発行したものである必要があります。詳細については、JAFのウェブサイト（英語 ）・日本語をご覧ください。
            paragraph.mt-s その他日本の免許証をお持ちでない方は、1949年ジュネーブ道路交通条約に基づいて発行された国際運転免許証が必要となります。1968年ウィーン道路交通条約に基づいて発行された国際運転免許証は不可となりますので、ご注意ください。
            paragraph.mt-s 公式な翻訳または国際運転免許証をお持ちの方は、自国の運転免許も必要となります（免許証が発行されている場合は、免許証も必要）。
            paragraph.mt-l
              span-bold DVLA 規定と規則
            paragraph.mt-s イギリスの自動車運転免許証を所有している場合、ピックアップ時にカウンターのスタッフが運転記録を確認する必要があります。確認方法はいくつかありますが、 このレンタカー会社の確認方法については不明なため、ピックアップ前にDVLAの 運転免許の「check code」を取得しておくことを推奨します。
            paragraph.mt-l 1.www.gov.uk/view-driving-licenceにアクセスし、「Start now」をクリックします。
            paragraph 2.運転免許証番号、国民保険番号、郵便番号を入力します。
            paragraph 3.「I agree」のボックスにチェックをつけて、「View now」をクリックします。
            paragraph 4.「Share your licence information」をクリックします。
            paragraph 5.「Get a code」をクリックします。
            paragraph 6.コードをメモするか、プリンターがあれば「Print」をクリックします。
            paragraph.mt-s コードの有効期限は21日間のみですが、車をピックアップした後は特に必要になることはありません。ピックアップ日の3週間前以降にコードを取得（および印刷）してください。
      div.mt-l
        heading.mt-xl(:number="3" fontSize="s") 身分証明書
        ul.mt-l
          li
            paragraph.mt-s パスポートのご提示が必要です。
      div.mt-l
        heading.mt-xl(:number="3" fontSize="s") ご予約確認書またはeバウチャー
        ul.mt-l
          li
            paragraph.mt-s ご予約確認書は、レンタカーが運転者代表のお名前で予約されていることを証明します。
            paragraph.mt-s 貸出時にはレンタカー会社に印刷したバウチャー（予約確認書）を提示して下さい。提示がない場合にはレンタルができない、もしくは新たに請求される場合がございます。
      div.mt-l
        heading.mt-xl(:number="3" fontSize="s") 年齢制限
        ul.mt-l
          li
            paragraph.mt-s 18歳以上
            paragraph.mt-s 99歳以下
            paragraph.mt-s レンタカーの年齢制限は全ての運転手に適用されます。
      div.mt-l
        heading.mt-xl(:number="3" fontSize="s") 到着詳細
        ul.mt-l
          li
            paragraph.mt-s フライト情報：飛行機で到着する場合、フライト情報をお知らせください。いただいた情報をレンタカー会社にお伝えします。可能であれば、ピックアップの3日前までにご連絡ください。車両を予約する際に、フライト番号をお知らせください。すでに予約が完了している場合は、ページの上部に表示される「予約を管理する」をクリックしてフライト情報を追加してください。入力する番号がフライト番号であることを確認してください。航空会社から受け取ったその他の番号（確認番号など）は入力しないようにしてください。フライトに問題が発生し、それが原因で車両をピックアップできなかった場合、弊社では責任を負いかねます。そのような場合の補償については、航空会社にお問い合わせください。
    section
      heading.mt-xxl(:number="2" fontSize="m") デポジット、免責、保険に関して
      div.mt-l
        heading.mt-xl(:number="3" fontSize="s") デポジット/免責額
        ul.mt-l
          li
            paragraph.mt-s 車両には損害の免責￥ 100,000 税込みがあります。
            paragraph.mt-s 車両には盗難の免責￥ 50,000 税込みがあります。
            paragraph.mt-s 車両の引き渡し時に、レンタカー会社がデポジットを要求することはありません。
            paragraph.mt-s 車両には損害の免責￥ 為替レートの変化、外国為替手数料または銀行手数料等がかかってくる場合がございますので、お預かりした料金と返金された料金が変わってくる場合がございますが、レンタカー会社では差額または追加手数料等の責任を取ることは致しかねます。
      div.mt-l
        heading.mt-xl(:number="3" fontSize="s") Rentaltakeout.com保険
        ul.mt-l
          li
            paragraph.mt-l
              span-bold フル・プロテクション
              paragraph.mt-s レンタル開始前に弊社のフルプロテクション保障商品を購入されると、以下の免責内容を弊社が追加保障・返金いたします:
              ul.list_01.mt-s
                li エクステリア（外部）やメカニカル（機械）部品へのダメージに対する請求、含まれる物:
                  ul.list_02
                    li ボディーワーク、屋根、車体下部
                    li ウィンドウスクリーン、窓ガラス、ミラー
                    li ホイール、タイヤ、ハブキャップ
                    li エンジン、クラッチ、バッテリー
                    li 鍵
                li ‘営業保証料’ (車両修理中に貸出ができない為、それを補償する費用)
                li 故障や事故に伴うロードサイドサポートに関連する費用
                li 車内に鍵を入れたままロックした場合や鍵の紛失に伴う費用
                li 車両の盗難保険ポリシーに基づいてレンタカー会社に請求する費用
                li これらに関係するレンタカー会社の事務手数料.
            paragraph.mt-s 弊社のフルプロテクション保障商品では以下の内容は保障しません :
            ul.list_01.mt-s
              li レンタカー会社に承認をされていない修理、ロードサービスやその他のサービス
              li 清掃費用や車内内装（衝突によって応じた場合を除く）
              li チャイルドシートやカーナビやその他のエクストラ商品に対してのダメージや喪失
            paragraph.mt-m 全ての運転者はレンタル契約の利用規約を遵守する義務があります：危険・無謀・過失の伴う運転、給油間違い、飲酒あるいは薬物使用状態での運転等、利用規約違反により発生した費用は弊社のフルプロテクション保障商品では一切返金されません。<br>弊社のフルプロテクション保障商品を購入されていても、事故が起こった場合に備えレンタカー会社はレンタル開始時にお客様のクレジットカードから保証金を一時預かります。ですが、フルプロテクション保障商品で保障内容の支払い責任を弊社が請け負いますので、保証金から差し引かれた場合はその額を弊社が返金いたします。ただし、返金に関してはここに明記される規約範疇内で行われます。
            paragraph.mt-m フル・プロテクションを購入の場合は、メールにて関連書類をお送りします。
            paragraph.mt-m レンタル中の免責額をカバーするレンタルカーズドットコムの商品を購入された場合には申請をしていただかない限り返金はございません。
      div.mt-l
        heading.mt-xl(:number="3" fontSize="s") 現地で購入可能なオプションの保険、カバー等
        ul.mt-l
          li
            paragraph 自車両損害補償制度(SCDW)は、自車両損害補償保険(CDW)は、レンタル中に万一レンタカーを破損した場合、破損修復に必要な経費全額を支払う義務を軽減する制度です。（詳細はレンタカー会社規約により異なる）通常は全額ではなく一部（免責）が運転手様のご負担となります。通常免責額は0となります。
            paragraph この保険はご登録頂いた運転手様がご利用いただいたときに適用します。
      div.mt-l
        heading.mt-xl(:number="3" fontSize="s") 保険アレンジメント
        ul.mt-l
          li
            paragraph
              span-bold 保険規約
            paragraph.mt-s 車両をピックアップする際に、レンタカー会社営業所のスタッフが免責補償またはデポジットに関連して追加の商品の購入を勧める場合があります。弊社を通してフル・プロテクションを購入済みの場合は、追加商品を購入する必要はありません。ただし、レンタカー会社が提供する商品は、フル・プロテクションには含まれない内容（より広範囲のサービスなど）を含む場合があります。このような内容をご希望の場合は、レンタカー会社提供の商品を購入してください。
            paragraph 現地にてレンタル同意書にサインをされる際、必ず約款をご確認くださいませ。<br>通常自車両損害補償保険（ＣＤＷ）にてカバーされていない部位、ウィンドスクリーン、グラス、ホイール、タイヤ、車体底、内装、クラッチ、お手荷物、レッカー移動代等は補償内容に含まれません。また現地で追加されたオプショナル商品、チャイルドシートやカーナビ等もカバーされていません。<br>飲酒運転または薬物運転、故意の損傷、オフロード運転、給油ミス、不注意に関する事故に関してはご利用規約に基づき保険内で補償できかねます。
      div.mt-l
        heading.mt-xl(:number="3" fontSize="s") 事務手数料
        ul.mt-l
          li
            paragraph 万が一破損が確認された場合、返却後請求が上がります。請求金額には修理費と、事務手数料が含まれます。
            paragraph 営業補償手数料が万が一事故があった場合追加されます。こちらも免責額から差し引きされます。料金は車両クラスと修理期間を基に計算されます。
    section
        heading.mt-xxl(:number="2" fontSize="m") ガソリンポリシー
        div.mt-l
          heading.mt-xl(:number="3" fontSize="s") 満タン返し
          ul.mt-l
            li
              paragraph お車をピックアップする際、タンクのガソリンは満タンか、ある程度入っている状態です。ガソリン代の補償のために、デポジットが必要となります。このデポジットはカウンターのスタッフによってクレジットカード上で仮押さえされます。お車を返却する直前に、使用した分のガソリンを補ってください。
    section
        heading.mt-xxl(:number="2" fontSize="m") エキストラサービス（現地での支払い）
        div.mt-l
          heading.mt-xl(:number="3" fontSize="s") 国境越え、境界ルール
          ul.mt-l
            li
              paragraph ご注意：こちらのレンタカー会社様では、国境越えが出来ません。
          heading.mt-xl(:number="3" fontSize="s") 税金と手数料
          ul.mt-l
            li
              paragraph その他のサービス各種は売上税と土地税適用の対象となります。
    section
        heading.mt-xxl(:number="2" fontSize="m") エキストラ商品（現地での支払い）
        div.mt-l
          heading.mt-xl(:number="3" fontSize="s") 現地でお支払いいただくオプショナル商品
          ul.mt-l
            li
              paragraph 追加オプションは予約時にリクエストし、レンタカーの受け取り時に（レンタカー会社に直接）支払う必要があります。弊社は追加オプションの利用状況を保証いたしかねます。また、料金はレンタカー会社が管理しており、変更される場合もあるためご了承ください。
          heading.mt-xl(:number="3" fontSize="s") オプショナル商品に関して
          ul.mt-l
            li
              paragraph その他の追加商品は、売上税と土地税適応の対象となります。
              paragraph GPSの音声に関しましては、日本語、韓国語、中国語、英語対応ですが、地図は、日本語表記のみになります。
              paragraph エクストラ商品をリクエストしているお客様はレンタカー会社でデポジットを支払う必要がある場合がございます。
          heading.mt-xl(:number="3" fontSize="s") 追加ドライバー料金（複数）
          ul.mt-l
            li
              paragraph レンタカー会社の年齢に関連する費用および制限は、すべての追加のドライバー様に適用されます。
    section
        heading.mt-xxl(:number="2" fontSize="m") 重要な情報
        div.mt-l
          heading.mt-xl(:number="3" fontSize="s") 重要事項：Rentaltakeout.com
          ul.mt-l
            li
              paragraph 自国、海外で、レンタカーの運転に関する規則や法律を理解し、お車の貸し出し前に、必ずご利用規約をお読み頂きます様、お願い申し上げます。 具体的には、現地に必ずお持ち頂く書類を忘れずにお持ち下さいませ。（例えば運転免許証、身分証明となる書類、およびクレジットカード等）。尚、現地で別途、お支払い頂く商品に関しましても、事前にご確認下さいませ。万が一、必要な書類を全てお持ちでない場合は、お車の貸し出しが出来ない場合が御座います。ご注意下さいませ。
              paragraph ご予約にあたり、ご利用規約をお読み頂き、ご理解頂きました事をお約束下さいませ。
              paragraph.mt-s 現地にて、お車を貸し出しになる際に、レンタル同意書にご署名頂く事と思いますが、必ず内容をご確認頂き、ご理解頂いた上で、同意書にご署名頂く様、お願い申し上げます。
              paragraph.mt-s もし、何かご不明な点など御座いましたら、必ず、ご署名される前に現地の担当者様にご確認下さいませ。もしも、不満な点など御座いましたら、必ず、現地の担当者の方にその旨をお伝え下さいませ。それでも、対応に満足されない場合は、弊社のお問い合わせページからご相談下さいませ。
              paragraph.mt-s 何か、ご不明な点、ご質問など御座いましたら、お気軽に弊社までお問い合わせ下さいませ。弊社のウエブサイトから営業時間をお調べの上、ご連絡下さいませ。
              paragraph.mt-s レンタカーについて問題が発生した場合は、レンタカー会社までお問い合わせください。
              paragraph レンタカーのご利用中にその他のサポートが必要となった場合は、弊社までお問い合わせください。
              paragraph レンタカー会社および弊社の電話番号は、ご予約確認書の「ロードサイドサービスの連絡先」からご確認いただけます。
              paragraph.mt-s 為替レートおよび手数料について
              paragraph.mt-s 為替レートの変動や、ご利用の銀行またはクレジットカード発行元により請求されたいかなる手数料について、弊社は責任を負いかねますのでご了承ください。このため、クレジットカード明細上の金額が、予約時にご覧になった金額と異なる場合があります。一方、弊社がお客様の口座に振り込みを行う場合は、請求された金額と同額を返金いたします。
              paragraph.mt-s 弊社の利用規約全文は、ページ下部の利用規約のリンクをクリックするとご覧いただけます。
          heading.mt-xl(:number="3" fontSize="s") 重要事項：現地レンタカー会社
          ul.mt-l
            li
              paragraph 事故や故障 -故障、事故等が起きた際は、すぐにレンタカー会社様に連絡して下さい。レンタカー会社様は、修理や交換用の車をアレンジする必要があります。その際の書類は必ず保管してください。後に返金を希望される際に、こちらが必要になる場合が御座います。事故の際の、レンタカー会社様からの警察の報告書と事故報告書が必要となります。
              paragraph.mt-s ロードアシスタンス - ほとんどのレンタカー会社では、ロードアシスタンスサービスのご用意が御座います。こちらは別途料金になります。お車を貸し出しの際、書類が保管されている場所を必ず確認してください。ほとんどの場合には、グローブボックスの中に居るか、サンバイザーに取り付けられています。
              paragraph.mt-s 鍵の紛失ー万が一、鍵を紛失された場合は、別途、交換料金が発生します。
              paragraph.mt-s シートベルトーどの国におきましても、運転の際は、運転手様も乗客の方も必ずシートベルトを着用して下さい。
              paragraph.mt-s すべての車は禁煙車になりますので、ご注意下さいませ。万が一、規則を破った場合は、罰金が適用されます。
              paragraph.mt-s 料金計算-レンタル料金は、貸し出し、返却時間と、お客様がレンタルを開始する前に同意した日付に基づいています。その後、お客様がお車の貸し出し時間に遅れたり、お車の返却を早めた際は、一切の返金は御座いませんのでご注意下さいませ。
              paragraph.mt-s フライト情報：飛行機で到着する場合、フライト情報をお知らせください。いただいた情報をレンタカー会社にお伝えします。可能であれば、ピックアップの3日前までにご連絡ください。車両を予約する際に、フライト番号をお知らせください。すでに予約が完了している場合は、ページの上部に表示される「予約を管理する」をクリックしてフライト情報を追加してください。入力する番号がフライト番号であることを確認してください。航空会社から受け取ったその他の番号（確認番号など）は入力しないようにしてください。フライトに問題が発生し、それが原因で車両をピックアップできなかった場合、弊社では責任を負いかねます。そのような場合の補償については、航空会社にお問い合わせください。
              paragraph.mt-s お客様は、貸出時に、ご予約の際とは違うサイズ、タイプのお車をご希望し、そちらに変更される場合もあるかと思います。
              paragraph.mt-s その際は、現地レンタカー会社様から追加料金を請求される場合が御座います。（御予約のお車よりも小さいサイズのお車に変更された際も同じです。）
              paragraph.mt-s 事故の際；他の車両が屋根に乗り上げた場合；免責額以上の請求をされる場合があります。
          heading.mt-xl(:number="3" fontSize="s") 重要事項：ご予約のキャンセル、現地にお越しになられなかった場合、ご予約の変更
          ul.mt-l
            li
              paragraph
                span-bold デポジット払い予約でのご予約のキャンセル
              ul.list_01.mt-s
                li 48 時間 前、もしくは、それ以前にキャンセルをされた場合は、デポジット料金を引いた金額を返金させて頂きます。
                li 48 時間 前以下にキャンセルをされたお客様でまだ、レンタル開始前のお客様は、デポジット料金、もしくは3 日 間のレンタル料金を引いた金額を返金させて頂きます。
                  ul.list_02
                    li もし、 3 日以下のご予約のキャンセルの場合は、追加料金は発生しませんが、返金は御座いません。
            li
              paragraph.mt-l
                span-bold 全額前払い予約のキャンセル
              ul.list_01.mt-s
                li もし、 48 時間前までのキャンセル、もしくは、それ以前のキャンセルの場合は、お支払い頂きました金額を返金させて頂きます。
                li もし、貸し出し 48 時間前でのキャンセルの場合、3 日分のレンタル料金を引いて、お支払い頂きました金額を返金させて頂きます。：
                  ul.list_02
                    li もし、3 日以下のご予約のキャンセルの場合は、追加料金は発生しませんが、返金も御座いません。
                li もし、お客様が定刻の日時と時間に現地にお越しにならなかった場合/必要書類をお持ちになられなかった場合/クレジットカードが使用不可だった場合は、レンタカーを出来ない場合が御座います。その際は：
                  ul.list_02
                    li お客様が現地から弊社に連絡して頂ければ、 3 日間のレンタル料金を引いた金額を返金させて頂きます。
                    li お客様から連絡がない場合は、返金は一切御座いません。
            li
              paragraph.mt-l
                span-bold No-Show
              ul.list_01.mt-s
                li キャンセルを希望していたが、貸し出し前に弊社まで連絡がなかった場合もしくは
                li 定刻時間、日時に現地にお越しにならなかった場合、もしくは
                li 貸出時に必要な書類を現地に提出されなかった場合、もしくは
                li メイン運転手様名義のクレジットカードに充分な残金がなかった場合。
              paragraph.mt-s この様な場合のレンタル料金の返金は一切できかねます。
              paragraph.mt-s 貸出時間に到着していない場合は必要書類や十分な残額があるクレジットカードをお持ちでもレンタカー会社は車両引渡しを拒否することができます。この場合、ピックアップ前のキャンセルであっても返金はございません。
            li
              paragraph.mt-l
                span-bold 修正（予約の変更）
              paragraph.mt-s 受取日時の前であれば、いつでも予約内容を変更することができます。<br>ご利用まで48時間以上ある場合は、右上の「予約を管理する」より簡単に変更できます。<br>何らかの予約内容の変更が必要で、ご利用まで48時間以内の場合はお電話でご連絡ください。<br>弊社が変更手数料を請求することはありません。ただし、以下の点にご留意ください。
              ul.list_01.mt-s
                li 変更内容によってはレンタル料金に変更が生じる可能性があります
                li レンタカー会社より手数料が請求される可能性があります
              paragraph.mt-s 注意：変更の種類によっては、予約を一旦キャンセルし、新たに予約をし直していただく可能性があります。これによりレンタカー会社から手数料が請求される場合は、できるだけ早くお知らせします。
              paragraph.mt-s 料金はレンタル開始前に設定された受取日と返却日にもとづいて算出されます。予定よりも受取が遅れたり、返却が早まった場合でも、利用されていない時間や日数分の差額は返金されませんのでご了承ください。
          heading.mt-xl(:number="3" fontSize="s") 会社の登録内容
          ul.mt-l
            li
              paragraph Rentaltakeout.com、トラベルジグソーは、本社が100 New Bridge Street, London, EC4V 6JAに登録されており、会社番号：05179829. VAT番号：GB855349007となっております。
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator'
import { Span, SpanBold, Paragraph, Heading } from '~/components/atoms/typography'
import BaseDrawer from '~/components/atoms/drawers/BaseDrawer.vue'
import CreditCard from '~/components/atoms/icons/CreditCard.vue'
import CreditCardBrands from '~/components/molecules/creditCard/CreditCardBrands.vue'
// types
import { SearchResultTypes } from '~/types/searchResultTypes'

@Component({
  components: {
    Span,
    SpanBold,
    Paragraph,
    Heading,
    BaseDrawer,
    CreditCard,
    CreditCardBrands
  }
})
export default class RentalTermDrawer extends Vue {
  @Prop() private isOpenRentalTermDrawer!: boolean
  @Prop() private companyName!: string
  @Prop() private rentalTerm!: SearchResultTypes.RentalTerm

  @Emit('closeRentalTermDrawer')
  closeRentalTermDrawer(): void {
    // 親に伝えるだけ
  }

  getActiveInclusive(rentalTerm): object {
    return rentalTerm.Inclusive.filter((current) => current.body !== '' && current.body !== '<br/>')
  }

  getActivePaymentInfo(rentalTerm): object {
    return rentalTerm.PaymentInfo.filter((current) => current.body !== '' && current.body !== '<br/>')
  }

  getActivePersonalTouch(rentalTerm): object {
    return rentalTerm.PersonalTouch.filter((current) => current.body !== '' && current.body !== '<br/>')
  }

  getActiveRentalTerms(rentalTerm): object {
    return rentalTerm.RentalTerms.filter((current) => current.body !== '' && current.body !== '<br/>')
  }
}
</script>
<style lang="sass" scoped>
.rental-term-drawer
  .-contents
    margin-top: 32px
    margin-bottom: 160px
  div
    > ul
      border-left: 1px solid $gray
      padding-left: 16px
      margin-left: 8px
  .list_01
    > li
      list-style: disc inside
      margin-left: 8px
  .list_02
    > li
      list-style: circle inside
      margin-left: 16px
</style>
