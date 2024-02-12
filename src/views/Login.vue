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
import { cryptoService } from '@/service/security'

export default {
    name: 'Login',
    emits: ['vnode-unmounted'],

    setup(_, { emit, vnode }) {
        // Define reactive variables using ref()
        const input = ref({
            username: '',
            password: ''
        })
        const error = ref('')
        const isPasswordVisible = ref(false)

        // Access the router
        const router = useRouter()

        // Access the auth store
        const authstore = useAuthStore()

        // Function to toggle password visibility
        const togglePasswordVisibility = () => {
            isPasswordVisible.value = !isPasswordVisible.value
        }

        // Function to handle login
        const login = async () => {
            error.value = '' // Reset error message
            try {
                // Get the token from the auth store
                const mytoken = authstore.token
                console.log(mytoken)
                // Send a POST request to the login endpoint
                const response = await axios.post(
                    'http://localhost:8000/loginapi',
                    {
                        username: input.value.username,
                        password: input.value.password
                    },
                    {
                        withCredentials: true,
                        // Set authorization header if token exists
                        headers: mytoken ? { Authorization: mytoken } : undefined
                    }
                )

                // Handle successful login
                if (response.status >= 200 && response.status < 300) {
                    // Update auth store with user information
                    authstore.setUsername(input.value.username)
                    authstore.setAuthorized(true)

                    // Prepare user information for local storage
                    authstore.setRefTime(new Date().setMinutes(new Date().getMinutes() + 1))
                    const authindex = {
                        user: input.value.username,
                        authorized: true,
                        token: authstore.token,
                        refreshToken: authstore.reftoken,
                        refreshTime: authstore.reftime
                    }

                    // Update token and refresh token if received in the response
                    if (response.data.token) {
                        authindex.token = response.data.token
                        authstore.setToken(response.data.token)
                    }
                    if (response.data.reftoken) {
                        authindex.refreshToken = response.data.reftoken
                        authstore.setRefToken(response.data.reftoken)
                    }

                    // Save user information to local storage
                    cryptoService.saveData(authindex, 'userindex')

                    // Redirect to dashboard
                    router.replace({ name: 'dashboard' })
                } else {
                    // Handle authentication failure
                    console.error('Authentication failed. Status code:', response.status)
                    error.value = 'Authentication failed. Please check your credentials.'
                }
            } catch (error) {
                // Handle errors during authentication
                if (error.response && error.response.data) {
                    const { status, data } = error.response
                    error.value = `Authentication failed: ${data.message || 'Unknown error.'}`
                } else {
                    console.error('An error occurred during authentication:', error)
                    error.value = 'An error occurred during authentication. Please try again.'
                }
            }
        }

        // Cleanup function
        onBeforeUnmount(() => {
            // Check if vnode is defined before emitting the event
            if (vnode) {
                emit('vnode-unmounted')
            }
        })

        // Return reactive variables and functions to be used in the template
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
