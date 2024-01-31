<template>
    <div class="purchase-entry-table">
        <h2>Data Entry Table</h2>
        <table>
            <thead>
                <tr>
                    <!-- Table header ... -->
                    <th>PO</th>
                    <th>Item List</th>
                    <th>Description</th>
                    <th>Qty</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>User</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(purchase, index) in displayedPurchases" :key="index">
                    <!-- Table body rows ... -->
                    <td>{{ purchase.PO }}</td>
                    <td>{{ purchase.Item_list }}</td>
                    <td>{{ purchase.Description }}</td>
                    <td>{{ purchase.Qty }}</td>
                    <td>{{ purchase.Category }}</td>
                    <td>{{ purchase.Price }}</td>
                    <td>{{ purchase.User }}</td>
                    <td>
                        <button @click="editPurchase(index)">Edit</button>
                        <button @click="deletePurchase(index)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="pagination">
            <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            purchases: [],
            editedPurchase: null,
            itemsPerPage: 5, // Adjust as needed
            currentPage: 1
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.purchases.length / this.itemsPerPage)
        },
        displayedPurchases() {
            const start = (this.currentPage - 1) * this.itemsPerPage
            const end = start + this.itemsPerPage
            return this.purchases.slice(start, end)
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            axios
                .get('http://localhost:8000/purchase/list')
                .then((response) => {
                    this.purchases = response.data
                })
                .catch((error) => {
                    console.error('Error fetching data:', error.response.data)
                })
        },
        editPurchase(index) {
            this.editedPurchase = { ...this.purchases[index] }
        },
        savePurchase() {
            if (this.editedPurchase) {
                // Update existing record
                axios
                    .put(
                        `http://localhost:8000/purchase/${this.editedPurchase.PO}`,
                        this.editedPurchase
                    )
                    .then((response) => {
                        console.log('Data updated successfully:', response.data)
                        this.editedPurchase = null // Clear editedPurchase after successful update
                    })
                    .catch((error) => {
                        console.error('Error updating data:', error.response.data)
                        // Handle error, show error message, etc.
                    })
            } else {
                // Insert new record
                axios
                    .post('http://localhost:8000/purchase', this.editedPurchase)
                    .then((response) => {
                        console.log('Data saved successfully:', response.data)
                        this.editedPurchase = null // Clear editedPurchase after successful save
                    })
                    .catch((error) => {
                        console.error('Error saving data:', error.response.data)
                        // Handle error, show error message, etc.
                    })
            }
        },
        deletePurchase(index) {
            const poToDelete = this.purchases[index].PO

            // Delete the record from the server
            axios
                .delete(`http://localhost:8000/purchase/${poToDelete}`)
                .then(() => {
                    console.log('Data deleted successfully')
                    this.purchases.splice(index, 1) // Remove the record from the local array
                })
                .catch((error) => {
                    console.error('Error deleting data:', error.response.data)
                    // Handle error, show error message, etc.
                })
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++
            }
        }
    }
}
</script>

<style scoped lang="scss">
.purchase-entry-table {
    max-width: 90%;
    margin: auto;
    //margin-left: 10rem;
    align-content: center;
    //margin-right: 5rem;
    //text-align: center;
    padding: 2rem;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;

    h2 {
        text-align: center;
    }

    table {
        width: 100%;
        border-collapse: collapse;

        th,
        td {
            padding: 1rem;
            border: 0.1rem solid #ddd;
            text-align: left;
        }

        th {
            background-color: #007bff;
            color: #fff;
        }

        td {
            button {
                background-color: #007bff;
                color: #fff;
                padding: 0.5rem;
                margin-right: 0.5rem;
                cursor: pointer;
            }
        }
    }
}
.pagination {
    margin-top: 1rem;
    text-align: center;

    button {
        margin: 0 0.5rem;
        padding: 0.5rem 1rem;
        cursor: pointer;
    }
}
</style>
