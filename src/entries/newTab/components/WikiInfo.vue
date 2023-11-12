<script setup lang="ts">
import { WikipediaData } from '~/types';


interface Props {
    wikipediaData: WikipediaData
    big: boolean
}

const props = defineProps<Props>();
</script>

<template>
    <a :href="props.wikipediaData.wikipedia?.url" :class="{ 'big': props.big }">
        {{ props.wikipediaData.label?.value || "Unknown" }}
    </a>
</template>

<style scoped>
a {
    color: inherit;
    text-decoration: none;
    text-align: left;
    transition: ease;
    transition-duration: 150ms;
}

a[href*="://"]:hover {
    color: white;
    text-decoration: underline;
}

.big {
    color: white;
    font-size: 1.5rem;
    font-weight: 400;
}
</style>