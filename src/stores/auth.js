// src/stores/auth.js
import { defineStore } from 'pinia'
export const useAuthStore = defineStore('auth', {
    //id: 'auth',
    state: () => ({
        username: '',
        authorized: false,
        lastVisitedRoute: ''
    }),
    getters: {
        isAuthenticated() {
            return this.authorized
        },
        getUsername() {
            return this.username
        },
        getLastvisitedRoute() {
            return this.lastVisitedRoute
        }
    },
    actions: {
        setUsername(newUsername) {
            this.username = newUsername
        },
        setAuthorized(authorized) {
            this.authorized = authorized
        },
        setLastvisitedRoute(route) {
            this.lastVisitedRoute = route
        }
    }
})
export default useAuthStore
