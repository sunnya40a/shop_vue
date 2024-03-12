// App.vue
<script>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { LocalCleanup } from '@/service/helper'
import SideBar from './components/SideBar.vue'

export default {
    components: {
        SideBar
    },
    setup() {
        // Router instance for navigation
        const router = useRouter()

        // Access the authentication store
        const authStore = useAuthStore()

        // Flag to control visibility of the navbar
        const showNavbar = ref(authStore.isAuthenticated)

        // Timer ID for inactivity logout
        let inactivityTimerId = ref(null)

        // Reset inactivity timer
        const resetInactivityTimer = () => {
            if (inactivityTimerId.value) {
                clearTimeout(inactivityTimerId.value)
            }
            // Set timeout for logout after 5 minutes of inactivity
            inactivityTimerId.value = setTimeout(logoutCall, 60000 * 2) // 2 minute
        }

        // Logout user function
        const logoutCall = () => {
            console.log('logout function called from App.vue')
            // Check if user is authenticated
            if (authStore.isAuthenticated) {
                router.push('/logout')
                LocalCleanup()
                clearTimeout(inactivityTimerId.value)
            } else {
                console.log('User is not logged in!!!')
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
            window.removeEventListener('keydown', resetInactivityTimer)
            window.removeEventListener('touchstart', resetInactivityTimer)
            clearTimeout(inactivityTimerId.value)
        })

        // Watch for authentication changes
        // Update the showNavbar flag when authentication status changes
        watch(
            () => authStore.isAuthenticated,
            (newVal) => {
                showNavbar.value = newVal
            }
        )

        // Refresh token logic
        //const { refreshToken } = RefreshToken()

        return {
            showNavbar
        }
    }
}
</script>

<template>
    <div>
        <div>
            <!-- Display SideBar only if showSide is true -->
            <SideBar v-if="showNavbar" />
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
