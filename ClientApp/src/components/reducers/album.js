export const setMainAlbum = (state='', action) => {
    switch (action.type) {
        case 'SET_MAIN_ALBUM':
            return {
                ...state,
                mainAlbum: action.payload.album
            }
        default: return state
    }
}