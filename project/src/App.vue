<template>
    <div class="container mx-auto border rounded p-6 font-sans">
        <div class="flex flex-col items-start mb-3">
            <button class="mb-3 px-3 h-10 transition bg-indigo-500 hover:bg-indigo-700 rounded text-white" @click="showData">Сортировать</button>
            <div class="flex mb-3"><input type="text" name="bookname" id="bookname" class="mr-2 block px-3 py-2 bg-white border rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" placeholder="Название книги" /><button class="px-3 h-10 transition bg-indigo-500 hover:bg-indigo-700 rounded text-white">Загрузить</button></div>
            <button class="mb-3 px-3 h-10 transition bg-indigo-500 hover:bg-indigo-700 rounded text-white">Выгрузить в Excel</button>
        </div>
        <ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-3 gap-y-3">
            <!-- <li class="border rounded p-2 flex flex-col justify-between">
                <div class="mb-2">
                    <img class="w-full h-full object-cover" :src="'https://covers.openlibrary.org/b/isbn/' + testIsbn1 + '-M.jpg'" alt="Обложка" />
                </div>
                <div>
                    <p class="text-lg font-bold italic leading-tight">Название</p>
                    <p class="text-base font-medium leading-tight">Авторы</p>
                </div>
            </li>
            <li class="border rounded p-2 flex flex-col justify-between">
                <div class="mb-2">
                    <img class="w-full h-full object-cover" :src="'https://covers.openlibrary.org/b/isbn/' + testIsbn2 + '-M.jpg'" alt="Обложка" />
                </div>
                <div>
                    <p class="text-lg font-bold italic leading-tight">Название</p>
                    <p class="text-base font-medium leading-tight">Авторы</p>
                </div>
            </li>
            <li class="border rounded p-2 flex flex-col justify-between">
                <div class="mb-2">
                    <img class="w-full h-full object-cover" :src="'https://covers.openlibrary.org/b/isbn/' + testIsbn3 + '-M.jpg'" alt="Обложка" />
                </div>
                <div>
                    <p class="text-lg font-bold italic leading-tight">Название</p>
                    <p class="text-base font-medium leading-tight">Авторы</p>
                </div>
            </li>
            <li class="border rounded p-2 flex flex-col justify-between">
                <div class="mb-2">
                    <img class="w-full h-full object-cover" :src="'https://covers.openlibrary.org/b/isbn/' + testIsbn4 + '-M.jpg'" alt="Обложка" />
                </div>
                <div>
                    <p class="text-lg font-bold italic leading-tight">Название</p>
                    <p class="text-base font-medium leading-tight">Авторы</p>
                </div>
            </li>
            <li class="border rounded p-2 flex flex-col justify-between">
                <div class="mb-2">
                    <img class="w-full h-full object-cover" :src="'https://covers.openlibrary.org/b/isbn/' + testIsbn5 + '-M.jpg'" alt="Обложка" />
                </div>
                <div>
                    <p class="text-lg font-bold italic leading-tight">Название</p>
                    <p class="text-base font-medium leading-tight">Авторы</p>
                </div>
            </li>
            <li class="border rounded p-2 flex flex-col justify-between">
                <div class="mb-2">
                    <img class="w-full h-full object-cover" :src="'https://covers.openlibrary.org/b/isbn/' + testIsbn6 + '-M.jpg'" alt="Обложка" />
                </div>
                <div>
                    <p class="text-lg font-bold italic leading-tight">Название</p>
                    <p class="text-base font-medium leading-tight">Авторы</p>
                </div>
            </li> -->
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
    // data() {
    //     return {
    //         testIsbn1: '9780375822070',
    //         testIsbn2: '9780413154408',
    //         testIsbn3: '9780142414545',
    //         testIsbn4: '9781847515889',
    //         testIsbn5: '0517606054',
    //         testIsbn6: '9788375063646',
    //     };
    // },
    data() {
        return {
            books: [],
            testBook: ['9780375822070', '3499214113', '0140382518', '2070323307', '0142414557', '1417786159', '0141377143'],
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
            console.log(this.testBook[0]);
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
