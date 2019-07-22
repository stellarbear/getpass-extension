import timer from './timer';
import { copyToClipboard } from "@/auxiliary";

const clipboardTimer = timer('Clipboard');

const state = {
    ...clipboardTimer.state,
}

const getters = {
    ...clipboardTimer.getters,
}

//  TODO: update timer
const actions = {
    ...clipboardTimer.actions,
    updateClipboard: ({ commit, dispatch }, { timeout }) => {
        commit('updateClipboardTimer', { timeout });
        dispatch('tickClipboard');
    },
    onClipboardTimeout: () => {
        copyToClipboard('clipboard wiped');
    }
}

const mutations = {
    ...clipboardTimer.mutations,
}

export default { state, getters, actions, mutations };