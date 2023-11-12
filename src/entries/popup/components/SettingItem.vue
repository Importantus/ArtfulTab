<script setup lang="ts">
interface Props {
    name: string;
    description: string;
}

const props = defineProps<Props>();
</script>

<template>
    <div class="setting-item">
        <div class="setting-item__right">
            <p class="setting-item__name">{{ props.name }}</p>
            <p class="setting-item__description">{{ props.description }}</p>
        </div>
        <div class="setting-item__left">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.setting-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    padding: 5px 10px;
    gap: 5px;
    flex-wrap: nowrap;
}

.setting-item__right {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2px;
    max-width: 70%;
}

.setting-item__name {
    font-size: 16px;
    font-weight: 500;
    color: white;
}

.setting-item__description {
    font-size: 12px;
    font-weight: 400;
    color: #B0A190;
}

p {
    margin: 0;
}
</style>