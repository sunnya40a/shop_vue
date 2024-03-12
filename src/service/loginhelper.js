// Import necessary dependencies
import { useAuthStore } from '@/stores/auth' // Import the auth store to access authentication-related data
import { LocalCleanup } from '@/service/helper' // Import the helper service for local data cleanup
import router from '@/router' // Assuming you have a router instance defined
// Function to get token refresh minutes
export function getTokenRefreshMin(token) {
    // Check if token exists
    if (!token) {
        return 0 // Token is considered expired if it doesn't exist
    }

    // Decode token and extract expiration time
    const tokenData = JSON.parse(atob(token.split('.')[1]))
    const expirationTime = tokenData.exp * 1000 // Convert expiration time from seconds to milliseconds
    const currentTime = Date.now()

    // Calculate remaining time in milliseconds
    const remainingTime = expirationTime - currentTime

    // Convert remaining time from milliseconds to minutes and seconds
    const remainingMinutes = Math.floor(remainingTime / (1000 * 60))
    return remainingMinutes
}

// Function to handle token validity
export async function HandleTokenValidity(token) {
    // Check if token exists
    if (!token) {
        return 0 // If token doesn't exist, return 0
    }
    const authStore = useAuthStore() // Get access to the auth store

    let remainingtime = getTokenRefreshMin(token) // Get remaining token refresh time

    // Check if refresh token exists in the auth store
    if (authStore.reftoken) {
        // Check if remaining time is less than or equal to 1 minute
        if (remainingtime <= 1) {
            try {
                // Perform refresh token request
                const refresponse = await fetch('http://localhost:8000/refreshtoken', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        refreshtoken: `${authStore.reftoken}`,
                        'X-CSRF-Token': `${authStore.ctoken}`
                    },
                    credentials: 'include'
                })
                // Check if refresh token request is successful
                if (refresponse.ok) {
                    const responseData = await refresponse.json()
                    // Update token in the auth store
                    authStore.setToken(responseData.newtoken)
                    // Update remaining time
                    remainingtime = getTokenRefreshMin(responseData.newtoken)
                } else {
                    // Handle refresh token request failure
                    LocalCleanup() // Clean up local data
                    router.push('/login') // Redirect to login page
                    throw new Error(
                        `Refresh token request failed with status ${refresponse.status}`
                    )
                }
            } catch (error) {
                console.error('Token renewal failed:', error)
                // Handle error appropriately
            }
        }
    } else {
        // If refresh token doesn't exist, reset remaining time and perform cleanup
        remainingtime = 0
        LocalCleanup() // Clean up local data
        router.push('/login') // Redirect to login page
    }
    return remainingtime // Return remaining time
}
