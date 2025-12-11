import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

// Importa CSS global
import "./assets/style.css";

// Cria app
const app = createApp(App);

// Instala Pinia e Router
app.use(createPinia());
app.use(router);

// Monta
app.mount("#app");
