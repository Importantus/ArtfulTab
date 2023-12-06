<script setup lang="ts">
import { computed } from 'vue';
import { imageSelectionMode, useDataStore } from '~/entries/store';

const dataStore = useDataStore();

const options = computed(() => Object.keys(imageSelectionMode).map(key => imageSelectionMode[key]));
</script>

<template>
    <select class="selection" v-model="dataStore.settings.imageSelection">
        <option v-for="option in options" :key="option.id" :value="option.id">{{ option.name }}</option>
    </select>
</template>

<style scoped>
.selection {
    background-color: #B0A190;
    border-radius: 5px;
    padding: 5px 10px;
    color: white;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    outline: none;
}
</style>