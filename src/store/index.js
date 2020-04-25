import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {
        notifyEvent(commit, info) {
            console.log('TITLE' + info.title)
            Vue.notify({
                group: 'foo',
                title: info.title,
                text: info.text
            })
        }
    },
    modules: {}
})
