<script lang="ts" setup>
import { imageFit, useDataStore } from '../store';

const dataStore = useDataStore();
</script>

<template>
    <div v-if="dataStore.imageData.files !== undefined" class="image-container">
        <div class="fill" :style="{ backgroundImage: 'url(' + dataStore.thumbnailUrl + ')' }"
            :class="{ 'blur': dataStore.settings.imageFit.id !== imageFit.fill.id }"></div>
        <img v-if="dataStore.imageData.files !== undefined && dataStore.settings.imageFit.id === imageFit.fit.id"
            :src="dataStore.thumbnailUrl" />
    </div>
</template>

<style scoped>
.image-container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
}

.fill {
    position: absolute;
    width: 110%;
    margin-top: -20px;
    margin-left: -20px;
    background-size: cover;
    height: 110%;
    background-position: center;
    z-index: 0;
}

.blur {
    filter: blur(100px);
}

img {
    z-index: 1;
    border-radius: 2px;
    max-height: 90%;
    max-width: 100%;
}
</style>
