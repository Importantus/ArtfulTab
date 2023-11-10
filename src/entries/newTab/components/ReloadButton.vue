<script setup lang="ts">
import { useDataStore } from "../store";
import { RotateCw } from "lucide-vue-next";

const dataStore = useDataStore();
</script>

<template>
    <button @click="dataStore.loadImage">
        <RotateCw :size=20 color="white" />
    </button>
</template>

<style scoped>
button {
    border-radius: 100%;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: ease-out;
    transition-duration: 150ms;
    background-color: #0f0f0f55;
    border: none;
    /* dont shrink */
    flex-shrink: 0;
}

button:hover {
    background-color: #05050577;
    transition: ease-out;
}
</style>