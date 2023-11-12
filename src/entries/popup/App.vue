<template>
  <main>
    <LanguageSelector v-if="showLanguageSelector" @close="showLanguageSelector = false" />
    <ImageSection />
    <SettingItem name="Language" description="ArtfulTab will show image descriptions in this language when available" >
      <div class="language-button" @click="showLanguageSelector = true">
        {{ dataStore.settings.language.toUpperCase() }}
      </div>
    </SettingItem>
    <SettingItem name="Animation" description="Whether an animation should be played when a new tab is opened">
      <input type="checkbox" v-model="dataStore.settings.animation" @click="dataStore.setAnimation(dataStore.settings.animation)" />
    </SettingItem>
  </main>
</template>

<script setup lang="ts">
import LanguageSelector from './components/LanguageSelector.vue';
import ImageSection from './components/ImageSection.vue';
import SettingItem from './components/SettingItem.vue';
import { useDataStore } from '../store';
import { ref } from 'vue';

const dataStore = useDataStore();

const showLanguageSelector = ref(false);
</script>

<style>
main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 300px;
  height: 400px;
  background-color: #323232;
}

.language-button {
  background-color: #B0A190;
  border-radius: 5px;
  padding: 5px 10px;
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
}
</style>