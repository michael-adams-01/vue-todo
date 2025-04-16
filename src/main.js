console.log('J.M.J');
console.log("Crux sancta sit mihi lux Non draco sit mihi dux Vade retro satana Numquam suade mihi vana Sunt mala quae libas Ipse venena bibas ");
console.log('Sancte Ioseph, operarius, ora pro nobis');

import './assets/main.css'
import BaseCard from './components/ui/BaseCard.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';
import BaseModal from './components/ui/BaseModal.vue';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('BaseCard', BaseCard);
app.component('BaseSpinner', BaseSpinner);
app.component('BaseModal', BaseModal);

app.mount('#app')
