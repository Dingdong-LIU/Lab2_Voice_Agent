import Vue from 'vue';
// import VueSocketIO from "vue-socket.io";
import VueSocketIO from 'vue-socket.io-extended';
import { io } from 'socket.io-client';
import $ from 'jquery';
import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import store from './store';
import router from './router';
import App from './App.vue';
import MessageHandlerMixin from './mixins/MessageHandlerMixin';

Vue.mixin(MessageHandlerMixin);
global.$ = $;

/* FontAwesome */
fontawesome.library.add(solid);
Vue.component('font-awesome-icon', FontAwesomeIcon);

// Vue.use(
// 	new VueSocketIOExt({
// 		debug: true,
// 		connection: 'http://localhost:5005',
// 		vuex: {
// 			store,
// 			actionPrefix: 'SOCKET_',
// 			mutationPrefix: 'SOCKET_'
// 		}
// 		// transports: ['websocket', 'polling', 'flashsocket']
// 	}),
// );
const socket = io(
	'/',
	{
		reconnection: true,
		reconnectionDelay: 500,
		maxReconnectionAttempts: Infinity
	}
);

Vue.use(
	VueSocketIO,
	socket,
	{
		store,
		actionPrefix: "SOCKET_",
		eventToActionTransformer: (actionName) => actionName,
		mutationPrefix: 'SOCKET_',
	}
);

/* App Mount */
Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
