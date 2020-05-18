<template>
    <div class="content-user-information">
        <user-information :user-data="user"
                          v-on:user-mutated="userMutated"
        ></user-information>
    </div>
</template>

<script>
    import User from "../models/User"
    import UserInformation from "./UserInformation/UserInformation"

    import AppStore from "../../../vue_tp_final/src/api/store"

    export default {
        name: "ContentUserInformation",
        props: {
            user: User
        },
        components: {
            'user-information': UserInformation
        },
        methods: {
            userMutated: function (newUser) {
                this.$store.dispatch(AppStore.UPDATE_USER_ON_SERVER, newUser.jsonify()).then(() =>{
                })
            }
        }
    }
</script>

<style scoped>

    .content-user-information{

    }

</style>