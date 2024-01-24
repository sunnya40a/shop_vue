<template>
    <div style="align=center" v-if="isLoggingOut">Logging out...</div>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

export default {
    setup() {
        const authStore = useAuthStore()
        const router = useRouter()

        const logout = async () => {
            // Perform any necessary logout actions (e.g., API calls)
            // ...

            // Update the authStore state
            authStore.setUsername('')
            authStore.setAuthorized(false)
            console.log('AuthStore:', authStore.isAuthenticated, authStore.getUsername)
            // Redirect to the login page
            await router.push({ name: 'Login' })
        }

        onMounted(logout)

        return { isLoggingOut: true } // Indicate logout in progress
    }
}
</script>
