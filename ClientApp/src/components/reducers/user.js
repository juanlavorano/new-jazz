export const userReducer = (state='', action) => {
    switch (action.type) {
        case 'REQUEST_TOKEN':
            return {
                ...state,
                spotifyToken: action.payload.token
            }   
        case 'USER_LOGIN':
            return {
                ...state,
                currentUser: action.payload.user,      
            }
        case 'USER_LOGOUT':
            return {
                ...state,
                currentUser: '',      
            }
        default: return state
    }
}