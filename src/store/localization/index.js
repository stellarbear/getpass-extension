import rus from './rus';
import eng from './eng';
import i18n from './i18n';
import locales from './locales';

const messages = {
    eng,
    rus
}

const getLanguageMeta = (code) => {
    switch (code) {
        case locales.rus:
            return { name: 'Русский', assetPath: 'rus.png' };

        case locales.eng:
        default:
            return { name: 'English', assetPath: 'eng.png' };
    }
}

export { i18n, locales, messages, getLanguageMeta };