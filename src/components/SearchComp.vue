<template>
    <form id="searchForm">
        <input
            type="text"
            @input="handleInput"
            id="searchInput"
            name="searchInput"
            v-model="searchText"
            placeholder="search"
        />
    </form>
</template>

<script setup>
import { defineEmits, ref } from 'vue'

const emit = defineEmits(['search'])
const searchText = ref('')
let previousSearchText = '' // Variable to store previous search text

const handleInput = (e) => {
    // Retrieve the input value
    let inputValue = e.target.value
    // Remove any characters that don't match the desired pattern
    // Remove unwanted characters and replace multiple spaces with single space
    inputValue = inputValue
        .replace(/[^\s\w\-()!,.[]]/g, '') // Remove unwanted characters
        .replace(/\s+/g, ' ') // Replace multiple spaces with a single space

    // Update the searchText with the filtered input value
    searchText.value = inputValue
    // Emit the searchText only if it has changed after filtering
    if (searchText.value !== previousSearchText) {
        emit('search', searchText.value)
        previousSearchText = searchText.value // Update previousSearchText
    }
}
</script>

//regexPattern := regexp.MustCompile(`[^\\s\\w\\-\\(\\)!\[\]/]`)
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
