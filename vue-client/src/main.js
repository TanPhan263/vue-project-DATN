import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import axios from 'axios'
import babelPolyfill from 'babel-polyfill'
import * as VueGoogleMaps from "vue2-google-maps";
import { BFormRating } from 'bootstrap-vue'
import CommentGrid from 'vue-comment-grid'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import firebase from 'firebase'
import VueSmoothScroll from 'vue2-smooth-scroll'
Vue.use(VueSmoothScroll)

firebase.initializeApp({
  apiKey: "AIzaSyDNRD7rcNybO5pVkC8POMiMhYYwmfreUVQ",
  authDomain: "tlcn-1a9cf.firebaseapp.com",
  databaseURL: "https://tlcn-1a9cf.firebaseio.com",
  projectId: "tlcn-1a9cf",
  storageBucket: "tlcn-1a9cf.appspot.com",
  messagingSenderId: "295500543953",
  appId: "1:295500543953:web:b85c401589d343127152f0",
  measurementId: "G-RC7XRDEM86"
})

library.add(faUserSecret)

Vue.use(CommentGrid)

Vue.component('b-form-rating', BFormRating)
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBWpwCzPne3JzfEIxHqDb1I2uZp_0dfkas",
    libraries: "places" // necessary for places input
  }
});

Vue.use(babelPolyfill)
axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;
Vue.prototype.$http = axios
Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)
Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.config.performance = true

new Vue({
  el: '#app',
  router,
  store,
  icons,
  axios,
  template: '<App/>',
  components: {
    App
  }
})
