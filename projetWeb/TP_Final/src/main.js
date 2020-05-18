import Vue from 'vue'
import App from './App';

Vue.config.productionTip = false

// nmp install bootstrap-vue
import BoostrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BoostrapVue)

const appli = new Vue({
  render: h => h(App)
}) ;
appli.$mount('#app')
