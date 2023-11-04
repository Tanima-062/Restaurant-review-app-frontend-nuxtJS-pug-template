export default {
  getClientInfo: (state) => state.ClientInfo,
  getClientToken: (state) => state.ClientLoginInfo.rememberToken,
  getClientLoginInfo: (state) => state.ClientLoginInfo,
  getListTodayData: (state) => state.ClientTodayList,
  getListTomorrowData: (state) => state.ClientTomorrowList,
  getClientLogoutStatus: (state) => state.ClientLogoutStatus
}
