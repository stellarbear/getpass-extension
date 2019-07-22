const state = () => ({
    notifyMessage: ''
})


const getters = {
    getNotifyMessage: (state) => state.notifyMessage,
}

const actions = {
    callNotifyMessage({ commit }, value) {
        commit('setNotifyMessage', value);
    }
}

const mutations = {
    setNotifyMessage(state, value) {
        state.notifyMessage = value
    }
}


export default { state, getters, actions, mutations };