import Vue from 'vue';
import VueRouter from 'vue-router';

import AppScreen from '@/screens/appScreen';
import EditLoginPage from '@/screens/main/page/editLoginPage';
import EditServicePage from '@/screens/main/page/editServicePage';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/index.html'
        },
        {
            path: '/index.html',
            name: 'appScreen',
            component: AppScreen
        },
        {
            path: '/edit/login',
            name: 'editLoginPage',
            component: EditLoginPage
        },
        {
            path: '/edit/service',
            name: 'editServicePage',
            component: EditServicePage
        }
    ]
})