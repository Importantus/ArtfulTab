<script lang="ts" setup>
import { useDataStore } from "../../store";
import { Loader2 } from "lucide-vue-next"

const dataStore = useDataStore();
</script>

<template>
    <div v-if="dataStore.loading" class="loading-background">
        <Loader2 :size=50 color="white" class="loader" />
    </div>
</template>

<style scoped>
.loading-background {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: #202020;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 50%;
}

.loader {
    animation: spin 2s linear infinite;
}

@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}
</style>