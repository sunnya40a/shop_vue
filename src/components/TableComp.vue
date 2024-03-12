<template>
    <div>
        <div class="searcharea">
            <input
                type="text"
                v-model="searchQuery"
                placeholder="Search..."
                @input="handleSearchChange"
            />
        </div>

        <table class="Table">
            <thead>
                <tr>
                    <th @click="sortBy('PO')" class="sortable">
                        PO
                        <span v-if="sortByField === 'PO'">
                            <span class="material-symbols-outlined">{{
                                sortDirection === 'asc' ? 'arrow_drop_up' : 'arrow_drop_down'
                            }}</span>
                        </span>
                    </th>
                    <th @click="sortBy('Pdate')" class="sortable">
                        Date
                        <span v-if="sortByField === 'Pdate'">
                            <span class="material-symbols-outlined">{{
                                sortDirection === 'asc' ? 'arrow_drop_up' : 'arrow_drop_down'
                            }}</span>
                        </span>
                    </th>
                    <th @click="sortBy('Item_list')" class="sortable">
                        Item List<span v-if="sortByField === 'Item_list'">
                            <span class="material-symbols-outlined">{{
                                sortDirection === 'asc' ? 'arrow_drop_up' : 'arrow_drop_down'
                            }}</span>
                        </span>
                    </th>
                    <th @click="sortBy('Description')" class="sortable">
                        Description<span v-if="sortByField === 'Description'">
                            <span class="material-symbols-outlined">{{
                                sortDirection === 'asc' ? 'arrow_drop_up' : 'arrow_drop_down'
                            }}</span>
                        </span>
                    </th>
                    <th @click="sortBy('Category')" class="sortable">
                        Category<span v-if="sortByField === 'Category'">
                            <span class="material-symbols-outlined">{{
                                sortDirection === 'asc' ? 'arrow_drop_up' : 'arrow_drop_down'
                            }}</span>
                        </span>
                    </th>
                    <th @click="sortBy('Qty')" class="sortable">
                        Qty<span v-if="sortByField === 'Qty'">
                            <span class="material-symbols-outlined">{{
                                sortDirection === 'asc' ? 'arrow_drop_up' : 'arrow_drop_down'
                            }}</span>
                        </span>
                    </th>
                    <th @click="sortBy('Price')" class="sortable">
                        Price<span v-if="sortByField === 'Price'">
                            <span class="material-symbols-outlined">{{
                                sortDirection === 'asc' ? 'arrow_drop_up' : 'arrow_drop_down'
                            }}</span>
                        </span>
                    </th>
                    <th @click="sortBy('User')" class="sortable">
                        User<span v-if="sortByField === 'User'">
                            <span class="material-symbols-outlined">{{
                                sortDirection === 'asc' ? 'arrow_drop_up' : 'arrow_drop_down'
                            }}</span>
                        </span>
                    </th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in sortedData" :key="item.PO">
                    <td>{{ item.PO }}</td>
                    <td>{{ item.Pdate }}</td>
                    <td>{{ item.Item_list }}</td>
                    <td>{{ item.Description }}</td>
                    <td>{{ item.Category }}</td>
                    <td>{{ item.Qty }}</td>
                    <td>{{ item.Price }}</td>
                    <td>{{ item.User }}</td>
                    <td><a href="#">Details</a></td>
                </tr>
            </tbody>
        </table>
        <Pagination
            :current-page="currentPage"
            :total-page-count="totalPageCount"
            :per-page.sync="limit"
            :totalRecords="totalRecords"
            @page-change="handlePageChange"
            @per-page-change="handlePerPageChange"
        />
    </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import { useAuthStore } from '@/stores/auth'

export default {
    components: {
        Pagination
    },
    data() {
        return {
            data: null,
            currentPage: 1,
            totalPageCount: 1,
            limit: 20,
            totalRecords: 0,
            sortByField: 'PO', // Default sorting field
            sortDirection: 'asc', // Default sorting direction
            searchQuery: '', // Initialize search query
            authstore: useAuthStore()
        }
    },
    computed: {
        filteredData() {
            if (!this.data) return null

            // If no search query, return all data
            if (!this.searchQuery) return this.data

            // Filter entire dataset based on search query
            return this.data.filter((item) => {
                // Filter logic: you can customize this based on your requirements
                return Object.values(item).some((val) => {
                    return String(val).toLowerCase().includes(this.searchQuery.toLowerCase())
                })
            })
        },
        sortedData() {
            if (!this.filteredData) return null
            let sorted = this.filteredData.slice()
            if (this.sortByField) {
                sorted.sort((a, b) => {
                    let modifier = this.sortDirection === 'desc' ? -1 : 1
                    if (a[this.sortByField] < b[this.sortByField]) return -1 * modifier
                    if (a[this.sortByField] > b[this.sortByField]) return 1 * modifier
                    return 0
                })
            }
            return sorted
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            try {
                const response = await fetch(
                    `https://localhost:8000/purchase/list?page=${this.currentPage}&limit=${this.limit}&search=${this.searchQuery}&sortBy=${this.sortByField}&sortOrder=${this.sortDirection}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: this.authstore.token, // Use the stored token
                            'X-CSRF-Token': this.authstore.ctoken
                        },
                        credentials: 'include'
                    }
                )
                const responseData = await response.json()
                this.data = responseData.Data
                this.totalRecords = responseData.TotalRecords
                this.totalPageCount = Math.ceil(responseData.TotalRecords / this.limit)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        },
        handlePageChange(pageNumber) {
            this.currentPage = pageNumber
            this.fetchData()
        },
        handlePerPageChange(perPage) {
            this.limit = perPage
            this.currentPage = 1
            this.fetchData()
        },
        handleSearchChange() {
            this.currentPage = 1
            this.fetchData()
        },

        sortBy(field) {
            this.sortByField = field
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
            this.fetchData()
        }
    }
}
</script>

<style lang="scss" scoped>
.searcharea {
    margin-left: 50px;
    font-size: 20px;
    height: 20px;
}
.Table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ccc;
    font-family: Arial, sans-serif;
    font-size: 20px;
    margin-left: 50px;
    .sortable {
        cursor: pointer; /* Change cursor to pointer */
    }

    th,
    td {
        padding: 10px;
        text-align: left;
    }

    th {
        background-color: #f2f2f2;
        border-bottom: 2px solid #ddd;
    }

    td {
        border-bottom: 1px solid #ddd;
    }

    tr:hover {
        background-color: #f5f5f5;
    }

    a {
        text-decoration: none;
        color: #007bff;
    }
}
</style>
