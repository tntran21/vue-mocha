import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// Libraries
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "@/assets/main.scss";

const app = createApp(App);
app.use(PrimeVue, { ripple: true });

app.use(ToastService);

app.use(router);
app.mount("#app");
