<script setup lang="ts">
import Image from "./components/Image.vue";

import { useDataStore } from "./store";

const dataStore = useDataStore();

dataStore.init();
</script>

<template>
  <main>
    <Image />
  </main>
</template>

<style>
main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
