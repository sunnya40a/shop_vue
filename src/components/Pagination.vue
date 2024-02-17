<template>
    <div class="navigation-container">
        <div class="results-per-page">
            <label for="perPage">Results per page:</label>
            <select id="perPage" :value="perPage" @change="perPageChanged">
                <option v-for="option in perPageOptions" :key="option" :value="option">
                    {{ option }}
                </option>
            </select>
        </div>
        <div class="pagination">
            <!-- Pagination items here -->
            <!-- First Page -->
            <span class="pagenumber"> Page {{ currentPage }} of {{ totalPageCount }} </span>
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" @click.prevent="firstPage">
                    <span class="material-symbols-outlined"> first_page </span>
                    <!-- First Page Icon -->
                </a>
            </li>
            <!-- Previous Page -->
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" @click.prevent="prevPage">
                    <span class="material-symbols-outlined"> chevron_left </span>
                    <!-- Previous Page Icon -->
                </a>
            </li>
            <!-- Pagination links -->
            <li
                class="page-item"
                v-for="pageNumber in totalPageCount"
                :key="pageNumber"
                :class="{ active: pageNumber === currentPage }"
            >
                <a class="page-link" href="#" @click.prevent="changePage(pageNumber)">{{
                    pageNumber
                }}</a>
            </li>
            <!-- Next Page -->
            <li class="page-item" :class="{ disabled: currentPage === totalPageCount }">
                <a class="page-link" href="#" @click.prevent="nextPage">
                    <span class="material-symbols-outlined"> chevron_right </span>
                    <!-- Next Page Icon -->
                </a>
            </li>
            <!-- Last Page -->
            <li class="page-item" :class="{ disabled: currentPage === totalPageCount }">
                <a class="page-link" href="#" @click.prevent="lastPage">
                    <span class="material-symbols-outlined"> last_page </span>
                    <!-- Last Page Icon -->
                </a>
            </li>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalPageCount: {
            type: Number,
            required: true
        },
        perPage: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            perPageOptions: [5, 10, 20, 50] // Options for number of records per page
        }
    },
    methods: {
        nextPage() {
            if (this.currentPage < this.totalPageCount) {
                this.$emit('page-change', this.currentPage + 1)
            }
        },
        firstPage() {
            this.$emit('page-change', 1)
        },
        lastPage() {
            this.$emit('page-change', this.totalPageCount)
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.$emit('page-change', this.currentPage - 1)
            }
        },
        changePage(pageNumber) {
            this.$emit('page-change', pageNumber)
        },

        perPageChanged(event) {
            const selectedPerPage = parseInt(event.target.value, 10)
            this.$emit('per-page-change', selectedPerPage)
        }
    }
}
</script>
<style lang="scss" scoped>
.navigation-container {
    display: flex; /* Make the container flex */
    justify-content: space-between; /* Align items at each end of the container */
    background-color: #9df1af;
    align-items: center;
    margin-top: 0px;
    //margin-left: 50px;

    div {
        // Styling for the child divs
        padding: 10px; // Adjust padding as needed
    }
    .results-per-page {
        display: flex;
        align-items: center;
        /* ... other styles */
    }

    .pagination {
        display: flex; /* Make the pagination items flex */
        list-style: none;
        padding: 0;
        font-size: 20px;
        .pagenumber {
            font-size: 15px;
            color: gray;
        }
    }

    .page-item {
        margin: 0px;
    }

    .page-link {
        padding: 0px 16px;
        text-decoration: none;
        color: #007bff;
        //border: 1px solid #dee2e6;
        //border-radius: 4px;
    }

    .page-link:hover {
        //background-color: #f2f2f2;
        border-radius: 4px;
    }

    .page-link:focus {
        outline: none;
    }

    .disabled {
        pointer-events: none;
        opacity: 0.5;
    }

    .page-item.active .page-link {
        background-color: #36a05e;
        color: white;
        pointer-events: none;
        font-size: 20px;
    }

    /* Style for the records per page dropdown */
    label {
        margin-right: 10px;
    }

    select {
        padding: 5px;
    }
}
</style>
