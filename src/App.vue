// App.vue
<script>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { RefreshToken } from '@/service/refreshtoken'
import { cryptoService } from '@/service/security'
import { LocalServices } from '@/service/helper'
import SideBar from './components/SideBar.vue'
import axios from 'axios'

export default {
    setup() {
        const router = useRouter() // Import useRouter for logout redirection
        const authStore = useAuthStore()
        const ShowNavbar = ref(authStore.isAuthenticated)
        let inactivityTimer = ref(undefined) // Add inactivity timer

        // Functions for inactivity logout
        const resetInactivityTimer = () => {
            if (inactivityTimer) {
                clearTimeout(inactivityTimer)
            }
            inactivityTimer = setTimeout(() => {
                logoutUser()
            }, 60000)
        }

        const logoutUser = async () => {
            console.log('logout function called from App.vue')
            console.log('current token:', authStore.token)
            if (!authStore.isAuthenticated) {
                console.log('user is not loged in already.')
                return
            }
            try {
                const usertoken = authStore.token
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
            }
        }
        // Set up event listeners for inactivity detection
        onMounted(() => {
            window.addEventListener('mousemove', resetInactivityTimer)
            window.addEventListener('keypress', resetInactivityTimer)
            window.addEventListener('touchstart', resetInactivityTimer)
            resetInactivityTimer() // Start the timer initially
        })

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
                    console.log('Logout Timer Reset')
                    ShowNavbar.value = true
                    //resetInactivityTimer()
                } else {
                    // If not authenticated, set ShowNavbar to false and clear inactivity timer
                    console.log('Logout Timer Clear')
                    ShowNavbar.value = false
                    clearTimeout(inactivityTimer)
                }
            }
        )

        // Refresh token logic (unchanged)
        const { refreshToken } = RefreshToken()
        // ... (set up interval for token renewal if needed)

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
