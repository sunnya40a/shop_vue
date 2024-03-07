import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        // Initial state of the store
        username: '',
        authorized: false,
        token: '',
        reftoken: '',
        ctoken: '',
        reftime: new Date()
    }),
    getters: {
        // Getter functions to access state properties
        isAuthenticated(state) {
            return state.authorized
        },
        getUsername(state) {
            return state.username
        },
        getToken(state) {
            return state.token
        },
        getRefToken(state) {
            return state.reftoken
        },
        getRefTime(state) {
            return state.reftime
        },
        getCtoken(state) {
            return state.ctoken
        }
    },
    actions: {
        // Action functions to modify state
        setAuthorized(authorized) {
            this.authorized = authorized
        },
        setUsername(newUsername) {
            this.username = newUsername
        },
        setToken(acc_token) {
            this.token = acc_token
        },
        setRefToken(ref_token) {
            this.reftoken = ref_token
        },
        setRefTime(time) {
            this.reftime = time
        },
        setCtoken(cx_token) {
            this.ctoken = cx_token
        }
    }
})

export default useAuthStore
