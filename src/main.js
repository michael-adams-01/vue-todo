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
