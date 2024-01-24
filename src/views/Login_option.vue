<template>
    <div id="login" class="login-container">
        <form @submit.prevent="login">
            <h1>Login</h1>
            <div class="form-inputs">
                <label for="Username">Username</label>
                <input
                    type="text"
                    id="Username"
                    name="Username"
                    v-model="input.Username"
                    placeholder="Username"
                    autocomplete="username"
                />
            </div>
            <div class="form-inputs">
                <label for="Password">Password</label>
                <div class="password-wrapper">
                    <input
                        :type="isPasswordVisible ? 'text' : 'password'"
                        id="Password"
                        name="Password"
                        v-model="input.Password"
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
import { useRouter } from 'vue-router'
import { mapState, mapActions } from 'pinia'
import axios from 'axios'

export default {
    name: 'Login',
    emits: ['vnode-unmounted'],
    data() {
        return {
            input: {
                username: '', // lowercase for consistency
                password: ''
            },
            error: '',
            isPasswordVisible: false
        }
    },
    computed: {
        // Example of mapping a state property (if needed)
        ...mapState(['username'], { computedsource: '$store.auth' })
    },
    methods: {
        ...mapActions(['setUsername'], { source: '$store.auth' }),
        async login() {
            // No need for nextTick or isMounted check

            this.error = ''

            try {
                const response = await axios.post(
                    'http://localhost:8000/loginapi',
                    {
                        username: this.input.username,
                        password: this.input.password
                    },
                    {
                        withCredentials: true
                    }
                )

                if (response.status >= 200 && response.status < 300) {
                    this.setUsername(this.input.username)
                    // Use mapped action or directly access the store if needed:
                    // this.$store.auth.setAuthorized(true)
                    this.$router.replace({ name: 'dashboard' })
                } else {
                    console.error('Authentication failed. Status code:', response.status)
                    this.error = 'Authentication failed. Please check your credentials.'
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    const { status, data } = error.response
                    this.error = `Authentication failed: ${data.message || 'Unknown error.'}`
                } else {
                    console.error('An error occurred during authentication:', error)
                    this.error = 'An error occurred during authentication. Please try again.'
                }
            }
        },
        togglePasswordVisibility() {
            this.isPasswordVisible = !this.isPasswordVisible
        }
    },
    beforeUnmount() {
        this.$emit('vnode-unmounted') // No need for isMounted check
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
