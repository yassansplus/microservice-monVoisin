module.exports = {
    state: () => ({user: undefined,}),
    mutations: {
        setUser(state, user) {
            state.user = user
        }
    }
}
