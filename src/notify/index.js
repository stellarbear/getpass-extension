export default (handle, message) => {
    handle.$store.dispatch('callNotifyMessage', message);
}