import { createApp } from 'vue';
import App from './App.vue';
import CustomButton from './components/CustomButton.vue';

const app = createApp(App);

app.component('custom-button', CustomButton);
app.mount('#app');
