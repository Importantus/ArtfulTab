<script setup lang="ts">
import { useDataStore } from '../../store';
import { Sun } from 'lucide-vue-next';

const dataStore = useDataStore();
console.log(dataStore.settings.brightness);
</script>

<template>
    <div class="slidecontainer">
        <div class="fill" :style="{ width: dataStore.settings.brightness + '%' }"></div>
        <Sun :size="18" color="rgba(255, 255, 255, 0.6)" class="icon" />
        <input type="range" min="1" max="100" v-model="dataStore.settings.brightness" class="slider" id="myRange">
    </div>
</template>

<style scoped>
.slidecontainer {
    width: 100px;
    height: 40px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    border-radius: 50px;
    background: rgba(0, 0, 0, 0.3);
}

.icon {
    position: absolute;
    margin: auto;
    z-index: 2;
    pointer-events: none;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}

.fill {
    position: absolute;
    background-size: cover;
    height: 110%;
    background-position: center;
    z-index: 0;
    background-color: rgba(255, 255, 255, 0.1);
    pointer-events: none;
}

/* The slider itself */
.slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 100%;
    outline: none;
    background: transparent;
    z-index: 1;
    position: relative;
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
.slider::-webkit-slider-thumb {
    width: 10px;
    height: 100%;
    background: transparent;
    outline: none;
    border: none;
    visibility: hidden;
    opacity: 0;
}

.slider::-moz-range-thumb {
    width: 10px;
    height: 100%;
    background: transparent;
    outline: none;
    border: none;
}
</style>