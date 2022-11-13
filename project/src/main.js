import { createApp } from 'vue';
import { createStore } from 'vuex';

import App from './App.vue';

const store = createStore({
    state() {
        return {
            books: [],
            sortedAsc: false,
        };
    },
    mutations: {
        sort(state) {
            if (!state.sortedAsc) {
                state.sortedAsc = true;
                return state.books.sort((b1, b2) => {
                    return b1.title.toLowerCase() > b2.title.toLowerCase() ? 1 : -1;
                });
            } else {
                state.sortedAsc = false;
                return state.books.sort((b1, b2) => {
                    return b1.title.toLowerCase() > b2.title.toLowerCase() ? -1 : 1;
                });
            }
        },
    },
});

const app = createApp(App);
app.use(store);
app.mount('#app');
