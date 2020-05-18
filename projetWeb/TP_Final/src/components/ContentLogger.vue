<template>
    <div class="content-logger">
        <div style="height: 20px"></div>
        <h3>Connect to Magic</h3>
        <div class="msg-box">
            {{error}}
        </div>
        <form @submit.prevent="connect">
            <table style="width: 100%">
                <tr>
                    <td>Login</td>
                    <td><b-form-input size="sm" type="text" v-model="login"/></td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td><b-form-input size="sm" type="password" v-model="password" /></td>
                </tr>
                <tr>
                    <td style="padding-top:20px ; text-align: left">
                        <b-link>Create an account</b-link>
                    </td>
                    <td style="padding-top:30px ; text-align: right">
                        <b-button type="submit" value="Login" size="sm" :disabled="!formFilled" variant="primary">Login</b-button>
                    </td>
                </tr>
            </table>
        </form>
    </div>
</template>

<script>

    import User from "../models/User"
    import AppStore from "../../../vue_tp_final/src/api/store"

    const MAGIC_WORD = "magic"

    export default {
        name: "ContentLogger",
        props: {
            user: User
        },
        data: function(){
            return {
                login: '',
                password: '',
                error: ''
            }
        },
        computed: {
            formFilled: function () {
                return this.login.trim() !== '' && this.password.trim() !== '' ;
            }
        },
        methods: {
            connect: function () {
                if(this.password === MAGIC_WORD){
                    this.error = ""
                    // On imagine récupérer les données de l'utilisateur sur le serveur...
                    let newuser = new User() ;
                    newuser.nick = this.login ;
                    this.connected = true ;
                    this.$store.dispatch(AppStore.UPDATE_USER, newuser.jsonify()) ;
                    this.$router.push("/welcome")
                }else{
                    this.error = "Bad login or password"
                }
            },
        }
    }
</script>

<style scoped>
    .content-logger {
        width: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .msg-box{
        display: flex;
        align-items: flex-end;
        height: 40px ;
        color: red;
    }
</style>