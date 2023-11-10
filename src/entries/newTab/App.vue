<script setup lang="ts">
import BottomBar from "./components/BottomBar.vue";
import Image from "./components/Image.vue";
import LoadingScreen from "./components/LoadingScreen.vue";
import ReloadButton from "./components/ReloadButton.vue";
import WikiInfo from "./components/WikiInfo.vue";
import ImagefitSelector from "./components/ImagefitSelector.vue";

import { useDataStore } from "./store";

const dataStore = useDataStore();

dataStore.init();
</script>

<template>
  <main>
    <LoadingScreen />
    <Image />
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
      <ImagefitSelector />
    </BottomBar>
  </main>
</template>

<style>
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
