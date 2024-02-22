<template>
    <div style="align=center" v-if="isLoggingOut">Logging out...</div>
</template>

<script>
import { useRouter } from 'vue-router'
import { LocalCleanup } from '@/service/helper'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

export default {
    setup() {
        const router = useRouter()
        const isLoggingOut = ref(false)
        const authstore = useAuthStore()
        const logout = async () => {
            try {
                isLoggingOut.value = true
                const usertoken = authstore.token

                const response = await fetch('http://localhost:8000/logoutapi', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': usertoken // Use the stored token
                    },
                    credentials: 'include'
                })

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                // Assuming successful logout if the response is OK
                LocalCleanup()
                // Redirect to the login page
                await router.push({ name: 'Login' })
            } catch (error) {
                console.error('An error occurred during logout:', error)
                // Handle logout failure
            } finally {
                isLoggingOut.value = false
            }
        }

        onMounted(() => {
            logout()
        })

        return { isLoggingOut } // Indicate logout in progress
    }
}
</script>

