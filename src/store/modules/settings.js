import storage, { storageKey } from './storage';

class Settings {
    static firstBootDefault = true;
    static visualHashDefault = true;

    static loginVisibilityDefault = 8;
    static serviceVisibilityDefault = 8;
    static secretTimerDurationDefault = 15;
    static clipboardTimerDurationDefault = 60;

    static costFactorDefault = 12;
    static blockSizeFactorDefault = 4;
}

const state = {
    firstBoot: storage.get(storageKey.firstBoot, Settings.firstBootDefault),
    visualHash: storage.get(storageKey.visualHash, Settings.visualHashDefault),

    loginVisibility: storage.get(storageKey.loginVisibility, Settings.loginVisibilityDefault),
    serviceVisibility: storage.get(storageKey.serviceVisibility, Settings.serviceVisibilityDefault),
    secretTimerDuration: storage.get(storageKey.secretTimerDuration, Settings.secretTimerDurationDefault),
    clipboardTimerDuration: storage.get(storageKey.clipboardTimerDuration, Settings.clipboardTimerDurationDefault),

    costFactor: storage.get(storageKey.costFactor, Settings.costFactorDefault),
    blockSizeFactor: storage.get(storageKey.blockSizeFactor, Settings.blockSizeFactorDefault),
}

const getters = {
    getSettings: (state) => ({
        ...state
    }),

    getFirstBoot: (state) => state.firstBoot,
    getVisualHash: (state) => state.visualHash,

    getLoginVisibility: (state) => state.loginVisibility,
    getServiceVisibility: (state) => state.serviceVisibility,
    getSecretTimerDuration: (state) => state.secretTimerDuration,
    getClipboardTimerDuration: (state) => state.clipboardTimerDuration,

    getCostFactor: (state) => state.costFactor,
    getBlockSizeFactor: (state) => state.blockSizeFactor,
}

const actions = {
    resetSettings({ commit }) {
        commit('setFirstBoot', Settings.firstBootDefault);
        commit('setVisualHash', Settings.visualHashDefault);

        commit('setLoginVisibility', Settings.loginVisibilityDefault);
        commit('setServiceVisibility', Settings.serviceVisibilityDefault);
        commit('setSecretTimerDuration', Settings.secretTimerDurationDefault);
        commit('setClipboardTimerDuration', Settings.clipboardTimerDurationDefault);

        commit('setCostFactor', Settings.costFactorDefault);
        commit('setBlockSizeFactor', Settings.blockSizeFactorDefault);
    }
}

const mutations = {
    setSettings: (state, value) => {
        for (let key in value) {
            storage.setAndSave(state, storageKey[key], value[key]);
        }
    },

    setFirstBoot: (state, value) => storage.setAndSave(state, storageKey.firstBoot, value),
    setVisualHash: (state, value) => storage.setAndSave(state, storageKey.visualHash, value),

    setLoginVisibility: (state, value) => storage.setAndSave(state, storageKey.loginVisibility, value),
    setServiceVisibility: (state, value) => storage.setAndSave(state, storageKey.serviceVisibility, value),
    setSecretTimerDuration: (state, value) => storage.setAndSave(state, storageKey.secretTimerDuration, value),
    setClipboardTimerDuration: (state, value) => storage.setAndSave(state, storageKey.clipboardTimerDuration, value),

    setCostFactor: (state, value) => storage.setAndSave(state, storageKey.costFactor, value),
    setBlockSizeFactor: (state, value) => storage.setAndSave(state, storageKey.blockSizeFactor, value),
}

export default { state, getters, actions, mutations };