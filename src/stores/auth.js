// src/stores/auth.js
import { defineStore } from 'pinia'
export const useAuthStore = defineStore('auth', {
    //id: 'auth',
    state: () => ({
        username: '',
        authorized: false,
        token: '',
        reftoken: '',
        reftime: new Date()
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
        getRefToken() {
            return this.reftoken
        },
        getRefTime() {
            return this.reftime
        }
        //below is arowkey function.
        //        getRefToken: (state) => state.reftoken,
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
        },
        setRefTime(time) {
            this.reftime = time
        }
    }
})
export default useAuthStore
