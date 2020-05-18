<template>
        <form id="logger" class="magic-logger" @submit="connect">
            <b-form-input size="sm" id="nameInput" type="text" v-model="login" placeholder="Login"/>
            <br>
            <b-form-input size="sm" type="password" v-model="password" placeholder="Password"/>
            <br>
            <b-button id="logButton" class="btn btn-outline-light" type="submit" size="sm"> Login </b-button>
        </form>
</template>

<script>
    export default {
        name: "MagicLogger",
        data: function () {
            return {
                login: '',
                password: ''
            }
        },


        methods:{
            connect: function (event) {
                window.console.log("Click : ", this.login, this.password, event)
                alert(
                    "Login : " + this.login + "\n" +
                    "Password : " + this.password + "\n" +
                    "Connection to implemented yet !")
            }
        }
    }

</script>

<style scoped>
    #logButton{
        size: auto;
    }

    #logger{
        flex: none;
        background: lightsteelblue;
        border: 2px solid white;
        border-radius: 3px;
        padding: 5px;
    }
</style>