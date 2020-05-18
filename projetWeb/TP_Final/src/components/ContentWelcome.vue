<template>
    <div class="content-welcome">
        <h1 v-if="user.nick">Welcome {{user.nick}}</h1>
        <h4 v-else>
            Please log in
        </h4>

    </div>
</template>

<script>

    import User from "../models/User"

    export default {
        name: "ContentWelcome",
        props: {
            user: User
        },
    }
</script>

<style scoped>
    .content-welcome {
        text-align: center;
    }

</style>