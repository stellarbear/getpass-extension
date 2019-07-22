import storage, { storageKey } from './storage';

class Service {
    constructor({
        value,
        counter,
        length,
        lower,
        upper,
        number,
        special }) {
        this.value = value;
        this.counter = counter;
        this.length = length;
        this.lower = lower;
        this.upper = upper;
        this.number = number;
        this.special = special;
    }
}

const state = {
    services: storage.get(storageKey.services, []),
    selectedService: null,
}

const getters = {
    getSelectedService: (state) => state.selectedService,
    getServices: (state) => state.services.filter(service => service.hasOwnProperty('value')).sort((a, b) => a.value.localeCompare(b.value)),
}

const actions = {

}

const mutations = {
    resetServices: (state) =>
        storage.setAndSave(state, storageKey.services, []),
    addService: (state, { value,
        counter,
        length,
        lower,
        upper,
        number,
        special }) =>
        storage.setAndSave(state, storageKey.services, [...state.services, new Service({
            value,
            counter,
            length,
            lower,
            upper,
            number,
            special
        })].reduce((acc, x) =>
            acc.concat(acc.find(y => y.value === x.value) ? [] : [x])
            , [])),
    removeService: (state, item) =>
        storage.setAndSave(state, storageKey.services, state.services.filter(service => service.value != item.value)),
    selectService: (state, value) =>
        state.selectedService = value
}

export default { state, getters, actions, mutations };