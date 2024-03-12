//DateRange.vue
<template>
    <input id="all" type="radio" name="timeframe" value="all" checked @change="timefilter" />
    <label for="all">All</label>

    <input id="lastYear" type="radio" name="timeframe" value="lastYear" @change="timefilter" />
    <label for="lastYear">Last Year</label>

    <input id="thisYear" type="radio" name="timeframe" value="thisYear" @change="timefilter" />
    <label for="thisYear">This Year </label>

    <input id="lastMonth" type="radio" name="timeframe" value="lastMonth" @change="timefilter" />
    <label for="lastMonth">Last Month</label>

    <input id="thisMonth" type="radio" name="timeframe" value="thisMonth" @change="timefilter" />
    <label for="thisMonth">This Month</label>

    <input id="lastWeek" type="radio" name="timeframe" value="lastWeek" @change="timefilter" />
    <label for="lastWeek">Last Week </label>

    <input id="thisWeek" type="radio" name="timeframe" value="thisWeek" @change="timefilter" />
    <label for="thisWeek">This Week </label>

    <input id="today" type="radio" name="timeframe" value="today" @change="timefilter" />
    <label for="today">Today</label>
</template>
<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['dateRangeSelected'])

const timefilter = (e) => {
    const { startDate, endDate } = calculateDateRange(e.target.value)
    // console.log('Start Date:', startDate)
    // console.log('End Date:', endDate)
    emit('dateRangeSelected', { startDate, endDate })
}

const calculateDateRange = (timeframe) => {
    const currentDate = new Date()
    let startDate, endDate, oneWeekAgo, startOfWeek, endOfWeek
    switch (timeframe) {
        case 'lastYear':
            startDate = new Date(currentDate.getFullYear() - 1, 0, 1) // Start of last year
            endDate = new Date(currentDate.getFullYear() - 1, 11, 31) // End of last year
            break
        case 'thisYear':
            startDate = new Date(currentDate.getFullYear(), 0, 1) // Start of this year
            endDate = new Date() // Current date (Today)
            break
        case 'lastMonth':
            startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1) // Start of last month
            endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0) // End of last month
            break
        case 'thisMonth':
            startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1) // Start of this month
            endDate = new Date() // Current date (Today)
            break
        case 'lastWeek':
            oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000) // One week ago
            startDate = new Date(
                oneWeekAgo.getFullYear(),
                oneWeekAgo.getMonth(),
                oneWeekAgo.getDate()
            ) // Start of last week
            endDate = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate() - 1
            ) // End of last week
            break
        case 'thisWeek':
            startOfWeek = currentDate.getDate() - currentDate.getDay() // Start of this week
            endOfWeek = startOfWeek + 6
            startDate = new Date(currentDate.setDate(startOfWeek)) // Start of this week
            endDate = new Date(currentDate.setDate(endOfWeek)) // End of this week
            break
        case 'today':
            startDate = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate()
            ) // Start of today
            endDate = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate()
            ) // End of today
            break
        default:
            startDate = ''
            endDate = ''
            break
    }

    return { startDate, endDate }
}
</script>

<style lang="scss" scoped>
/* General styling for radio buttons and labels */
input[type='radio'] {
    //-webkit-appearance: none; /* Hide the default radio button */
    width: 20px;
    height: 20px;
    border: 2px solid #ccc;
    //border-radius: 50%;
    margin-right: 0px;
    margin-left: 10px; /* Adjusted margin for radio button */
    cursor: pointer;
    align-items: center;
    align-content: end;
    margin: 10px 0px;
    &:checked {
        background-color: #007bff; /* Primary color for checked state */
        border-color: #007bff;
    }
}

/* Increased space between labels */
label {
    font-family: sans-serif;
    font-size: 1.6rem;
    font-weight: 500;
    margin-right: 10px; /* Increased margin between labels */
    cursor: pointer;

    /* Subtle hover effect for labels */
    &:hover {
        color: #007bff;
    }
}

/* Align the radio buttons horizontally */
.radio-group {
    display: flex;
    align-items: self-end;
    gap: 2rem; /* Consistent spacing between buttons */
}
</style>
