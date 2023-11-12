<script setup lang="ts">
import { useDataStore } from '~/entries/store';

const dataStore = useDataStore();
</script>

<template>
  <div class="image-section">
    <img class="image-section__image" :src="dataStore.thumbnailUrl" />
  </div>
</template>

<style scoped>
.image-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
  width: 100%;
  border-bottom: solid 2px #B0A190;
}
.image-section__image {
  max-height: 70%;
  max-width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px solid #B0A190; 
}
</style>