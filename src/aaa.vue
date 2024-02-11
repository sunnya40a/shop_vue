// App.vue
<script>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import SideBar from './components/SideBar.vue'
import { useAuthStore } from '@/stores/auth'
import { RefreshToken } from './service/refreshtoken'

export default {
    setup() {
        const router = useRoute()
        const route = useRoute()
        const inactivityTimer = ref(null)
        const authStore = useAuthStore()
        //const router = useRouter()
        const ShowNavbar = ref(!['/login'].includes(router.path))

        // Function to reset the inactivity timer
        const resetInactivityTimer = () => {
            clearTimeout(inactivityTimer.value)
            inactivityTimer.value = setTimeout(logoutUser, 60000 * 1) // 5 minutes in milliseconds
        }

        // Function to logout the user
        const logoutUser = () => {
            // Perform logout or session expiration action
            // For example:
            router.push('/logout')
        }

        watch(
            () => route.path,
            () => {
                resetInactivityTimer()
                ShowNavbar.value = !['/login'].includes(route.path)
            }
        )
        // Set up event listeners to detect user activity
        const setupActivityListeners = () => {
            window.addEventListener('mousemove', resetInactivityTimer)
            window.addEventListener('keypress', resetInactivityTimer)
            // Add more event listeners as needed (e.g., 'touchstart', 'click')
        }

        // Remove event listeners when component is unmounted to prevent memory leaks
        const cleanupActivityListeners = () => {
            window.removeEventListener('mousemove', resetInactivityTimer)
            window.removeEventListener('keypress', resetInactivityTimer)
        }
        // Initialize RefreshToken with router instance
        const { refreshToken } = RefreshToken()

        // Set up activity listeners when component is mounted
        onMounted(() => {
            setupActivityListeners()
            resetInactivityTimer()
        })

        // Clean up activity listeners when component is unmounted
        onUnmounted(() => {
            cleanupActivityListeners()
            clearTimeout(inactivityTimer.value)
        })

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
