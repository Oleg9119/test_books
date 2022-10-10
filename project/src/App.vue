<template>
    <div class="container mx-auto border rounded p-6 font-sans">
        <div class="flex flex-col items-start border rounded mb-3 p-2">
            <custom-button @click="sortBooks">
                <span>Сортировать</span>
            </custom-button>
            <form class="flex flex-col sm:flex-row items-start" @submit.prevent="refreshBooks">
                <input v-model="bookName" type="text" class="mb-1 sm:mb-0 sm:mr-1 block px-3 py-2 bg-white border rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" placeholder="Название книги" />
                <custom-button>
                    <span>Загрузить</span>
                </custom-button>
            </form>
            <custom-button @click="exportBooks">
                <span>Выгрузить в Excel</span>
            </custom-button>
        </div>
        <ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            <custom-book v-for="book in books" :key="book.key" :book-isbn="book.isbn" :book-title="book.title" :book-author-name="book.author_name"></custom-book>
        </ul>
    </div>
</template>

<script>
import * as XLSX from 'xlsx';

import customButton from './components/CustomButton.vue';

const axios = require('axios').default;

export default {
    data() {
        return {
            books: [],
            bookName: '',
            sortedAsc: false,
            excelData: [],
        };
    },
    name: 'App',
    components: { 'custom-button': customButton },
    mounted() {
        axios.get('https://openlibrary.org/search.json?q=mr+fox').then((response) => {
            this.books = response.data.docs;
        });
    },
    methods: {
        sortByTitleAsc(b1, b2) {
            return b1.title.toLowerCase() > b2.title.toLowerCase() ? 1 : -1;
        },
        sortByTitleDesc(b1, b2) {
            return b1.title.toLowerCase() > b2.title.toLowerCase() ? -1 : 1;
        },
        sortBooks() {
            if (!this.sortedAsc) {
                this.sortedAsc = true;
                return this.books.sort(this.sortByTitleAsc);
            } else {
                this.sortedAsc = false;
                return this.books.sort(this.sortByTitleDesc);
            }
        },
        refreshBooks() {
            if (this.bookName !== '')
                axios.get(`https://openlibrary.org/search.json?q=${this.bookName}`).then((response) => {
                    this.books = response.data.docs;
                });
        },
        exportBooks() {
            const booksData = this.books;

            // Заголовок excel-таблицы
            const firstHeaderRow = [
                {
                    v: '№',
                    t: 's',
                },
                {
                    v: 'Автор',
                    t: 's',
                },
                {
                    v: '',
                    t: 's',
                },
                {
                    v: 'Название книги',
                    t: 's',
                },
                {
                    v: 'Год публикации',
                    t: 's',
                },
            ];

            const secondHeaderRow = [
                {
                    v: '',
                    t: 's',
                },
                {
                    v: 'Имя',
                    t: 's',
                },
                {
                    v: 'Фамилия',
                    t: 's',
                },
                {
                    v: '',
                    t: 's',
                },
                {
                    v: '',
                    t: 's',
                },
            ];

            this.excelData.push(firstHeaderRow);
            this.excelData.push(secondHeaderRow);

            if (booksData.length > 0) {
                const workbook = XLSX.utils.book_new();

                booksData.forEach((book, index) => {
                    let row = [];

                    // Разбивка имен и фамилий
                    let authorFirstName = '';
                    let authorLastName = '';

                    if (typeof book.author_name != 'undefined' && book.author_name.length > 0) {
                        let resFirstNames = [];
                        let resLastNames = [];

                        book.author_name.forEach((fullName) => {
                            let tempArr = fullName.split(' ');
                            resFirstNames.push(typeof tempArr[0] != 'undefined' ? tempArr[0] : '');
                            resLastNames.push(typeof tempArr[1] != 'undefined' ? tempArr[1] : '');
                        });

                        authorFirstName = resFirstNames.join(' ');
                        authorLastName = resLastNames.join(' ');
                    }

                    // Ячейки строки
                    const cellIndex = {
                        v: index + 1,
                        t: 's',
                    };

                    const cellAuthorFirstName = {
                        v: authorFirstName,
                        t: 's',
                    };

                    const cellAuthorLastName = {
                        v: authorLastName,
                        t: 's',
                    };

                    const cellTitle = {
                        v: book.title,
                        t: 's',
                    };

                    const cellYear = {
                        v: book.first_publish_year,
                        t: 's',
                    };

                    row.push(cellIndex);
                    row.push(cellAuthorFirstName);
                    row.push(cellAuthorLastName);
                    row.push(cellTitle);
                    row.push(cellYear);
                    this.excelData.push(row);
                });

                const worksheet = XLSX.utils.aoa_to_sheet(this.excelData);

                // Мердж ячеек
                worksheet['!merges'] = [
                    { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
                    { s: { r: 0, c: 1 }, e: { r: 0, c: 2 } },
                    { s: { r: 0, c: 3 }, e: { r: 1, c: 3 } },
                    { s: { r: 0, c: 4 }, e: { r: 1, c: 4 } },
                ];

                XLSX.utils.book_append_sheet(workbook, worksheet, 'books');
                XLSX.writeFile(workbook, 'books.xlsx');
            }
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
