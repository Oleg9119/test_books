<template>
    <li class="border rounded p-2 flex flex-col justify-between">
        <div class="mb-2">
            <img class="w-full h-full object-cover" :src="`https://covers.openlibrary.org/b/isbn/${checkExistedProperty(bookIsbn) ? bookIsbn[0] : ''}-M.jpg`" alt="Обложка" />
        </div>
        <div>
            <p class="text-lg font-bold italic leading-tight">{{ checkExistedProperty(bookTitle) ? bookTitle : '' }}</p>
            <p class="text-base font-medium leading-tight">
                {{ checkExistedProperty(bookAuthorName) ? bookAuthorName.toString() : '' }}
            </p>
        </div>
    </li>
</template>

<script>
export default {
    props: ['bookIsbn', 'bookTitle', 'bookAuthorName'],
    methods: {
        checkExistedProperty(prop) {
            return typeof prop !== 'undefined' && prop.length > 0;
        },
    },
};
</script>
