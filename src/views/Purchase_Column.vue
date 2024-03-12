<!-- PurchaseEntryForm.vue -->
<template>
    <div class="purchase-entry-form">
        <h2>Data Entry Form</h2>
        <form @submit.prevent="savePurchase">
            <div class="form-group">
                <label for="po">PO:</label>
                <input id="po" v-model="purchase.PO" type="number" required />
            </div>
            <div class="form-group">
                <label for="itemList">Item List:</label>
                <input id="itemList" v-model="purchase.item_list" type="text" required />
            </div>
            <div class="form-group">
                <label for="description">Description:</label>
                <textarea id="description" v-model="purchase.description" required></textarea>
            </div>
            <div class="form-group">
                <label for="qty">Qty:</label>
                <input id="qty" v-model="purchase.qty" type="number" required />
            </div>
            <div class="form-group">
                <label for="category">Category:</label>
                <input id="category" v-model="purchase.category" type="text" required />
            </div>
            <div class="form-group">
                <label for="price">Price:</label>
                <input id="price" v-model="purchase.price" type="number" required />
            </div>
            <div class="form-group">
                <label for="user">User:</label>
                <input id="user" v-model="purchase.User" type="text" required />
            </div>
            <button type="submit">Save</button>
        </form>
    </div>
</template>

<script>
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
            const url = 'http://localhost:8000/purchaseapi'
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Assuming JSON data
                },
                body: JSON.stringify(this.purchase)
            }

            fetch(url, options)
                .then((response) => response.json()) // Parse response as JSON
                .then((data) => {
                    console.log('Data saved successfully:', data)
                    // Optionally, you can perform additional actions after successful save
                })
                .catch((error) => {
                    console.error('Error saving data:', error)
                    // Handle error, show error message, etc.
                })
        }
    }
}
</script>

<style lang="scss" scoped>
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
<style lang="scss" scoped></style>
