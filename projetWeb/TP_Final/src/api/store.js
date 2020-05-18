import User from "../models/User"

// npm install vuex
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

export default class AppStore {}

AppStore.UPDATE_USER = "UPDATE_USER"
AppStore.UPDATE_USER_ON_SERVER = "UPDATE_USER_ON_SERVER" ;

AppStore.store = new Vuex.Store({
    state: {
        user: new User()
    },
    getters: {
        user: state => {
            return state.user ;
        }
    },
    mutations: {
        [AppStore.UPDATE_USER](state, json){
            state.user.fromJSON(json) ;
        }
    },
    actions: {
        [AppStore.UPDATE_USER]({ commit }, json) {
            commit(AppStore.UPDATE_USER, json)
        },
        [AppStore.UPDATE_USER_ON_SERVER]({ commit }, json){
            // On utilise ici une Promise en imaginant qu'ensuite, on fera un appel serveur...
            return new Promise((resolve, reject) => {
                // il faudrait ici faire l'update au niveau du serveur qui gère les users...
                commit(AppStore.UPDATE_USER, json)
                resolve()
            })
        }
    }
});
