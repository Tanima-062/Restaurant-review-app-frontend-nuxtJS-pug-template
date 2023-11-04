import { HotelsInfo, RecommendHotelRestaurantMetaInfo } from '@/types/hotelRestaurantTypes'

// 本番用
export const hotelsInfoList: HotelsInfo[] = [
  {
    prefectureCode: 'tokyo',
    prefectureName: '東京',
    hotels: [
      {
        id: 11755,
        name: 'ヒルトン東京お台場',
        storeInfo: {
          id: 1834,
          name: 'シースケープ テラス・ダイニング'
        }
      },
      {
        id: 10028,
        name: 'グランドニッコー東京 台場',
        storeInfo: {
          id: 1844,
          name: 'GARDEN DINING'
        }
      },
      {
        id: 17166,
        name: '三井ガーデンホテル銀座プレミア',
        storeInfo: {
          id: 1871,
          name: "RISTORANTE E'VOLTA il cielo"
        }
      },
      {
        id: 8803,
        name: '銀座クレストン',
        storeInfo: {
          id: 1533,
          name: 'ラウンジ プラシャンティ'
        }
      },
      {
        id: 10928,
        name: 'ホテルサンルートプラザ新宿',
        storeInfo: {
          id: 1847,
          name: 'VILLAZZA'
        }
      },
      {
        id: 10028,
        name: 'グランドニッコー東京 台場',
        storeInfo: {
          id: 1864,
          name: 'The Grill on 30th'
        }
      },
      {
        id: 11475,
        name: 'the b 池袋',
        storeInfo: {
          id: 1855,
          name: 'SALVATORE CUOMO & BAR 池袋'
        }
      },
      {
        id: 10028,
        name: 'グランドニッコー東京 台場',
        storeInfo: {
          id: 1866,
          name: '中国料理 桃李'
        }
      },
      {
        id: 10028,
        name: 'グランドニッコー東京 台場',
        storeInfo: {
          id: 1867,
          name: 'The Lobby Cafe'
        }
      },
      {
        id: 12857,
        name: 'ザ ロイヤルパークホテル アイコニック 東京汐留店',
        storeInfo: {
          id: 1892,
          name: 'CHAYA Macrobi shiodome'
        }
      }
    ]
  },
  {
    prefectureCode: 'chiba',
    prefectureName: '千葉',
    hotels: [
      {
        id: 17164,
        name: '東京ベイ舞浜ホテル',
        storeInfo: {
          id: 1843,
          name: 'レストラン ファインテラス'
        }
      },
      {
        id: 10720,
        name: 'ホテル日航成田',
        storeInfo: {
          id: 1845,
          name: 'カジュアル・リゾート・ダイニング セリーナ'
        }
      }
    ]
  },
  {
    prefectureCode: 'kanagawa',
    prefectureName: '神奈川',
    hotels: [
      {
        id: 14976,
        name: '横浜桜木町ワシントンホテル',
        storeInfo: {
          id: 1839,
          name: 'ダイニング & バー ベイサイド'
        }
      }
    ]
  },
  {
    prefectureCode: 'osaka',
    prefectureName: '大阪',
    hotels: [
      {
        id: 1036596,
        name: 'コートヤード・バイ・マリオット大阪本町',
        storeInfo: {
          id: 1862,
          name: 'レストラン STITCH'
        }
      },
      {
        id: 12561,
        name: 'クインテッサホテル大阪ベイ',
        storeInfo: {
          id: 1291,
          name: 'ワイン＆ダイニング エマブル'
        }
      },
      {
        id: 10387,
        name: 'クインテッサホテル大阪心斎橋 Comic & Books',
        storeInfo: {
          id: 1014,
          name: 'plaussio'
        }
      },
      {
        id: 16166,
        name: 'ホテル京阪 京橋 グランデ',
        storeInfo: {
          id: 1860,
          name: 'レストランロレーヌ'
        }
      }
    ]
  },
  {
    prefectureCode: 'kyouto',
    prefectureName: '京都',
    hotels: [
      {
        id: 1353543,
        name: 'HIYORIチャプター京都 トリビュートポートフォリオホテル',
        storeInfo: {
          id: 1863,
          name: 'CHAPTER THE GRILL'
        }
      },
      {
        id: null, // 未契約のホテル（スカチケに登録されてないホテルである）
        name: 'The Hotel Seiryu Kyoto Kiyomizu',
        storeInfo: {
          id: 1858,
          name: 'Benoit Kyoto（ブノワ 京都）'
        }
      },
      {
        id: 411098,
        name: 'ホテル山楽',
        storeInfo: {
          id: 1884,
          name: 'fine dinin山科'
        }
      }
    ]
  },
  {
    prefectureCode: 'hyogo',
    prefectureName: '兵庫',
    hotels: [
      {
        id: 9246,
        name: 'ホテルプラザ神戸',
        storeInfo: {
          id: 1887,
          name: 'スマイリーネプチューン'
        }
      },
      {
        id: 9246,
        name: 'ホテルプラザ神戸',
        storeInfo: {
          id: 1889,
          name: 'KARIN'
        }
      }
    ]
  },
  {
    prefectureCode: 'hukuoka',
    prefectureName: '福岡',
    hotels: [
      {
        id: 9345,
        name: 'アートホテル小倉ニュータガワ',
        storeInfo: {
          id: 1869,
          name: 'All Day Dining shizuku'
        }
      },
      {
        id: 12040,
        name: '博多グリーンホテル1号館',
        storeInfo: {
          id: 1856,
          name: 'Salvatore Cuomo 市場 博多'
        }
      }
    ]
  },
  {
    prefectureCode: 'okinawa',
    prefectureName: '沖縄',
    hotels: [
      {
        id: 11609,
        name: 'オリエンタルホテル 沖縄リゾート＆スパ',
        storeInfo: {
          id: 1875,
          name: 'QWACHI'
        }
      },
      {
        id: 8765,
        name: 'JR九州ホテル ブラッサム那覇',
        storeInfo: {
          id: 1853,
          name: '37 Steakhouse & Bar 那覇'
        }
      },
      {
        id: 17760,
        name: 'パシフィックホテル沖縄',
        storeInfo: {
          id: 1882,
          name: 'ガーデンレストラン竜潭'
        }
      },
      {
        id: 18160,
        name: 'ムーンオーシャン宜野湾 ホテル＆レジデンス',
        storeInfo: {
          id: 1879,
          name: 'ALL DAY DINING 「OCEAN GRILL」'
        }
      },
      {
        id: 1058794,
        name: 'Hotel Cocktail Stay Naha',
        storeInfo: {
          id: 1883,
          name: 'THE CARINO OKINAWA'
        }
      }
    ]
  }
]
// 本番用 FIXME: まだ決まってなさそうなので
export const recommendHotelRestaurantMetaInfoList: RecommendHotelRestaurantMetaInfo[] = [
  {
    prefectureName: '神戸',
    hotelId: 9246,
    hotelName: 'ホテルプラザ神戸',
    storeId: 1888,
    storeName: '鉄板焼 潮路'
  },
  {
    prefectureName: '東京',
    hotelId: 10928,
    hotelName: 'ホテルサンルートプラザ新宿',
    storeId: 1868,
    storeName: '九献'
  },
  {
    prefectureName: '東京',
    hotelId: null,
    hotelName: 'ニューオータニイン 東京',
    storeId: 1836,
    storeName: 'レストラン舟茶屋'
  },
  {
    prefectureName: '大阪',
    hotelId: 15242,
    hotelName: 'アートホテル大阪ベイタワー',
    storeId: 1270,
    storeName: '鉄板焼 RURI'
  },
  {
    prefectureName: '大阪',
    hotelId: 15242,
    hotelName: 'アートホテル大阪ベイタワー',
    storeId: 1886,
    storeName: '割烹 みなと'
  },
  {
    prefectureName: '神奈川',
    hotelId: 1017747,
    hotelName: 'slash cafe&bar川崎',
    storeId: 1881,
    storeName: 'スラッシュカフェアンドバー川崎'
  },
  {
    prefectureName: '福岡',
    hotelId: 9345,
    hotelName: 'アートホテル小倉ニュータガワ',
    storeId: 1870,
    storeName: '鉄板焼き 桜'
  },
  {
    prefectureName: '福岡',
    hotelId: 17138,
    hotelName: 'マースガーデンホテル博多',
    storeId: 1890,
    storeName: '海鮮処松月亭博多本店'
  },
  {
    prefectureName: '沖縄',
    hotelId: 11609,
    hotelName: 'オリエンタルホテル 沖縄リゾート＆スパ',
    storeId: 1877,
    storeName: 'うちなーだいにんぐ じなんぼう'
  },
  {
    prefectureName: '北海道',
    hotelId: null,
    hotelName: 'UNWIND HOTEL&BAR 小樽（アンワインドホテルアンドバー小樽）',
    storeId: 1880,
    storeName: 'ザ・ボール小樽（The Ball）'
  },
  {
    prefectureName: '沖縄',
    hotelId: 11609,
    hotelName: 'オリエンタルホテル 沖縄リゾート＆スパ',
    storeId: 1874,
    storeName: '琉仙'
  }
]

// 開発用
export const devRecommendHotelRestaurantMetaInfoList: RecommendHotelRestaurantMetaInfo[] = [
  {
    prefectureName: '東京',
    hotelId: 17166,
    hotelName: '三井ガーデンホテル銀座プレミア',
    storeId: 961,
    storeName: 'RISTORANTE E’volta il cielo'
  },
  {
    prefectureName: '東京',
    hotelId: 13323,
    hotelName: '新宿ワシントンホテル 本館',
    storeId: 962,
    storeName: 'グリル＆ダイニング マンハッタンテーブル'
  },
  {
    prefectureName: '東京',
    hotelId: 11755,
    hotelName: 'ヒルトン東京お台場',
    storeId: 963,
    storeName: '日本料理「さくら」'
  },
  {
    prefectureName: '大阪',
    hotelId: 17315,
    hotelName: 'モクシー大阪本町 By Marriott',
    storeId: 965,
    storeName: 'モクシーカフェ＆バー '
  },
  {
    prefectureName: '千葉',
    hotelId: 14948,
    hotelName: 'ダイワロイネットホテル千葉',
    storeId: 964,
    storeName: 'SALVATORE CUOMO & BAR 千葉　'
  }
]
// 開発用
export const devHotelsInfoList: HotelsInfo[] = [
  {
    prefectureCode: 'tokyo',
    prefectureName: '東京',
    hotels: [
      {
        id: 11755,
        name: 'ヒルトン東京お台場',
        storeInfo: {
          id: 961,
          name: 'シースケープ テラス・ダイニング'
        }
      },
      {
        id: 10028,
        name: 'アロフト東京銀座',
        storeInfo: {
          id: 963,
          name: 'The WAREHOUSE'
        }
      },
      {
        id: 11912,
        name: '相鉄フレッサイン東京蒲田',
        storeInfo: {
          id: 962,
          name: 'SALVATORE CUOMO & BAR 蒲田'
        }
      }
    ]
  },
  {
    prefectureCode: 'chiba',
    prefectureName: '千葉',
    hotels: [
      {
        id: 17164,
        name: '東京ベイ舞浜ホテル',
        storeInfo: {
          id: 964,
          name: 'レストラン ファインテラス'
        }
      }
    ]
  },
  {
    prefectureCode: 'osaka',
    prefectureName: '大阪',
    hotels: [
      {
        id: 17315,
        name: 'モクシー大阪本町 By Marriott',
        storeInfo: {
          id: 965,
          name: 'モクシーカフェ＆バー '
        }
      }
    ]
  },
  {
    prefectureCode: 'kyouto',
    prefectureName: '京都',
    hotels: [
      {
        id: 411098,
        name: '株式会社PHG京都山科マネジメント',
        storeInfo: {
          id: 102339,
          name: 'fine dinin山科'
        }
      }
    ]
  },
  {
    prefectureCode: 'hyogo',
    prefectureName: '兵庫',
    hotels: [
      {
        id: 411098,
        name: '株式会社PHG京都山科マネジメント',
        storeInfo: {
          id: 102339,
          name: 'fine dinin山科'
        }
      }
    ]
  }
]
