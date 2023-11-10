<script lang="ts" setup>


</script>

<template>
    <div class="hover-wrapper">
        <div class="hover-content-wrapper">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.hover-wrapper {
    opacity: 0;
    position: fixed;
    width: 100vw;
    height: 30vh;
    bottom: 0;
    left: 0;
    background: linear-gradient(180deg, rgba(34, 34, 34, 0) 4.63%, rgba(46, 46, 46, 0.59) 36.1%, #202020 97.85%);
    z-index: 2;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    transition: ease-out;
    transition-duration: 500ms;
}

.hover-wrapper:hover {
    transition: ease-out;
    transition-duration: 500ms;
    opacity: 100%;
}

.hover-content-wrapper {
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    margin: 50px;
}
</style>