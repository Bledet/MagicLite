<template>
    <div id="app">
        <header>
            <b-navbar style="flex: 1" toggleable="md" type="dark" variant="dark">

                <b-navbar-brand to="/welcome"><img id="logo" src="./assets/Magic-the-gathering-logo.png"/></b-navbar-brand>

                <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

                <b-collapse is-nav id="nav_collapse">

                    <b-navbar-nav v-if="userLogged">
                        <b-nav-item to="/userCards">Cards</b-nav-item>
                        <b-nav-item to="/userDecks">Decks</b-nav-item>
                    </b-navbar-nav>

                    <b-navbar-nav class="ml-auto">
                        <b-nav-item-dropdown v-if="userLogged" :text="user.nick" right>
                            <b-dropdown-item to="/updateuser">Information</b-dropdown-item>
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-dropdown-item @click="userLoggedOut">Logout</b-dropdown-item>
                        </b-nav-item-dropdown>
                        <b-nav-item-dropdown v-else text="Account" right>
                            <b-dropdown-item to="/logger">Login</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>

                </b-collapse>

            </b-navbar>

        </header>
        <div class="content">
            <router-view ></router-view>
        </div>
    </div>
</template>

<script>

    import ContentLogger from "./components/ContentLogger"
    import ContentWelcome from "./components/ContentWelcome"
    import ContentUI from "./components/ContentUserInformation"
    import User from "./models/User"
    import UserDecks from "./components/ContentDecks"
    import UserCards from "./components/ContentCards"

    import Vue from "vue"

    // CHANGÉ POUR RÉUTILISER DANS D'AUTRES COMPOSANTS !
    import AppStore from "./api/store"
    const store = AppStore.store ;

    const routes = [
        { path: '/welcome', component: ContentWelcome, props: { user: store.getters.user }  },
        { path: '/updateuser', component: ContentUI, props: { user: store.getters.user } },
        { path: '*', redirect: '/welcome'}, // Chemin par défaut
        { path: '/logger', component: ContentLogger, props: { user: store.getters.user } },
        { path: '/userCards', component: UserCards, props: { user: store.getters.user } },
        { path: '/userDecks', component: UserDecks, props: { user: store.getters.user } },
    ]

    // npm install vue-router
    import VueRouter from "vue-router"
    Vue.use(VueRouter)
    const router = new VueRouter({
        routes: routes
    })

    export default {
        name: 'app',
        store,
        router,
        computed: {
            user : function (){
                return this.$store.getters.user ;
            },
            userLogged: function () {
                return this.user.nick ;
            }
        },
        methods: {
            userLoggedOut: function () {
                this.$store.dispatch(AppStore.UPDATE_USER, new User().jsonify())
                this.$router.push("/welcome")
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    header {
        margin-bottom: 30px;
    }

    .content{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .content-user-information{
        width: 70%;
    }

    .content-logger{
        width: 200px ;
    }

    .content-cards{
        width: 70% ;
    }

    #logo {
        height: 3em;
    }

</style>
