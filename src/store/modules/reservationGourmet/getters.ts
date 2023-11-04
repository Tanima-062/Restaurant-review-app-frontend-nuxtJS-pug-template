export default {
  getReservationInfo: (state) => state.ReservationInfo,
  getSessionToken: (state) => state.paymentStatus.sessionToken,
  getPaymentST: (state) => state.paymentStatus,
  getComplete: (state) => state.completeStatus,
  getCardInfo: (state) => state.CardInfo,
  getApplicationTO: (state) => state.applicationTO,
  getMenu: (state) => state.applicationTO.menus,

  getOptions: (state) => state.options,
  getReservationNum: (state) => state.completeStatus.loginForm.reservationNo,
  // reservationStatus全体を取ってくる
  getReserve: (state) => state.reservationStatus,
  // Statusだけ
  getStatus: (state) => state.reservationStatus.status,
  // アンケート答えたかどうか
  getInquiryStatus: (state) => state.inquiryStatus,
  // もらったloginFormをサーバーに返すよう(completeでもらって、reservationで投げる)
  getloginForm: (state) => state.completeStatus.loginForm,
  // レストラン-予約変更APIレスポンス
  getChangeInfo: (state) => state.changeInfo,
  getCource: (state) => state.applicationRS.menus,
  getApplicationRS: (state) => state.applicationRS,
  getDirectPaymentInfo: (state) => state.directPaymentInfo
}
