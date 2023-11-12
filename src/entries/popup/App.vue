<template>
  <main>
    <LanguageSelector v-if="showLanguageSelector" @close="showLanguageSelector = false" />
    <ImageSection />
    <div class="settings-wrapper">
      <SettingItem name="Language" description="ArtfulTab will show image descriptions in this language when available">
        <div class="language-button" @click="showLanguageSelector = true">
          {{ dataStore.settings.language.toUpperCase() }}
        </div>
      </SettingItem>
      <SettingItem name="Animation" description="Whether an animation should be played when a new tab is opened">
        <label class="switch">
          <input type="checkbox" class="watched-slider" v-model="dataStore.settings.animation">
          <span class="slider round"></span>
        </label>
      </SettingItem>
      <SettingItem name="Image Interval" description="How often the image should change (in hours)">
        <input type="number" class="watched-input" v-model="dataStore.settings.hoursUntilNextImage" />
      </SettingItem>
    </div>
  </main>
</template>

<script setup lang="ts">
import LanguageSelector from './components/LanguageSelector.vue';
import ImageSection from './components/ImageSection.vue';
import SettingItem from './components/SettingItem.vue';
import { useDataStore } from '../store';
import { ref, watch } from 'vue';

const dataStore = useDataStore();

const showLanguageSelector = ref(false);

watch(dataStore.settings, () => {
  dataStore.saveSettings();
}, { deep: true });
</script>

<style>
main {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 300px;
  height: 360px;
  background-color: #323232;
  word-break: normal;
}

.language-button,
.watched-input {
  background-color: #B0A190;
  border-radius: 5px;
  padding: 5px 10px;
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
}

.watched-input {
  width: 45px;
  text-align: center;
  outline: none;
  border: none;
}

.settings-wrapper {
  display: flex;
  flex-direction: column;
  padding-top: 5px;
  gap: 2px;

  --accent-color: #B0A190;
  --accent-color-tuned: #70675b;
  --color-card-background: #4a4a4a;
}

.switch {
  --width: 30px;
  --height: 15px;
  --border-radius: 20px;
  display: inline-block;
  height: var(--height);
  position: relative;
  width: var(--width)
}

.switch input {
  height: 0;
  opacity: 0;
  width: 0
}

.slider {
  background-color: var(--color-card-background);
  border: none;
  border-radius: 20px;
  bottom: 0;
  cursor: pointer;
  left: 0;
  outline: none;
  right: 0;
  top: 0
}

.slider,
.slider:before {
  position: absolute;
  transition: transform .4s
}

.slider:before {
  background-color: var(--accent-color-tuned);
  border-radius: 50%;
  content: "";
  height: var(--height);
  width: var(--height)
}

input:checked+.slider {
  background-color: var(--color-card-background)
}

input:checked+.slider:before {
  background-color: var(--accent-color);
  -webkit-transform: translateX(calc(var(--width) - var(--height)));
  -ms-transform: translateX(calc(var(--width) - var(--height)));
  transform: translateX(calc(var(--width) - var(--height)))
}
</style>