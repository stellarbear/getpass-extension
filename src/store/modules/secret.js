import timer from './timer';
import { generatePasswordImplementation } from '@/auxiliary';

const secretTimer = timer('Secret');

const state = {
    ...secretTimer.state,
    secret: null,
}

const getters = {
    ...secretTimer.getters,
}

//  TODO: update timer
const actions = {
    ...secretTimer.actions,
     async generatePassword({ state }, { login, service, costFactor, blockSizeFactor }) {
        const { secret } = state;
        if (secret == null) {
            return;
        }

        return await generatePasswordImplementation({ login, service, secret, costFactor, blockSizeFactor })
    },
    updateSecret: ({ commit, dispatch }, { secret, timeout }) => {
        commit('updateSecret', { secret });
        commit('updateSecretTimer', { timeout });
        dispatch('tickSecret');
    },
    onSecretTimeout: ({ commit }) => {
        commit('resetSecret');
    }
}

const mutations = {
    ...secretTimer.mutations,
    updateSecret: (state, { secret }) => {
        state.secret = secret;
    },
    resetSecret: (state) => {
        state.secret = null;
    }
}

export default { state, getters, actions, mutations };