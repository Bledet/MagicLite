<template>
    <div>
        <h1>Decks</h1>
    </div>
</template>

<script>
    import User from "../models/User"

    export default {
        name: "UserDecks",
        props: {
            user: User
        },
    }
</script>

<style scoped>

</style>