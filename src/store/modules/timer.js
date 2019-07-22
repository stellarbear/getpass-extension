const timer = (prefix) => {
    return {
        state: {
            timeLeft: 0,
            expired: true,
        },
        getters: {
            [`get${prefix}TimeLeft`]: (state) => state.timeLeft,
        },
        actions: {
            [`reset${prefix}Timer`]: ({ commit }) => {
                commit(`reset${prefix}Timer`);
            },
            [`tick${prefix}`]: ({ commit, dispatch, state }) => {
                if (state.timeLeft > 0 && !state.expired) {
                    commit(`update${prefix}Timer`, { timeout: state.timeLeft - 1 });
                    setTimeout(() => {
                        dispatch(`tick${prefix}`);
                    }, 1000);
                }
                else {
                    dispatch(`on${prefix}Timeout`);
                    commit(`reset${prefix}Timer`);
                    // eslint-disable-next-line
                    //console.log(`${prefix} timer expired`);
                }
            }
        },
        mutations: {
            [`update${prefix}Timer`]: (state, { timeout }) => {
                state.expired = false;
                state.timeLeft = timeout;
            },
            [`reset${prefix}Timer`]: (state) => {
                state.expired = true;
                state.timeLeft = 0;
            }
        },
    };
}

export default timer;