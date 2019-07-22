import Vue from "vue";
import App from "./App.vue";
import store from './store';
import router from './router';
import VueI18n from 'vue-i18n';
import 'vuetify/dist/vuetify.min.css';

import Vuetify from 'vuetify';
import colors from 'vuetify/es5/util/colors'
import "vue-swatches/dist/vue-swatches.min.css"

Vue.use(VueI18n)
Vue.use(Vuetify, {
  theme: {
    primary: colors.indigo.darken1,
    secondary: colors.indigo.lighten2,
    accent: colors.indigo.base,
    neutral: colors.grey.base
  }
})

import { messages, locales, i18n as at } from '@/store/localization';
import storage, { storageKey } from './store/modules/storage';


const i18n = new VueI18n({
  locale: storage.get(storageKey.language, locales.eng),
  fallbackLocale: locales.eng,
  messages,
})

const app = {
  i18n,
  store,
  router,
  render: create => create(App)
}

Object.defineProperty(Vue.prototype, '$locale', {
  get: function () {
    return app.i18n.locale
  },
  set: function (locale) {
    app.i18n.locale = locale
  }
})

Vue.config.productionTip = false;
Vue.prototype.$at = at;
new Vue(app).$mount("#app");
