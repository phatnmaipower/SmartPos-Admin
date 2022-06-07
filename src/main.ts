import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import { router } from "@/router/index";
import { store, key } from "./store";
import axios from "axios";
import VueAxios from "vue-axios";

const app = createApp(App).use(router);
app.use(store, key);
app.use(VueAxios, axios);
app.provide("axios", app.config.globalProperties.axios);
app.mount("#app");
