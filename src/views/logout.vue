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

                const response = await axios.post(
                    'http://localhost:8000/logoutapi',
                    {},
                    {
                        withCredentials: true,
                        headers: {
                            authorization: localStorage.getItem('authToken') // Use the stored token
                        }
                        //My server doesn't do with JWT after logout but logout is protected with JWT and session.
                    }
                )

                if (response.status >= 200 && response.status < 300) {
                    // Update the authStore state
                    authStore.setUsername('')
                    authStore.setAuthorized(false)
                    // comment this line if you want keep your current token for future use.
                    //localStorage.removeItem('authToken')
                    // Redirect to the login page
                    await router.push({ name: 'Login' })
                } else {
                    console.error('Logout failed. Status code:', response.status)
                    // Handle logout failure
                }
                console.log('AuthStore:', authStore.isAuthenticated, authStore.getUsername)
            } catch (error) {
                //console.log('Request Configuration:', error.config)
                console.error('An error occurred during logout:', error)
                // Handle logout failure
            } finally {
                isLoggingOut.value = false
            }
        }

        onMounted(() => {
            // Assuming your server sends the token in the response
            // You may need to adjust this based on your actual server response
            // For example, if the token is in response.data.token, update token.value accordingly
            //token.value = 'your_received_token'
            logout()
        })

        return { isLoggingOut } // Indicate logout in progress
    }
}
</script>
