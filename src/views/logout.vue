<template>
    <div style="align=center" v-if="isLoggingOut">Logging out...</div>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
    setup() {
        const authStore = useAuthStore()
        const router = useRouter()
        const isLoggingOut = ref(false)
        const logout = async () => {
            try {
                isLoggingOut.value = true
                // Perform any necessary logout actions (e.g., API calls)
                const response = await axios.post(
                    'http://localhost:8000/logoutapi',
                    {},
                    {
                        withCredentials: true
                    }
                )
                if (response.status >= 200 && response.status < 300) {
                    // Update the authStore state
                    authStore.setUsername('')
                    authStore.setAuthorized(false)

                    // Redirect to the login page
                    await router.push({ name: 'Login' })
                } else {
                    console.error('Logout failed. Status code:', response.status)
                    // Handle logout failure
                }
                console.log('Response Status', response.status)
                console.log('AuthStore:', authStore.isAuthenticated, authStore.getUsername)
            } catch (error) {
                console.error('An error occurred during logout:', error)
                // Handle logout failure
            } finally {
                isLoggingOut.value = false
            }
        }
        onMounted(logout)
        return { isLoggingOut: true } // Indicate logout in progress
    }
}
</script>
