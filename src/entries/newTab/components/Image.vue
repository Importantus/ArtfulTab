<script lang="ts" setup>
import { imageFit, useDataStore } from '../../store';

const dataStore = useDataStore();
</script>

<template>
    <div v-if="dataStore.imageData.files !== undefined" class="image-container">
        <div class="fill" :style="{ backgroundImage: 'url(' + dataStore.thumbnailUrl + ')' }"
            :class="{ 'blur': dataStore.settings.imageFit.id !== imageFit.fill.id }"></div>
        <img v-if="dataStore.imageData.files !== undefined && dataStore.settings.imageFit.id === imageFit.fit.id"
            :src="dataStore.thumbnailUrl" :class="{'animation': dataStore.settings.animation}"/>
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

.animation {
    animation: moveUp ease-out 1;
  animation-fill-mode: forwards;
  animation-duration: 1s;
}

@keyframes moveUp {
  0% {
    opacity: 0.3;
    transform: translateY(40px);
    scale: 0.95;
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
    scale: 1;
  }
}
</style>
../../../store