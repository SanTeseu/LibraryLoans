import { createApp, reactive } from 'vue';
import App from './App.vue';
import router from './router';
const app = createApp(App);
app.config.globalProperties.$userState = reactive({ token: localStorage.getItem('token') || null });
app.use(router);
app.mount('#app');
