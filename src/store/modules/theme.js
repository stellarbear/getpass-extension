import storage, { storageKey } from './storage';
import colors from 'vuetify/es5/util/colors'

class ColorTheme {
    static autoBrightnessDefault = false;
    static primaryColorDefault = colors.indigo.lighten1;
    static accentColorDefault = colors.orange.darken1;
    static brightnessDefault = 1;
}

const state = {
    autoBrightness: storage.get(storageKey.autoBrightness, ColorTheme.autoBrightnessDefault),
    primaryColor: storage.get(storageKey.primaryColor, ColorTheme.primaryColorDefault),
    accentColor: storage.get(storageKey.accentColor, ColorTheme.accentColorDefault),
    brightness: storage.get(storageKey.brightness, ColorTheme.brightnessDefault)
}

const getters = {
    getTheme: (state) => ({
        ...state
    }),
    getAutoBrightness: (state) => state.autoBrightness,
    getPrimaryColor: (state) => state.primaryColor,
    getAccentColor: (state) => state.accentColor,
    getBrightness: (state) => state.brightness,
}

const actions = {
    resetColorTheme({ commit }) {
        commit('setAutoBrightness', ColorTheme.autoBrightnessDefault);
        commit('setPrimaryColor', ColorTheme.primaryColorDefault);
        commit('setAccentColor', ColorTheme.accentColorDefault);
        commit('setBrightness', ColorTheme.brightnessDefault);
    }
}

const mutations = {
    setTheme: (state, value) => {
        for (let key in value) {
            storage.setAndSave(state, storageKey[key], value[key]);
        }
    },

    setAutoBrightness: (state, value) => storage.setAndSave(state, storageKey.autoBrightness, value),
    setPrimaryColor: (state, value) =>
        storage.setAndSave(state, storageKey.primaryColor, value),
    setAccentColor: (state, value) =>
        storage.setAndSave(state, storageKey.accentColor, value),
    setBrightness: (state, value) =>
        storage.setAndSave(state, storageKey.brightness, value),
}

export default { state, getters, actions, mutations };