export const requestToken = (token) => {
    return {
        type: 'REQUEST_TOKEN',
        payload: {
            token
        }
        }
}

export const logUserIn = (user) => {
    return {
        type: 'USER_LOGIN',
        payload: {
            user
        }
    }
}

export const logUserOut = () => {
    return {
        type: 'USER_LOGOUT'
    }
}