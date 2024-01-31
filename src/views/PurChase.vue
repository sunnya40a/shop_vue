<template>
    <div style="margin-left: 50px; font-size: 2rem">
        <PurchaseTable :items="items" />
    </div>
</template>

<script setup>
import PurchaseTable from '../components/PurchaseTable.vue'
import axios from 'axios'
import { ref, onMounted, onUnmounted } from 'vue'
import { parseISO, format } from 'date-fns'
//import { useAuthStore } from '@/stores/auth'

const isMounted = ref(true)
const items = ref([])
//const authstore = useAuthStore()

onMounted(async () => {
    //authstore.setLastvisitedRoute(window.location.pathname)
    //console.log(authstore.getLastvisitedRoute)
    try {
        const response = await axios.get('http://localhost:8000/purchase/list')

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
        if (isMounted.value) {
            console.error('Error fetching data:', error)
        }
    }
})

// // beforeRouteLeave guard
// const beforeRouteLeave = (to, from, next) => {
//     if (to !== from) {
//         authstore.actions.setLastVisitedRoute(from.fullPath)
//         next()
//     }
// }

onUnmounted(() => {
    isMounted.value = false
})
</script>

<style scoped lang="scss"></style>
