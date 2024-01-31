<!-- PurchaseEntryForm.vue -->
<template>
    <div class="purchase-entry-form">
        <h2>Data Entry Form</h2>
        <form @submit.prevent="savePurchase">
            <div class="form-group">
                <label for="po">PO:</label>
                <input type="number" v-model="purchase.PO" id="po" required />
            </div>
            <div class="form-group">
                <label for="itemList">Item List:</label>
                <input type="text" v-model="purchase.item_list" id="itemList" required />
            </div>
            <div class="form-group">
                <label for="description">Description:</label>
                <textarea v-model="purchase.description" id="description" required></textarea>
            </div>
            <div class="form-group">
                <label for="qty">Qty:</label>
                <input type="number" v-model="purchase.qty" id="qty" required />
            </div>
            <div class="form-group">
                <label for="category">Category:</label>
                <input type="text" v-model="purchase.category" id="category" required />
            </div>
            <div class="form-group">
                <label for="price">Price:</label>
                <input type="number" v-model="purchase.price" id="price" required />
            </div>
            <div class="form-group">
                <label for="user">User:</label>
                <input type="text" v-model="purchase.User" id="user" required />
            </div>
            <button type="submit">Save</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            purchase: {
                PO: 10004,
                item_list: 'DPD - 008',
                description: 'Testing',
                qty: 50,
                category: 'Dairy Products',
                price: 584,
                User: 'Chalise'
            }
        }
    },
    methods: {
        savePurchase() {
            axios
                .post('http://localhost:8000/purchaseapi', this.purchase)
                .then((response) => {
                    console.log('Data saved successfully:', response.data)
                    // Optionally, you can perform additional actions after successful save
                })
                .catch((error) => {
                    console.error('Error saving data:', error.response.data)
                    // Handle error, show error message, etc.
                })
        }
    }
}
</script>

<style scoped lang="scss">
.purchase-entry-form {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;

    h2 {
        text-align: center;
    }

    form {
        display: grid;
        grid-gap: 15px;

        .form-group {
            label {
                display: block;
                margin-bottom: 5px;
            }

            input,
            textarea {
                width: 100%;
                padding: 8px;
                box-sizing: border-box;
            }

            button {
                background-color: #007bff;
                color: #fff;
                padding: 10px;
                border: none;
                cursor: pointer;
            }
        }
    }
}
</style>
