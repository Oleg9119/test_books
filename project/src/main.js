import { createApp } from 'vue';

import App from './App.vue';
import CustomButton from './components/CustomButton.vue';
import CustomBook from './components/CustomBook.vue';

const app = createApp(App);

app.component('custom-button', CustomButton);
app.component('custom-book', CustomBook);
app.mount('#app');
