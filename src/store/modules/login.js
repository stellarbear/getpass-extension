import storage, { storageKey } from './storage';

class Login {
    constructor(value) {
        this.value = value;
    }
}

const state = {
    logins: storage.get(storageKey.logins, []),
    selectedLogin: null,
}

const getters = {
    getSelectedLogin: (state) => state.selectedLogin,
    getLogins: (state) => state.logins.filter(login => login.hasOwnProperty('value')).sort((a, b) => a.value.localeCompare(b.value)),
}

const actions = {

}

const mutations = {
    resetLogins: (state) =>
        storage.setAndSave(state, storageKey.logins, []),
    addLogin: (state, { value }) =>
        storage.setAndSave(state, storageKey.logins, [...state.logins, new Login(value)].reduce((acc, x) =>
            acc.concat(acc.find(y => y.value === x.value) ? [] : [x])
            , [])),
    removeLogin: (state, item) =>
        storage.setAndSave(state, storageKey.logins, state.logins.filter(login => login.value != item.value)),
    selectLogin: (state, value) =>
        state.selectedLogin = value
}

export default { state, getters, actions, mutations };