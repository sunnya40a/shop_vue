// Import necessary dependencies
import { watch, ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { cryptoService } from '@/service/security'
import router from '@/router' // Assuming you have a router instance defined
import { getTokenRefreshMin } from '@/service/loginhelper'
import { LocalCleanup } from '@/service/helper'

// Define the RefreshToken function
export function RefreshToken() {
    // Define necessary variables and references
    const refreshTokenInterval = 1000 * 60 * 0.75
    const intervalId = ref(null) // Reference to store the interval ID
    const authStore = useAuthStore() // Get access to the auth store

    // Function to retrieve the refresh token
    const retrieveRefreshToken = () => authStore.reftoken

    // Function to update the access token
    const updateAccessToken = (newAccessToken) => {
        const savetoken = cryptoService.getUser()
        savetoken.token = newAccessToken
        const reftime = getTokenRefreshMin(newAccessToken)
        savetoken.refreshTime = new Date().setMinutes(new Date().getMinutes() + reftime)
        cryptoService.saveData(savetoken, 'userindex')
        authStore.setToken(newAccessToken)
        authStore.setRefTime(new Date().setMinutes(new Date().getMinutes() + reftime))
        //console.log('New token saved successfully')
    }

    // Function to handle refresh token renewal failure
    const handleRefreshTokenFailure = (error) => {
        console.error('Token renewal failed:', error)

        // Handle different scenarios based on error and response status
        if (error.response && error.response.status === 401) {
            // Redirect to the logout page and update auth store
            logoutUser()
            console.log('Token renewal failed due to unauthorized access')
        } else {
            // Handle other errors
            console.error('Error:', error)
            // You can provide more specific error handling here
        }
    }

    // Function to handle user logout
    const logoutUser = () => {
        router.push('/logout')
        LocalCleanup()
        teardownInterval()
    }

    // Function to refresh the token
    const refreshToken = async () => {
        try {
            const refreshTokenValue = retrieveRefreshToken()
            const csrftoken = authStore.ctoken
            // Check if refresh token exists
            if (!refreshTokenValue) {
                logoutUser()
                return
            }

            // Perform refresh token request
            const response = await fetch('https://localhost:8000/refreshtoken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    refreshtoken: `${refreshTokenValue}`,
                    'X-CSRF-Token': `${csrftoken}`
                },
                credentials: 'include'
            })

            if (!response.ok) {
                logoutUser()
                console.log('Token renewal request failed:', response.status)
            } else {
                // Extract new access token from response
                const data = await response.json()
                const newAccessToken = data.newtoken
                // Update the access token in the store
                updateAccessToken(newAccessToken)
            }
        } catch (error) {
            // Handle refresh token failure
            handleRefreshTokenFailure(error)
        }
    }

    // Function to set up the refresh token interval
    const setupInterval = () => {
        if (intervalId.value) {
            clearInterval(intervalId.value) // Clear the existing interval
        }
        intervalId.value = setInterval(refreshtokenCheck, refreshTokenInterval) // Set the new interval
    }

    // Function to clear the refresh token interval
    const teardownInterval = () => {
        clearInterval(intervalId.value)
    }

    // Function to check and refresh token if necessary
    const refreshtokenCheck = () => {
        const reftime = authStore.reftime
        const currentTime = new Date().getTime()
        if (reftime && reftime - currentTime <= 1.5 * 60 * 1000) {
            //console.log('Refreshing token...')
            refreshToken()
        } else {
            //console.log('Token refresh check skipped.')
        }
    }

    // Hook to set up the interval on component mount
    onMounted(() => {
        setupInterval()
    })

    // Watcher to handle changes in authentication status
    watch(
        () => authStore.isAuthenticated,
        (newValue) => {
            if (newValue) {
                setupInterval()
            } else {
                teardownInterval()
            }
        }
    )

    // Hook to clear the interval on component unmount
    onUnmounted(() => {
        teardownInterval()
    })

    // Return the refreshToken function
    return { refreshToken }
}
