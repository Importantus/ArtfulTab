<script setup lang="ts">
import { defineProps } from 'vue';
import { useDataStore } from '../../store';
import { ImageFit } from '~/types';

interface Props {
    imageFitValue: ImageFit;
}

const props = defineProps<Props>();

const dataStore = useDataStore();
</script>

<template>
    <div :class="{ 'selected': props.imageFitValue.id === dataStore.settings.imageFit.id }"
        @click="dataStore.setImageFit(props.imageFitValue)">
        <props.imageFitValue.icon :size="18"
            :color="props.imageFitValue.id === dataStore.settings.imageFit.id ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.3)'" />
    </div>
</template>

<style scoped>
div {
    width: 50px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Divs on hover that dont have the class selected */
div:hover:not(.selected) {
    background-color: rgba(255, 255, 255, 0.05)
}

.selected {
    background-color: rgba(255, 255, 255, 0.1)
}
</style>