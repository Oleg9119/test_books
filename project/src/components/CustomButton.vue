<template>
    <button class="mb-3 px-3 h-10 transition bg-indigo-500 hover:bg-indigo-700 rounded text-white" @click="sortBooks" type="button"></button>
</template>

<script>
const sortByTitleAsc = (b1, b2) => {
    return b1.title.toLowerCase() > b2.title.toLowerCase() ? 1 : -1;
};

const sortByTitleDesc = (b1, b2) => {
    return b1.title.toLowerCase() > b2.title.toLowerCase() ? -1 : 1;
};

export default {
    props: ['buttonText'],
    data() {
        return {
            sortedAsc: false,
        };
    },
    name: 'HelloWorld',
    methods: {
        sortBooks() {
            if (!this.sortedAsc) {
                this.sortedAsc = true;
                return this.books.sort(sortByTitleAsc);
            } else {
                this.sortedAsc = false;
                return this.books.sort(sortByTitleDesc);
            }
        },
    },
};
</script>
