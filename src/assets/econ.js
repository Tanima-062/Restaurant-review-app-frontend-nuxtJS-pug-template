/* eslint-disable */
function Pay(sessionToken, requestID) {
  return new Promise((resolve, reject) => {
    const econapps = new eController.EconSconeCardPay(sessionToken, requestID)
    econapps.fetchEntryResources(function (result) {
      if (result.status == 1) {
        //success
        //ApiConnectionの関数を呼び出してEntriesDataを取得する
        const entriesData = econapps.getEntriesData()

        //決済の内容
        const payinfo = entriesData.PayInfo
        resolve(payinfo)
      }
      reject('例外ステータス' + result)
    })
  })
}
function SaveEntry(sessionToken, requestID, cardNo, cardOwner, expDate, cvv2Code, usedCardFlg) {
  return new Promise((resolve, reject) => {
    const econapps = new eController.EconSconeCardPay(sessionToken, requestID)
    const payCnt = '00'
    econapps.saveEntries(cardNo, cardOwner, expDate, payCnt, cvv2Code, usedCardFlg, function (result) {
      console.log(result)
      if (result.status == 1) {
        //success

        //ApiConnectionの関数を呼び出してSaveEntriesを取得する
        var saveData = econapps.getSaveEntries()
        resolve(saveData)
      } else {
        reject(result)
      }
    })
  })
}
function GetInfo(sessionToken, requestID) {
  return new Promise((resolve, reject) => {
    const econapps = new eController.EconSconeCardPay(sessionToken, requestID)
    econapps.getEntries(function (result) {
      if (result.status == 1) {
        //success

        //ApiConnectionの関数を呼び出してSaveEntriesを取得する
        const saveData = econapps.getSaveEntries()
        resolve(saveData)
      }
      reject('カード情報がありません')
    })
  })
}
function GoPayment(sessionToken, requestID) {
  return new Promise((resolve, reject) => {
    //リクエストから取得したセッショントークンとリクエストIDを指定する
    const econapps = new eController.EconSconeCardPay(sessionToken, requestID)
    // リダイレクトされた場合はコールバック関数は実行されない
    econapps.goPayment(function (result) {
      if (result.status !== 1) {
        // failure
        reject('システムエラー。再注文を行ってください。')
      }
    })
  })
}
export default { Pay, SaveEntry, GetInfo, GoPayment }
/* eslint-enable */
