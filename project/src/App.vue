<template>
    <div class="container mx-auto border rounded p-6 font-sans">
        <div class="flex flex-col items-start mb-3">
            <button class="mb-3 px-3 h-10 transition bg-indigo-500 hover:bg-indigo-700 rounded text-white" @click="showData">Сортировать</button>
            <div class="flex flex-col sm:flex-row mb-3 items-start"><input type="text" name="bookname" id="bookname" class="mb-1 sm:mb-0 sm:mr-1 block px-3 py-2 bg-white border rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" placeholder="Название книги" /><button class="px-3 h-10 transition bg-indigo-500 hover:bg-indigo-700 rounded text-white w-sm">Загрузить</button></div>
            <button class="mb-3 px-3 h-10 transition bg-indigo-500 hover:bg-indigo-700 rounded text-white">Выгрузить в Excel</button>
        </div>
        <ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-3 gap-y-3">
            <li class="border rounded p-2 flex flex-col justify-between" v-for="book in books" :key="book.key">
                <div class="mb-2">
                    <img class="w-full h-full object-cover" :src="`https://covers.openlibrary.org/b/isbn/${typeof book.isbn !== 'undefined' && book.isbn.length > 0 ? book.isbn[0] : ''}-M.jpg`" alt="Обложка" />
                </div>
                <div>
                    <p class="text-lg font-bold italic leading-tight">{{ book.title }}</p>
                    <p class="text-base font-medium leading-tight">{{ typeof book.author_name !== 'undefined' && book.author_name.length > 0 ? book.author_name.toString() : '' }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
const axios = require('axios').default;

export default {
    data() {
        return {
            books: [],
        };
    },
    name: 'App',
    components: {},
    mounted() {
        axios.get('https://openlibrary.org/search.json?q=mr+fox').then((response) => {
            this.books = response.data.docs;
        });
    },
    computed: {
        // bookImage() {
        //   return
        // }
    },
    methods: {
        showData() {
            console.log(this.books);
        },
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
