<script setup lang="ts">
import { ref, watch } from 'vue';
import LanguageItem from './LanguageItem.vue';
import codes from 'iso-language-codes';
import { X } from 'lucide-vue-next';

export interface Country {
    name: string;
    nativeName: string;
    code: string;
}


const allLanguages = codes.map((key) => ({
    name: key.name,
    nativeName: key.nativeName,
    code: key.iso639_1
})).sort((a, b) => a.name.localeCompare(b.name));

const searchString = ref('')
const filteredCountries = ref(allLanguages)

watch(searchString, (newVal) => {
    filteredCountries.value = allLanguages
        .filter((country) =>
            country.name.toLowerCase().includes(newVal.toLowerCase())
        )
})
</script>

<template>
    <div class="background">
        <X class="close-button" :size="24" @click="$emit('close')" color="white" />
        <div class="selector">
            <input type="text" v-model="searchString" placeholder="Search..." autofocus />
            <div class="languages">
                <LanguageItem v-for="country in filteredCountries" :key="country.code" :country="country"
                    @selected="$emit('close')" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.background {
    background-color: #3232326a;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 10px;
    box-sizing: border-box;
    position: fixed;
    backdrop-filter: blur(5px);
    z-index: 100;
}

.close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
}

input {
    min-width: 100%;
    height: 40px;
    border-radius: 5px;
    border: none;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: 500;
    color: white;
    background-color: #908375;
    margin-bottom: 10px;
    outline: none;
}

input::placeholder {
    color: white;
    opacity: 0.5;
}

.selector {
    height: 250px;
    width: 100%;
}

.languages {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 5px;
    width: 100%;
    height: 60vh;
    overflow-y: scroll;
    box-sizing: border-box;
}

.languages::-webkit-scrollbar {
    display: none;
}
</style>