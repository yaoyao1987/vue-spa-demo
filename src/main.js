require('style!css!sass!assets/scss/dw.scss')

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import RouterMap from './routers'
import LazyLoad from 'vue-lazyload'
import FastClick from 'fastclick'

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(LazyLoad, {
	loading: require('assets/loading.svg'),
	try: 3
})

// 实例化VueRouter
let router = new VueRouter({
	hashbang:true,
	history:false,
	saveScrollPosition:true,
	transitionOnLoad:true
});

router.beforeEach(transition => {
    FastClick.attach(document.body);
    transition.next();
});

let app = Vue.extend({});

RouterMap(router);

router.start(app, "#app");
