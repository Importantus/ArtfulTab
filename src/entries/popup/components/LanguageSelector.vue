<script setup lang="ts">
import countries from 'i18n-iso-countries';
import { ref, watch } from 'vue';
import LanguageItem from './LanguageItem.vue';
import data from 'i18n-iso-countries/langs/en.json';
import { X } from 'lucide-vue-next';

countries.registerLocale(data);

const numberOfCountries = 5;

const allCountries = countries.getNames("en", { select: "official" });

export interface Country {
    name: string;
    code: string;
}


const allCountriesArray = Object.keys(allCountries).map((key) => ({
  name: allCountries[key],
  code: key,
}))

const searchString = ref('')
const filteredCountries = ref(allCountriesArray.slice(0, numberOfCountries))

watch(searchString, (newVal) => {
  filteredCountries.value = allCountriesArray
    .filter((country) =>
      country.name.toLowerCase().includes(newVal.toLowerCase())
    )
    .slice(0, numberOfCountries)
})
</script>

<template>
    <div class="background">
    <X class="close-button" :size="24" @click="$emit('close')" color="white"/>
    <div class="selector">
        <input type="text" v-model="searchString" placeholder="Search..." />
        <div class="countries">
            <LanguageItem v-for="country in filteredCountries" :key="country.code" :country="country" @selected="$emit('close')"/>
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
    background-color: #B0A190;
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

.countries {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 5px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
</style>