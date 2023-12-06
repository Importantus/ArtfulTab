<script setup lang="ts">
import BottomBar from "./components/BottomBar.vue";
import Image from "./components/Image.vue";
import LoadingScreen from "./components/LoadingScreen.vue";
import ReloadButton from "./components/ReloadButton.vue";
import WikiInfo from "./components/WikiInfo.vue";
import ImagefitSelector from "./components/ImagefitSelector.vue";

import { useDataStore } from "../store";
import { watch } from "vue";
import BrightnessSelector from "./components/BrightnessSelector.vue";

const dataStore = useDataStore();

dataStore.init();

watch(dataStore.settings, () => {
  console.log("saving settings");
  dataStore.saveSettings();
}, { deep: true });
</script>

<template>
  <main>
    <LoadingScreen />
    <Image :class="{ 'image': dataStore.settings.animation }" />
    <BottomBar>
      <div class="right">
        <ReloadButton />
        <div class="infos">
          <WikiInfo :wikipediaData="dataStore.imageTitle" big />
          <div class="subtitle">
            <WikiInfo :wikipediaData="dataStore.artist" :big="false" />
            <div>•</div>
            {{ dataStore.imageData.metadata.date === "NaN" ? "unknown" : dataStore.imageData.metadata.date }}
            <div>•</div>
            <WikiInfo :wikipediaData="dataStore.museum" :big="false" />
          </div>
        </div>
      </div>
      <div class="quick-settings">
        <BrightnessSelector />
        <ImagefitSelector />
      </div>
    </BottomBar>
  </main>
</template>

<style>
.quick-settings {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

@media (max-width: 700px) {
  .quick-settings {
    flex-direction: column;
  }
}

.image {
  opacity: 0;
  animation: fadeIn linear 1;
  animation-fill-mode: forwards;
  animation-duration: 1s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}


.infos {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.right {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  gap: 0.9rem;
}

.subtitle {
  word-break: normal;
  flex-wrap: wrap;
  text-wrap: wrap;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 0.5rem;
  color: rgb(171, 171, 171);
  font-size: 0.9rem;
  font-weight: 300;
}

.a {
  color: rgb(171, 171, 171);
  font-size: 0.9rem;
  font-weight: 300;
}

main {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}
</style>
../../store