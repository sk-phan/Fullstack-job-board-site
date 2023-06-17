import Vue from "vue";
import Vuex from "vuex";

// NOTE: If you want to customize how tokens are stored you can use WebStorageStateStore from oidc-client (see bellow)
// Default storage is window.localStorage
// import { WebStorageStateStore } from 'oidc-client'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        hideNavBar: false,
        user: {
            id: null
        },
        currentJob: null
    },
    getters: {

    },
    mutations: {
        setHideNavBar(state, status) {
            state.hideNavBar = status
        },
        setUser(state, userInfo) {
            state.user = userInfo
        },
        setCurrentJob(state, job) {
            state.currentJob = {...job}
        }
    },

    actions: {
        
    },
});