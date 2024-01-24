// src/stores/auth.js
import { defineStore } from 'pinia'
export const useAuthStore = defineStore('auth', {
    //id: 'auth',
    state: () => ({
        username: '',
        authorized: false
    }),
    getters: {
        isAuthenticated() {
            return this.authorized
        },
        getUsername() {
            return this.username
        }
    },
    actions: {
        setUsername(newUsername) {
            this.username = newUsername
        },
        setAuthorized(authorized) {
            this.authorized = authorized
        }
    }
})
export default useAuthStore
