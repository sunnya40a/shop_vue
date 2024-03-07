// App.vue
<script>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { RefreshToken } from '@/service/refreshtoken'
import { LocalCleanup } from '@/service/helper'
import SideBar from './components/SideBar.vue'
import axios from 'axios'

export default {
    setup() {
        // Router instance for navigation
        const router = useRouter()

        // Access the authentication store
        const authStore = useAuthStore()

        // Flag to control visibility of the navbar
        const ShowNavbar = ref(authStore.isAuthenticated)

        // Timer for inactivity logout
        let inactivityTimer = ref(undefined)

        // Reset inactivity timer
        const resetInactivityTimer = () => {
            if (inactivityTimer) {
                clearTimeout(inactivityTimer)
            }
            // Set timeout for logout after 5 minutes of inactivity
            inactivityTimer = setTimeout(() => {
                logoutUser()
            }, 60000 * 10) // 10 minutes
        }

        // Logout user function
        const logoutUser = async () => {
            console.log('logout function called from App.vue')
            console.log('current token:', authStore.token)
            // Check if user is authenticated
            if (!authStore.isAuthenticated) {
                console.log('User is not logged in!!!')
                return
            }
            try {
                const usertoken = authStore.token
                // Logout request to the server
                const response = await axios.post(
                    'https://localhost:8000/logoutapi',
                    {},
                    {
                        withCredentials: true,
                        headers: {
                            authorization: usertoken
                        }
                    }
                )
                if (response.status >= 200 && response.status < 300) {
                    // Run cleanup services
                    LocalCleanup()
                    // Redirect to the login page
                    await router.push({ name: 'Login' })
                } else {
                    console.error('Logout failed. Status code:', response.status)
                    // Handle logout failure
                }
            } catch (error) {
                console.error('An error occurred during logout:', error)
                // Handle logout failure
            }
        }

        // Add event listeners for inactivity detection
        onMounted(() => {
            window.addEventListener('mousemove', resetInactivityTimer)
            window.addEventListener('keydown', resetInactivityTimer)
            window.addEventListener('touchstart', resetInactivityTimer)
            // Start the timer initially
            resetInactivityTimer()
        })

        // Remove event listeners on component unmount
        onUnmounted(() => {
            window.removeEventListener('mousemove', resetInactivityTimer)
            window.removeEventListener('keypress', resetInactivityTimer)
            window.removeEventListener('touchstart', resetInactivityTimer)
            clearTimeout(inactivityTimer)
        })

        // Watch for authentication changes
        watch(
            () => authStore.isAuthenticated,
            (newVal) => {
                if (newVal) {
                    // If authenticated, set ShowNavbar to true and reset inactivity timer
                    ShowNavbar.value = true
                    resetInactivityTimer()
                } else {
                    // If not authenticated, set ShowNavbar to false and clear inactivity timer
                    ShowNavbar.value = false
                    clearTimeout(inactivityTimer)
                }
            }
        )

        // Refresh token logic
        const { refreshToken } = RefreshToken()

        return {
            ShowNavbar
        }
    },

    components: {
        SideBar
    }
}
</script>

<template>
    <div>
        <div>
            <!-- Display SideBar only if showSide is true -->
            <SideBar v-if="ShowNavbar" />
        </div>
        <div>
            <RouterView />
        </div>
    </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
:root {
    font-size: 62.5%;
    --sidebar-width: 2rem;
    --expanded-sidebar-width: 320px;
    --menubackground: #1d5d9b;
    --menutext: #e0e0e0;
    --headertext: #00ffff;
    --sidebar-width: 300px;
    --activebackground: #141e46;
    --menuhovercolor: #073757;
    --activeborder: #ff9843;
    --seperatorcolor: #073757;

    --menuiconcolor: #e0e0e0;
    --dropdownmenucolor: #fcda91;
    --light: #f1f5f9;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Fira sans', sans-serif;
}

body {
    background: var(--light);
}

button {
    cursor: pointer;
    appearance: none;
    border: none;
    outline: none;
    background: none;
}

.app {
    display: flex;

    main {
        flex: 1 1 0;
        padding: 2rem;

        @media (max-width: 1024px) {
            padding-left: 6rem;
        }
    }
}
</style>
