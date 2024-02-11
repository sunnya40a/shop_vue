// Import necessary dependencies
import { watch, ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { cryptoService } from '@/service/security'
import router from '@/router' // Assuming you have a router instance defined

// Define the RefreshToken function
export function RefreshToken() {
    // Define necessary variables and references
    const refreshTokenInterval = 1000 * 60 * 5
    const intervalId = ref(null) // Reference to store the interval ID
    const authStore = useAuthStore() // Get access to the auth store

    const retrieveRefreshToken = () => {
        let data = cryptoService.getUser()
        console.log('Ref-token:', data.refreshToken)
        return data.refreshToken
    }

    const updateAccessToken = (newAccessToken) => {
        let savetoken = cryptoService.getUser()
        savetoken.refreshToken = newAccessToken
        cryptoService.saveData(savetoken, 'userindex')
        console.log('New refresh token Saved successfully')
    }

    // Function to handle refresh token renewal failure
    const handleRefreshTokenFailure = (error) => {
        console.error('Refresh token renewal failed:', error)

        // Handle different scenarios based on error and response status
        if (error.response && error.response.status === 401) {
            console.log('Refreshing Token Unauthorized. Redirecting to login...')
            // Redirect to the logout page and update auth store
            router.push('/logout')
            authStore.setAuthorized(false)
            authStore.setUsername('')
        } else {
            // Handle other errors
            console.error('Error:', error)
            // You can provide more specific error handling here
        }
    }

    // Function to refresh the token
    const refreshToken = async () => {
        console.log('Refresh Token called')
        try {
            const refreshTokenValue = retrieveRefreshToken()

            // Check if refresh token exists
            if (!refreshTokenValue) {
                // Redirect to logout page if refresh token is missing and update auth store
                router.push('/logout')
                authStore.setAuthorized(false)
                authStore.setUsername('')
                return
            }

            // Perform refresh token request
            const response = await fetch('http://localhost:8000/refreshtoken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    refreshtoken: `${refreshTokenValue}`
                }
            })

            // Check if request is successful
            if (!response.ok) {
                // Redirect to logout page and update auth store in case of failure
                router.push('/logout')
                authStore.setAuthorized(false)
                authStore.setUsername('')
                throw new Error(`Refresh token request failed with status ${response.status}`)
            }

            // Extract new access token from response
            const data = await response.json()
            const newAccessToken = data.newtoken
            // Update the access token in the store
            updateAccessToken(newAccessToken)
        } catch (error) {
            // Handle refresh token failure
            handleRefreshTokenFailure(error)
        }
    }

    const setupInterval = () => {
        if (authStore.isAuthenticated) {
            console.log('Token refresh Timer Reset')
            intervalId.value = setInterval(refreshToken, refreshTokenInterval)
        }
    }

    const teardownInterval = () => {
        console.log('Token refresh Timer clear')
        clearInterval(intervalId.value)
    }

    onMounted(() => {
        setupInterval()
    })

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

    onUnmounted(() => {
        teardownInterval()
    })

    // Return the refreshToken function
    return { refreshToken }
}

// Define the interval for token refresh (5 minutes)
//export const refreshTokenInterval = 1000 * 60 * 5
