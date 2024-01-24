<template>
	<div>
		<Header />
		<body class="login-body">
			<div class="login-container">
				<div class="login-content">
					<div>
						<LogoIcon class="logo-icon" />
						<div class="spacer"></div>
						<form
							class="login-form"
							@submit.prevent="submitForm"
							action="/login"
							method="POST"
						>
							<div v-if="content" class="error-message">
								<ErrorIcon class="error-icon" />
								<p>{{ content }}</p>
							</div>
							<div class="form-field">
								<label for="username">User Name</label>
								<UserIcon class="user-icon" />
								<input
									type="text"
									placeholder="User Name"
									id="username"
									name="Username"
									v-model="username"
									required
									class="username-input"
								/>
							</div>
							<div class="form-field">
								<label for="password">Password</label>
								<div class="password-field">
									<PasswordIcon class="password-icon" />
									<input
										type="password"
										placeholder="Enter Password"
										id="password"
										name="Password"
										v-model="password"
										required
										class="password-input"
									/>
									<span
										class="password-toggle"
										@click="togglePasswordVisibility"
									>
										<ShowPasswordIcon
											v-if="showPassword"
											class="show-password-icon"
										/>
										<HidePasswordIcon
											v-else
											class="hide-password-icon"
										/>
									</span>
								</div>
							</div>
							<a href="#" class="forgot-password-link"
								>Forget Password?</a
							>
							<div class="remember-me">
								<input
									id="remember"
									aria-describedby="remember"
									type="checkbox"
									v-model="rememberMe"
									class="remember-checkbox"
								/>
								<label for="remember">Remember me</label>
							</div>
							<div class="spacer"></div>
							<div class="submit-button">
								<button type="submit" class="login-button">
									Log In
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</body>
	</div>
</template>

<script>
	import Header from '@/components/Header.vue';
	import LogoIcon from '@/components/LogoIcon.vue';
	import ErrorIcon from '@/components/ErrorIcon.vue';
	import UserIcon from '@/components/UserIcon.vue';
	import PasswordIcon from '@/components/PasswordIcon.vue';
	import ShowPasswordIcon from '@/components/ShowPasswordIcon.vue';
	import HidePasswordIcon from '@/components/HidePasswordIcon.vue';

	export default {
		components: {
			Header,
			LogoIcon,
			ErrorIcon,
			UserIcon,
			PasswordIcon,
			ShowPasswordIcon,
			HidePasswordIcon,
		},
		data() {
			return {
				content: '',
				username: '',
				password: '',
				rememberMe: false,
				showPassword: false,
			};
		},
		methods: {
			togglePasswordVisibility() {
				this.showPassword = !this.showPassword;
			},
			submitForm() {
				// Add form submission logic here
			},
		},
	};
</script>

<style lang="scss">
	// Your SCSS styles go here

	.login-body {
		// Add styles for body
		background-color: azure;
	}

	.login-container {
		// Add styles for the container
		background-color: azure;
	}

	.login-content {
		// Add styles for the content
		background-color: azure;
	}

	.logo-icon {
		// Add styles for the logo icon
		background-color: azure;
	}

	.spacer {
		// Add styles for the spacer
		background-color: azure;
	}

	.login-form {
		// Add styles for the form
		background-color: azure;
	}

	.error-message {
		// Add styles for the error message
		background-color: azure;
	}

	.error-icon {
		// Add styles for the error icon
		background-color: azure;
	}

	.form-field {
		// Add styles for form fields
		background-color: azure;
	}

	.user-icon {
		// Add styles for the user icon
		background-color: azure;
	}

	.username-input {
		// Add styles for the username input
		background-color: azure;
	}

	.password-field {
		// Add styles for the password field
		background-color: azure;
	}

	.password-icon {
		// Add styles for the password icon
		background-color: azure;
	}

	.password-input {
		// Add styles for the password input
		background-color: azure;
	}

	.password-toggle {
		// Add styles for the password toggle
		background-color: azure;
	}

	.show-password-icon {
		// Add styles for the show password icon
		background-color: azure;
	}

	.hide-password-icon {
		// Add styles for the hide password icon
		background-color: azure;
	}

	.forgot-password-link {
		// Add styles for the forgot password link
		background-color: azure;
	}

	.remember-me {
		// Add styles for the remember me section
		background-color: azure;
	}

	.remember-checkbox {
		// Add styles for the remember checkbox
		background-color: azure;
	}

	.login-button {
		// Add styles for the login button
		background-color: azure;
	}
</style>
