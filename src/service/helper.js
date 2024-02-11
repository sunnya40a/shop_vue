import { useAuthStore } from '@/stores/auth'
import { cryptoService } from '@/service/security'

export const LocalServices = {
    LocalCleanup() {
        const userData = cryptoService.getUser()
        const authStore = useAuthStore()
        if (userData) {
            // Check if `userData` has value
            userData.authorized = false
            userData.user = null
            //userData.token = null
            //userData.refreshToken = null
            cryptoService.saveData(userData, 'userindex')
        }
        authStore.setUsername(null)
        authStore.setAuthorized(false)
        authStore.setToken(null)
        authStore.setRefToken(null)
        //localStorage.removeItem('userindex', 'True')
        console.log('local_Cleanup Done.')
        console.log('AuthStore:', authStore.isAuthenticated, authStore.getUsername)
    }
}
