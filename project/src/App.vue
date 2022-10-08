<template>
  <div class="container mx-auto border rounded p-6 font-sans">
    <div class="flex flex-col items-start mb-3">
      <button
        class="mb-3 px-3 h-10 transition bg-indigo-500 hover:bg-indigo-700 rounded text-white"
        @click="sortBooks"
      >
        Сортировать
      </button>
      <div class="flex flex-col sm:flex-row mb-3 items-start">
        <input
          :value="bookName"
          @input="setBookName($event)"
          type="text"
          name="bookname"
          id="bookname"
          class="mb-1 sm:mb-0 sm:mr-1 block px-3 py-2 bg-white border rounded-md text-sm shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          placeholder="Название книги"
        />
        <button
          class="px-3 h-10 transition bg-indigo-500 hover:bg-indigo-700 rounded text-white w-sm"
          @click="refreshBooks"
        >
          Загрузить
        </button>
      </div>
      <button
        class="mb-3 px-3 h-10 transition bg-indigo-500 hover:bg-indigo-700 rounded text-white"
        @click="exportData"
      >
        Выгрузить в Excel
      </button>
    </div>
    <ul
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-3 gap-y-3"
    >
      <li
        class="border rounded p-2 flex flex-col justify-between"
        v-for="book in books"
        :key="book.key"
      >
        <div class="mb-2">
          <img
            class="w-full h-full object-cover"
            :src="`https://covers.openlibrary.org/b/isbn/${
              typeof book.isbn !== 'undefined' && book.isbn.length > 0
                ? book.isbn[0]
                : ''
            }-M.jpg`"
            alt="Обложка"
          />
        </div>
        <div>
          <p class="text-lg font-bold italic leading-tight">{{ book.title }}</p>
          <p class="text-base font-medium leading-tight">
            {{
              typeof book.author_name !== "undefined" &&
              book.author_name.length > 0
                ? book.author_name.toString()
                : ""
            }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

import * as XLSX from "xlsx";

const axios = require("axios").default;

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
      bookName: "",
      excelData: [],
    };
  },
  name: "App",
  components: {},
  mounted() {
    axios
      .get("https://openlibrary.org/search.json?q=mr+fox")
      .then((response) => {
        this.books = response.data.docs;
      });
  },
  methods: {
    exportData() {
      const booksData = this.books;
      console.log("booksData", booksData);

      if (booksData.length > 0) {
        // STEP 1: Create a new workbook
        const workbook = XLSX.utils.book_new();
        console.log("workbook", workbook);

        booksData.forEach((book, index) => {
          let row = [];
          let authorFirstName = "";
          let authorLastName = "";

          if (
            typeof book.author_name != "undefined" &&
            book.author_name.length > 0
          ) {
            let resFirstNames = [];
            let resLastNames = [];

            book.author_name.forEach((fullName) => {
              let tempArr = fullName.split(" ");
              resFirstNames.push(
                typeof tempArr[0] != "undefined" ? tempArr[0] : ""
              );
              resLastNames.push(
                typeof tempArr[1] != "undefined" ? tempArr[1] : ""
              );
            });

            authorFirstName = resFirstNames.join(" ");
            authorLastName = resLastNames.join(" ");
          }

          // const cellIndex = {
          //   bookIndex: index + 1,
          // };

          // const cellAuthorFirstName = {
          //   bookAuthorFirstName: authorFirstName,
          // };

          // const cellAuthorLastName = {
          //   bookAuthorLastName: authorLastName,
          // };
          // const cellTitle = {
          //   bookTitle: book.title,
          // };

          // const cellYear = {
          //   bookYear: book.first_publish_year,
          // };

          const cellIndex = {
            v: index + 1,
            t: "s",
            s: {
              fill: {
                patternType: "solid",
                fgColor: "2172d7",
                bgColor: "2172d7",
              },
            },
          };

          const cellAuthorFirstName = {
            v: authorFirstName,
            t: "s",
            s: {
              font: { bold: true },
            },
          };

          const cellAuthorLastName = {
            v: authorLastName,
            t: "s",
          };

          const cellTitle = {
            v: book.title,
            t: "s",
          };

          const cellYear = {
            v: book.first_publish_year,
            t: "s",
          };

          row.push(cellIndex);
          row.push(cellAuthorFirstName);
          row.push(cellAuthorLastName);
          row.push(cellTitle);
          row.push(cellYear);
          this.excelData.push(row);
        });

        console.log("data", this.excelData);
        console.log("data", this.excelData[0]);
        console.log(typeof this.excelData);

        // STEP 2: Create data rows and styles
        // let row = [
        //   {
        //     v: "Courier: 24",
        //     t: "s",
        //     s: { font: { name: "Courier", sz: 24 } },
        //   },
        //   {
        //     v: "bold & color",
        //     t: "s",
        //     s: { font: { bold: true, color: { rgb: "FF0000" } } },
        //   },
        //   {
        //     v: "fill: color",
        //     t: "s",
        //     s: { fill: { fgColor: { rgb: "E9E9E9" } } },
        //   },
        //   { v: "line\nbreak", t: "s", s: { alignment: { wrapText: true } } },
        // ];

        // STEP 3: Create worksheet with rows; Add worksheet to workbook
        const worksheet = XLSX.utils.aoa_to_sheet(this.excelData); // принимает массив массивов значений JS и возвращает worksheet, похожий на входные данные.
        console.log("worksheet1", worksheet);

        XLSX.utils.book_append_sheet(workbook, worksheet, "books"); // добавляет worksheet в workbook

        console.log("workbook2", workbook);
        console.log("worksheet2", worksheet);

        // STEP 4: Write Excel file to browser
        XLSX.writeFile(workbook, "books.xlsx");
      }
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
      if (this.bookName !== "")
        axios
          .get(`https://openlibrary.org/search.json?q=${this.bookName}`)
          .then((response) => {
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
