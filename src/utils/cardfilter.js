const validCardNum = {
  message: 'カード番号が正しくありません。',
  validate(value) {
    if (value != null) {
      if (
        !value.match(/^4\d{12}(\d{3})?$/) && // visa
        !value.match(/^5[1-5]\d{14}$/) && // mc
        !value.match(/^(3\d{4}|2100|1800)\d{11}$/) && // jcb
        !value.match(/^3[4|7]\d{13}$/) && // amex
        !value.match(/^(?:3(0[0-5]|[68]\d)\d{11})|(?:5[1-5]\d{14})$/)
      ) {
        // diners
        return false
      }
      return true
    } else {
      return false
    }
  }
}

const validUpperName = {
  message: 'ローマ字(大文字)かスペースのみ入力してください。',
  validate(value) {
    if (value != null) {
      if (!value.match(/^[A-Z| ]+$/)) {
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  }
}

export default { validCardNum, validUpperName }
