//FilterRadios.vue
<template>
    <input type="radio" id="all" name="timeframe" value="all" checked @change="timefilter" />
    <label for="all">All</label>

    <input type="radio" id="lastYear" name="timeframe" value="lastYear" @change="timefilter" />
    <label for="lastYear">Last Year</label>

    <input type="radio" id="thisYear" name="timeframe" value="thisYear" @change="timefilter" />
    <label for="thisYear">This Year </label>

    <input type="radio" id="lastMonth" name="timeframe" value="lastMonth" @change="timefilter" />
    <label for="lastMonth">Last Month</label>

    <input type="radio" id="thisMonth" name="timeframe" value="thisMonth" @change="timefilter" />
    <label for="thisMonth">This Month</label>

    <input type="radio" id="lastWeek" name="timeframe" value="lastWeek" @change="timefilter" />
    <label for="lastWeek">Last Week </label>

    <input type="radio" id="thisWeek" name="timeframe" value="thisWeek" @change="timefilter" />
    <label for="thisWeek">This Week </label>

    <input type="radio" id="today" name="timeframe" value="today" @change="timefilter" />
    <label for="today">Today</label>
</template>
<script setup>
const emit = defineEmits(['timefilter']) // Use a consistent event name
const timefilter = (e) => {
    emit('timefilter', e.target.value) // Use the same event name for consistency
}
</script>

<style lang="scss" scoped>
/* General styling for radio buttons and labels */
input[type='radio'] {
    //-webkit-appearance: none; /* Hide the default radio button */
    width: 30px;
    height: 18px;
    border: 2px solid #ccc;
    border-radius: 50%;
    margin-right: 0.1rem; /* Adjusted margin for a very thin space */
    cursor: pointer;

    &:checked {
        background-color: #007bff; /* Primary color for checked state */
        border-color: #007bff;
    }
}

label {
    font-family: sans-serif;
    font-size: 1.6rem;
    font-weight: 500;
    margin-bottom: 5px;
    cursor: pointer;

    /* Subtle hover effect for labels */
    &:hover {
        color: #007bff;
    }
}

/* Align the radio buttons horizontally */
.radio-group {
    display: flex;
    align-items: center;
    gap: 0.01rem; /* Consistent spacing between buttons */
}
</style>
