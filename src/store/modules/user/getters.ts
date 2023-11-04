export default {
  // ユーザー前情報
  getUserInfo: (state) => state.UserInfo,
  // フルネーム
  getUserName: (state) => state.UserInfo.firstName + state.UserInfo.lastName,
  // 位置情報
  getLocationInfo: (state) => state.location
}
