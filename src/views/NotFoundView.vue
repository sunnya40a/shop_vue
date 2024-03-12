<template>
    <div class="not-found-container">
        <img src="@/assets/notfound.jpg" alt="404 Not Found Image" class="not-found-image" />
        <h1 class="not-found-title">Oops! Page Not Found</h1>
        <p class="not-found-description">
            The page you are looking for might be in another universe. Let's navigate back to home.
        </p>
        <router-link to="/" class="back-to-home-button">Back to Home</router-link>
    </div>
</template>

<script></script>

<style lang="scss" scoped>
.not-found-container {
    text-align: center;
    margin-top: 50px;

    .not-found-image {
        width: 300px;
        height: 300px;
        margin-bottom: 20px;
    }

    .not-found-title {
        font-size: 36px;
        color: #333;
    }

    .not-found-description {
        font-size: 18px;
        color: #666;
        margin-bottom: 30px;
    }

    .back-to-home-button {
        display: inline-block;
        padding: 10px 20px;
        font-size: 16px;
        background-color: #3498db;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #2980b9;
        }
    }
}
</style>
