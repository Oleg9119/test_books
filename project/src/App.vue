<template>
    <div class="container mx-auto border rounded p-6 font-sans">
        <div class="flex flex-col items-start mb-3">
            <button class="mb-3 px-3 h-10 transition bg-indigo-500 hover:bg-indigo-700 rounded text-white" @click="sortBooks">Сортировать</button>
            <div class="flex flex-col sm:flex-row mb-3 items-start">
                <input :value="bookName" @input="setBookName($event)" type="text" name="bookname" id="bookname" class="mb-1 sm:mb-0 sm:mr-1 block px-3 py-2 bg-white border rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" placeholder="Название книги" />
                <button class="px-3 h-10 transition bg-indigo-500 hover:bg-indigo-700 rounded text-white w-sm" @click="refreshBooks">Загрузить</button>
            </div>
            <button class="mb-3 px-3 h-10 transition bg-indigo-500 hover:bg-indigo-700 rounded text-white" @click="showData">Выгрузить в Excel</button>
        </div>
        <table id="booksTable" class="border-separate border-spacing-2 border border-slate-400">
            <thead>
                <tr>
                    <th rowspan="2" class="border border-slate-300">№</th>
                    <th colspan="2" class="border border-slate-300">Автор</th>
                    <th rowspan="2" class="border border-slate-300">Название книги</th>
                    <th rowspan="2" class="border border-slate-300">Год публикации</th>
                </tr>
                <tr>
                    <th class="border border-slate-300">Имя</th>
                    <th class="border border-slate-300">Фамилия</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(book, index) in books" :key="book.key">
                    <td>{{ index + 1 }}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
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

const sortByTitleAsc = (b1, b2) => {
    return b1.title.toLowerCase() > b2.title.toLowerCase() ? 1 : -1;
};

const sortByTitleDesc = (b1, b2) => {
    return b1.title.toLowerCase() > b2.title.toLowerCase() ? -1 : 1;
};

export default {
    data() {
        return {
            books: [],
            sortedAsc: false,
            bookName: '',
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
        sortBooks() {
            if (!this.sortedAsc) {
                this.sortedAsc = true;
                return this.books.sort(sortByTitleAsc);
            } else {
                this.sortedAsc = false;
                return this.books.sort(sortByTitleDesc);
            }
        },
        setBookName(evt) {
            this.bookName = evt.target.value;
        },
        refreshBooks() {
            if (this.bookName !== '')
                axios.get(`https://openlibrary.org/search.json?q=${this.bookName}`).then((response) => {
                    this.books = response.data.docs;
                });
        },
        exportBooks() {
            // const wb = XLSX.utils.table_to_book(document.getElementById('TableToExport'));
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
