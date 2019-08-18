import Vue from 'vue'
import App from './App'
import store from './store/store.js'
import VueLazyload  from 'vue-lazyload'
import 'common/stylus/index.styl'
Vue.prototype.$store = store
Vue.config.productionTip = false
// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: './static/loading.gif',
  attempt: 1
})
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
