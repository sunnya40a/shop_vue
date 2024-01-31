<template>
    <div class="multiselect">
        <div @click="toggleDropdown" class="selected-items">
            <span>Filters</span>
            <span
                class="material-symbols-outlined dropdown-icon"
                :class="{
                    'rotate-down': !isDropdownOpen,
                    'rotate-up': isDropdownOpen
                }"
            >
                arrow_drop_down
            </span>
        </div>
        <div v-show="isDropdownOpen" class="dropdown">
            <label v-for="(item, index) in items" :key="index" class="checkbox-label">
                <input
                    type="checkbox"
                    :id="item"
                    :value="item"
                    v-model="selectedItems"
                    @change="handleCheckboxChange"
                />
                {{ item }}
            </label>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps(['items'])
const emit = defineEmits(['dropfilter'])

const isDropdownOpen = ref(false)
const selectedItems = ref([])

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value
}

const handleCheckboxChange = () => {
    emit('dropfilter', selectedItems.value)
}
</script>

<style lang="scss" scoped>
.multiselect {
    position: relative;
    font-family: Arial, sans-serif;
    margin: 0px 10px;
    width: 20rem;

    .selected-items {
        display: flex;
        align-items: center;
        padding: 10px;
        border: 1px solid #ccc;
        cursor: pointer;

        .dropdown-icon {
            margin-left: 5px;
        }

        .rotate-down {
            transform: rotate(0deg);
            transition: transform 0.3s ease;
        }

        .rotate-up {
            transform: rotate(180deg);
            transition: transform 0.3s ease;
        }
    }

    .dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        background-color: #fff;
        border: 1px solid #ccc;
        padding: 10px;
        max-height: 150px;
        overflow-y: auto;
        width: 20rem;
    }

    .checkbox-label {
        display: block;
        margin-bottom: 8px;
    }
}
</style>
