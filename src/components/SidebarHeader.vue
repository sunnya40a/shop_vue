<template>
    <div id="sidebar-header">
        <div class="logo"></div>
        <div class="name">Chalise</div>
        <div class="group">{{ group }}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            group: 'Teacher'
        }
    }
}
</script>

<style lang="scss" scoped>
#sidebar-header {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 150px;
    //background: radial-gradient(#f03c39, #920025);
    color: #fefefe;

    .logo {
        background-image: url('../assets/admin.png');
        background-position: center;
        background-size: cover;
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }

    .name {
        font-size: 1.4rem;
        color: var(--headertext);
    }
    .group {
        color: var(--headertext);
    }
}
</style>
