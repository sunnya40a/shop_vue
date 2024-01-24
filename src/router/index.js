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

// Define the custom guard function
function authenticatedGuard(to, from, next) {
    // Fetch the authStore instance within the guard context
    const authStore = useAuthStore()

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
