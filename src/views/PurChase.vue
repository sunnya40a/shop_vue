<template>
    <div style="margin-left: 50px; font-size: 2rem">
        <PurchaseTable :items="items" />
    </div>
</template>

<script setup>
import PurchaseTable from '../components/PurchaseTable.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { parseISO, format } from 'date-fns'
import { useAuthStore } from '@/stores/auth'

const isMounted = ref(true)
const items = ref([])
const authstore = useAuthStore()

onMounted(async () => {
    try {
        const response = await fetch('https://localhost:8000/purchase/list', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                authorization: authstore.token, // Use the stored token
                'X-CSRF-Token': authstore.ctoken
            }
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const responseData = await response.json()

        if (isMounted.value) {
            if (responseData.Data) {
                items.value = responseData.Data
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
                // console.log(items.value)
            } else {
                console.error('Error: response data is not defined.')
            }
        }
    } catch (error) {
        if (isMounted.value) {
            console.error('Error fetching data:', error)
        }
    }
})

onUnmounted(() => {
    isMounted.value = false
})
</script>

<style lang="scss" scoped></style>
