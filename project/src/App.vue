<template>
  <div class="container mx-auto px-15">
    <ul class="border rounded grid grid-cols-3 auto-rows-fr">
      <li>
        <div>
          <img
            class="w-full h-full object-cover"
            :src="
              'https://covers.openlibrary.org/b/isbn/' + testIsbn + '-M.jpg'
            "
            alt="Обложка"
          />
        </div>
        <div>
          <p>Название</p>
          <p>Авторы</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
const axios = require("axios").default;
console.log("axios", axios);

export default {
  data() {
    return { testIsbn: "9780375822070" };
  },
  name: "App",
  components: {},
  mounted() {
    axios.get("https://openlibrary.org/search.json?q=mr+fox");
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
