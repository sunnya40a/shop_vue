// src/stores/auth.js
import { defineStore } from 'pinia'
export const useAuthStore = defineStore('auth', {
    //id: 'auth',
    state: () => ({
        username: '',
        authorized: false,
        token: null,
        reftoken: null
    }),
    getters: {
        isAuthenticated() {
            return this.authorized
        },
        getUsername() {
            return this.username
        },
        getToken() {
            return this.token
        },

        getRefToken: (state) => state.reftoken
        // getRefToken() {
        //     return this.reftoken
        // }
    },
    actions: {
        setUsername(newUsername) {
            this.username = newUsername
        },
        setAuthorized(authorized) {
            this.authorized = authorized
        },
        setToken(acc_token) {
            this.token = acc_token
        },
        setRefToken(ref_token) {
            this.reftoken = ref_token
        }
    }
})
export default useAuthStore
