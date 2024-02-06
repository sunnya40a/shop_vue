// App.vue
<script>
import { ref, watch } from 'vue'
import { RouterView } from 'vue-router'
import SideBar from './components/SideBar.vue'
import { useAuthStore } from '@/stores/auth'
import { RefreshToken } from './service/refreshtoken'

export default {
    setup() {
        const authStore = useAuthStore()
        const ShowNavbar = ref(authStore.isAuthenticated)

        // Use watch to watch for changes in isAuthenticated
        watch(
            () => authStore.isAuthenticated,
            (newVal) => {
                ShowNavbar.value = newVal
            }
        )

        // Initialize RefreshToken with router instance
        const { refreshToken } = RefreshToken()

        // Setup the interval for token renewal
        //const intervalId = setInterval(refreshToken, refreshTokenInterval)

        // Clear the interval when the component is about to be destroyed
        //onBeforeUnmount(() => {
        //    clearInterval(intervalId)
        //})

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
