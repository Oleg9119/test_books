import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';

const axios = require('axios').default;

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
        get(state) {
            axios.get('https://openlibrary.org/search.json?q=mr+fox').then((response) => {
                state.books = response.data.docs;
            });
        },
        refresh(state, bookName) {
            axios.get(`https://openlibrary.org/search.json?q=${bookName}`).then((response) => {
                state.books = response.data.docs;
            });
        },
    },
    getters: {
        booksList(state) {
            return state.books;
        },
    },
    actions: {
        sortBooksList(context) {
            context.commit('sort');
        },
        getBooksList(context) {
            context.commit('get');
        },
        refreshBooksList(context, bookName) {
            context.commit('refresh', bookName);
        },
    },
});

const app = createApp(App);
app.use(store);
app.mount('#app');
