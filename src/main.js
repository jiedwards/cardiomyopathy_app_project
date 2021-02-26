import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import VueApexCharts from "vue3-apexcharts";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const VuePapaParse  = require('vue-papa-parse')

let app = createApp(App);
app.use(router);
app.use(VuePapaParse);
app.use(VueApexCharts);
app.use(VueSweetalert2);
app.mount('#app');

