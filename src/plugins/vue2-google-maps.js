import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
// ホテルのapikey
const APIKEY = 'AIzaSyAyY8FXs9TbzZQ1NwBmG--DTHdo5NzNpzw'
Vue.use(VueGoogleMaps, {
  load: {
    key: APIKEY,
    libraries: 'places'
  }
})
