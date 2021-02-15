import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import VueApexCharts from "vue3-apexcharts";

const VuePapaParse  = require('vue-papa-parse')

let app = createApp(App);
app.use(router);
app.use(VuePapaParse);
app.use(VueApexCharts);
app.mount('#app');

