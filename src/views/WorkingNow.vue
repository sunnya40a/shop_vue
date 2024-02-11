//Purchase.vue
<template>
    <div style="margin-left: 50px; font-size: 2rem">
        <PurchaseTable :items="items" />
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import PurchaseTable from '../components/PurchaseTable.vue'
import axios from 'axios'
import { ref, onMounted, onUnmounted } from 'vue'
import { parseISO, format } from 'date-fns'
const isMounted = ref(true)
const items = ref([])
const router = useRouter()

onMounted(async () => {
    try {
        //const response = await axios.get('http://localhost:8000/purchase/list')
        const response = await axios.get('http://localhost:8000/purchase/list', {
            withCredentials: true,
            headers: {
                authorization: localStorage.getItem('authToken') // Use the stored token
            }
        })

        if (isMounted.value) {
            if (response.data) {
                items.value = response.data

                // Modify the Pdate field for each item using date-fns
                items.value = items.value.map((item) => {
                    try {
                        const itemDate = parseISO(item.Pdate)
                        const formattedDate = format(itemDate, 'dd/MM/yyyy')
                        return {
                            ...item,
                            Pdate: formattedDate
                        }
                    } catch (error) {
                        console.error(
                            `Error parsing or formatting date for item with Pdate: ${item.Pdate}`,
                            error
                        )
                        return item
                    }
                })

                // Uncomment the following line if you want to see the modified items
                // console.log(items.value);
            } else {
                console.error('Error: response data is not defined.')
            }
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Redirect to login page if unauthorized
            router.push('/login')
        } else if (isMounted.value) {
            // Only log the error if the component is still mounted
            console.error('Error fetching data:', error)
        }
    }
})

onUnmounted(() => {
    isMounted.value = false
})
</script>

<style scoped lang="scss"></style>
