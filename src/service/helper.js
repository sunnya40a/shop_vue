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
            userData.refreshTime = null
            cryptoService.saveData(userData, 'userindex')
        }
        authStore.setUsername('')
        authStore.setAuthorized(false)
        authStore.setToken('')
        authStore.setRefToken('')
        authStore.setRefTime(0)
        //localStorage.removeItem('userindex', 'True')
        console.log('local_Cleanup Done.')
        console.log('AuthStore:', authStore.isAuthenticated, authStore.getUsername)
    }
}
