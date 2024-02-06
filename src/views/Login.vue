<template>
    <div id="login" class="login-container">
        <form @submit.prevent="login">
            <h1>Login</h1>
            <div class="form-inputs">
                <label for="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    v-model="input.username"
                    placeholder="Username"
                    autocomplete="username"
                />
            </div>
            <div class="form-inputs">
                <label for="Password">Password</label>
                <div class="password-wrapper">
                    <input
                        :type="isPasswordVisible ? 'text' : 'password'"
                        id="password"
                        name="password"
                        v-model="input.password"
                        placeholder="Enter Password"
                        autocomplete="current-password"
                    />
                    <span
                        class="password-icon material-symbols-outlined"
                        :class="{ visibility_off: !isPasswordVisible }"
                        @click="togglePasswordVisibility"
                    >
                        {{ isPasswordVisible ? 'visibility' : 'visibility_off' }}
                    </span>
                </div>
            </div>
            <div class="remember-me">
                <input type="checkbox" id="remember" name="remember" />
                <label for="remember">Remember me</label>
            </div>
        </form>
        <button type="button" @click="login">Login</button>
        <p v-if="error" class="error-message">{{ error }}</p>
    </div>
</template>
<script>
import { ref, onBeforeUnmount } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export default {
    name: 'Login',
    emits: ['vnode-unmounted'],

    setup(_, { emit, vnode }) {
        const input = ref({
            username: '',
            password: ''
        })

        const authstore = useAuthStore()
        const error = ref('')
        const isPasswordVisible = ref(false)

        const togglePasswordVisibility = () => {
            isPasswordVisible.value = !isPasswordVisible.value
        }

        const router = useRouter()
        const authToken = localStorage.getItem('authToken')

        const login = async () => {
            error.value = ''

            try {
                const response = await axios.post(
                    'http://localhost:8000/loginapi',
                    {
                        username: input.value.username,
                        password: input.value.password
                    },
                    {
                        withCredentials: true,
                        headers: authToken ? { Authorization: authToken } : undefined
                    }
                )

                if (response.status >= 200 && response.status < 300) {
                    if (response.data.token) {
                        const token = response.data.token
                        localStorage.setItem('authToken', token)
                        console.log('Received token:', token)
                    }

                    if (response.data.reftoken) {
                        const Reftoken = response.data.reftoken
                        localStorage.setItem('refreshToken', Reftoken)
                        console.log('Refresh token:', Reftoken)
                    }
                    // Log the token to ensure it's obtained correctly

                    authstore.setUsername(input.value.username)
                    authstore.setAuthorized(true)
                    console.log('AuthStore:', authstore.isAuthenticated, authstore.getUsername)
                    router.replace({ name: 'dashboard' })
                } else {
                    console.error('Authentication failed. Status code:', response.status)
                    error.value = 'Authentication failed. Please check your credentials.'
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    const { status, data } = error.response
                    error.value = `Authentication failed: ${data.message || 'Unknown error.'}`
                } else {
                    console.error('An error occurred during authentication:', error)
                    error.value = 'An error occurred during authentication. Please try again.'
                }
            }
        }

        onBeforeUnmount(() => {
            // Check if vnode is defined before emitting the event
            if (vnode) {
                emit('vnode-unmounted')
            }
        })

        return {
            input,
            error,
            isPasswordVisible,
            authstore,
            togglePasswordVisibility,
            login
        }
    }
}
</script>

<style lang="scss">
#login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    min-height: 100vh;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    h1 {
        font-size: 24px;
        margin-bottom: 20px;
        color: #333;
    }

    .form-inputs {
        margin-bottom: 15px;

        label {
            display: block;
            font-size: 14px;
            margin-bottom: 5px;
            color: #555;
        }

        input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 14px;

            &:focus {
                outline: none;
                border-color: #007bff;
            }
        }
    }

    .password-wrapper {
        position: relative;

        .password-icon {
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
            cursor: pointer;
            font-size: 18px; // Adjust the font size as needed
        }
    }

    .remember-me {
        margin-top: 10px; /* Adjust spacing as needed */

        label {
            font-size: 14px;
            color: #555;
            margin-left: 5px;
        }
    }

    button {
        padding: 10px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        width: 150px; /* Adjust as needed */

        &:hover {
            background-color: #0056b3;
        }
    }

    .error-message {
        color: red;
        margin-top: 10px;
    }
}
</style>
