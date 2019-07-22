import Vuex from 'vuex';
import Vue from 'vue';

import clipboard from './modules/clipboard';
import settings from './modules/settings';
import secret from './modules/secret';
import service from './modules/service';
import theme from './modules/theme';
import login from './modules/login';
import notify from './modules/notify';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        settings,
        theme,

        clipboard,
        secret,
        service,
        notify,
        login
    }
})