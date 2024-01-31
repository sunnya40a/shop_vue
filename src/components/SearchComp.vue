<template>
    <form id="searchForm">
        <input
            type="text"
            @input="search"
            id="searchInput"
            name="searchInput"
            placeholder="search"
        />
        <!-- <button type="submit">Search</button> -->
    </form>
</template>

<script setup>
const emit = defineEmits(['search'])
const search = (e) => {
    emit('search', e.target.value)
}
</script>

<style lang="scss" scoped>
/* Add your styles here */
#searchForm {
    display: flex;
    justify-content: space-between;
    max-width: 200px;
    margin: 0px, 5px;
}

#searchInput {
    padding: 10px;
    font-size: 16px;
    border: 2px solid #ccc;
    border-radius: 5px;
    outline: none;
}

button {
    background-color: #4caf50;
    color: white;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>
