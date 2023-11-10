<script lang="ts" setup>
import { useDataStore } from '../store';

const dataStore = useDataStore();
</script>

<template>
    <p v-if="dataStore.loading">
        Loading...
    </p>
    <img v-if="dataStore.imageData.files !== undefined" :src="dataStore.getThumbnailUrl" />
</template>
