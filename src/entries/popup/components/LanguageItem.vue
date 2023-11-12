<script setup lang="ts">
import { Country } from './LanguageSelector.vue';
import { useDataStore } from '../../store';

interface Props {
    country: Country;
}

const props = defineProps<Props>();

const dataStore = useDataStore();
</script>

<template>
    <div class="country" @click="() => {
        dataStore.setLanguage(props.country.code)
        $emit('selected')
    }">
        <!-- <img :src="require(`~/assets/flags/${props.country.code}.svg`)" /> -->
        <p>{{ props.country.name }}</p>
    </div>
</template>

<style scoped>
p {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
    color: white;
}
.country {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
    padding: 10px;
    min-width: 100%;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 3px;
    transition: background-color 0.2s ease-in-out;
    background-color: #72695e;
}

.country:hover {
    background-color: #B0A190;
}
</style>