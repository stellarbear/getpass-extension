const storage = window.localStorage;

export default {
    get: (key, defaultValue) => {
        let value = storage.getItem(key);

        if (value == null || value == undefined) {
            value = defaultValue;
        }
        else {
            value = JSON.parse(value);
        }

        // eslint-disable-next-line
        //console.log(key, value);

        return value;
    },
    clear: (key) => storage.removeItem(key),
    set(key, value) {
        // eslint-disable-next-line
        //console.log(`${key} is set to ${JSON.stringify(value)}`);

        storage.setItem(key, JSON.stringify(value))
    },
    setAndSave(state, key, value) {
        state[key] = value;
        this.set(key, value);
    }
}

export const storageKey = {
    language: 'language',

    logins: 'logins',
    services: 'services',

    costFactor: 'costFactor',
    blockSizeFactor: 'blockSizeFactor',

    firstBoot: 'firstBoot',
    autoBrightness: 'autoBrightness',

    visualHash: 'visualHash',

    secretTimerDuration: 'secretTimerDuration',
    clipboardTimerDuration: 'clipboardTimerDuration',

    loginVisibility: 'loginVisibility',
    serviceVisibility: 'serviceVisibility',

    brightness: 'brightness',
    accentColor: 'accentColor',
    primaryColor: 'primaryColor',
}