export default function ({ $axios, redirect }) {
  // $axios.setToken('access_token')

  // $axios.onResponse(() => {
  //   $axios.setHeader(
  //     'Access-Control-Allow-Origin',
  //     '*' /** 許可するドメイン http://exsample.com あるいは通すだけなら '*' **/
  //   )
  // })
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
