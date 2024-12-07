<script lang="ts" setup>
import { useDataStore } from '../../store';
import { X } from 'lucide-vue-next';

const dataStore = useDataStore();
</script>

<template>
    <div v-if="dataStore.error" class="error-background">
        <div class="error-modal">
            <button class="close-button" @click="dataStore.error = ''">
                <X :size=20 color="white" />
            </button>
            <h1>Error</h1>
            <p>{{ dataStore.error }}</p>
            <button class="reload-button" @click="dataStore.loadImage">Try Again</button>
        </div>
    </div>
</template>

<style scoped>
.error-background {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: #20202079;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
}

.error-modal {
    z-index: inherit;
    position: relative;
    background-color: rgb(45, 45, 45);
    border-radius: 10px;
    padding: 1rem;
    opacity: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 300px;
}

.close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
}

h1 {
    font-size: 1.5rem;
    margin: 0;
}

p {
    margin: 5px;
}

.reload-button {
    background-color: #0f0f0f55;
    border: none;
    border-radius: 5px;
    padding: 0.5rem;
    cursor: pointer;
    transition: ease-out;
    transition-duration: 150ms;
    color: white;
}
</style>