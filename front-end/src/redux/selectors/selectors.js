export const isLogin = (state) => !!state.token
export const errorRequest = (state) => state.error
export const isAdmin = (state) => !!(state.currentUser.role === "admin")
