<template>
    <button class="mb-3 px-3 h-10 transition bg-indigo-500 hover:bg-indigo-700 rounded text-white">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'custom-button',
};
</script>
