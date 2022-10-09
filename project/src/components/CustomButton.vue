<template>
    <button class="mb-3 px-3 h-10 transition bg-indigo-500 hover:bg-indigo-700 rounded text-white" @click="chooseFunction">{{ buttonText }}</button>
</template>

<script>
export default {
    props: ['buttonText', 'buttonFunction'],
    emits: ['sort-by-title', 'export-books'],
    methods: {
        chooseFunction() {
            if (this.buttonFunction === 'sort') {
                this.$emit('sort-by-title');
            } else if (this.buttonFunction === 'export') {
                this.$emit('export-books');
            }
        },
    },
};
</script>
