<template>
    <div style="align=center" v-if="isLoggingOut">Logging out...</div>
</template>

<script>
import { useRouter } from 'vue-router'
import { cryptoService } from '@/service/security'
import { LocalServices } from '@/service/helper'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

export default {
    setup() {
        const router = useRouter()
        const isLoggingOut = ref(false)
        const authstore = useAuthStore()
        const logout = async () => {
            try {
                isLoggingOut.value = true
                const usertoken = authstore.token
                const response = await axios.post(
                    'http://localhost:8000/logoutapi',
                    {},
                    {
                        withCredentials: true,
                        headers: {
                            authorization: usertoken // Use the stored token
                        }
                        //My server doesn't do with JWT after logout but logout is protected with JWT and session.
                    }
                )
                if (response.status >= 200 && response.status < 300) {
                    // Run required cleanup services.
                    LocalServices.LocalCleanup()
                    // Redirect to the login page
                    await router.push({ name: 'Login' })
                } else {
                    console.error('Logout failed. Status code:', response.status)
                    // Handle logout failure
                }
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
