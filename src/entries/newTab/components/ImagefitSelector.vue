<script setup lang="ts">
import { imageFit } from '../store';
import ImagefitItem from './ImagefitItem.vue';
</script>

<template>
    <div class="selector">
        <ImagefitItem v-for="value in imageFit" :key="value.id" :imageFitValue="value" />
    </div>
</template>

<style scoped>
.selector {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 50px;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.3);
    cursor: pointer;
    /* blur background */
    backdrop-filter: blur(5px);
}

/* First and last items have padding left/right */
.selector>*:first-child {
    padding-left: 5px;
}

.selector>*:last-child {
    padding-right: 5px;
}
</style>