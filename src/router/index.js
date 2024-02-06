import { createRouter, createWebHistory } from 'vue-router'
import DashBoard from '../views/DashBoard.vue'
import Login from '../views/Login.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: { name: 'Login' }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/home',
            name: 'dashboard',
            component: DashBoard,
            meta: { requiresAuth: true }
        },
        {
            path: '/category',
            name: 'category',
            component: () => import('../views/category.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/purchase',
            name: 'purchase',
            component: () => import('../views/PurChase.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/logout',
            name: 'logout',
            component: () => import('../views/logout.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('../views/NotFoundView.vue')
        }
    ]
})

// Function to check if authToken is present and valid with user
function isTokenValid() {
    // Check if authToken is present in local storage
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
        // authToken is not present
        return { name: null, validity: false }
    }
    try {
        // token is present and cheking its validity(expire time)
        // Decode the JWT token (assuming it's a JWT)
        const decodedToken = JSON.parse(atob(authToken.split('.')[1]))
        // Check the token expiration (assuming it has an 'exp' claim)
        const currentTimestamp = Math.floor(Date.now() / 1000)
        if (decodedToken.exp && decodedToken.exp < currentTimestamp) {
            // Token has expired
            return { name: null, validity: false }
        }
        // If additional checks are needed, add them here
        // Token is present and valid
        return { name: decodedToken.name, validity: true }
    } catch (error) {
        // Error decoding or parsing the token
        console.error('Error decoding or parsing authToken:', error)
        return { name: null, validity: false }
    }
}

// Define the custom guard function
function authenticatedGuard(to, from, next) {
    // Fetch the authStore instance within the guard context
    const authStore = useAuthStore()
    const { name, validity } = isTokenValid()
    if (validity) {
        // Assuming useAuthStore is a store for managing authentication state
        authStore.setUsername(name) // Set the username first
        authStore.setAuthorized(validity)
    }
    // Check if the route requires authentication
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        // Check if the user is authenticated
        if (authStore.isAuthenticated) {
            // Proceed to the route
            next()
        } else {
            // Redirect to login if not authenticated
            next({ name: 'Login' })
        }
    } else {
        // For routes that don't require authentication, proceed
        next()
    }
}

// Apply the custom guard to your routes
router.beforeEach(authenticatedGuard)

export default router
