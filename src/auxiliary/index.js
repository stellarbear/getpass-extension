import { base } from "./base";
import { scrypt, bytesToHex } from "./scrypt";
import { alphabet, verify } from "./alphabet";
import { sha256 } from 'js-sha256';

const obscure = (input, count) => {
    if (count == 0) {
        return input;
    }

    let scopedCount = count > input.length ? input.length : count;
    let padding = "*".repeat(input.length - scopedCount);
    return `${input.substring(0, scopedCount)}${padding}`;
}

const copyToClipboard = (text) => {
    var copyFrom = document.createElement("textarea");
    var copyTo = document.getElementById("clipboard");
    copyFrom.textContent = text;

    copyTo.appendChild(copyFrom);

    copyFrom.select();
    document.execCommand('copy');

    copyTo.removeChild(copyFrom);
}

const sha = (input) => {
    return sha256(input);
}

const shaCycle = (input) => {
    let hash = 'getpass';
    for (let i = 0; i < input.length; i++) {
        let entry = input[i];
        hash = sha(`${hash}${entry}`);
    }
    return hash;
}

//const xor = (input, base) => {
//  ??
//}

const generatePasswordImplementation = async ({ login, service, secret, costFactor, blockSizeFactor }) => {
    let length = service.length;
    let lower = service.lower;
    let upper = service.upper;
    let number = service.number;
    let special = service.special;
    let counter = service.counter;

    login = login.value;
    service = `${service.value}${counter}`;

    let N = 1 << costFactor, r = blockSizeFactor, p = 1;

    let currentAlphabet = alphabet({
        lower: lower,
        upper: upper,
        number: number,
        special: special,
    });

    let password = shaCycle([secret, login, service]);
    let salt = shaCycle([login, service, secret]);

    let hash = bytesToHex(await scrypt(password, salt, N, r, p, length));

    let result = hash;
    do {
        result = base({
            input: sha(result),
            alphabet: currentAlphabet,
        }).slice(0, length);
    } while ((length >= 8) &&
        (!verify({
            lower: lower,
            upper: upper,
            number: number,
            special: special,
            input: result
        })));

    return result;
}

export { copyToClipboard, obscure, generatePasswordImplementation };