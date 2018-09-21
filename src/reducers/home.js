const home = ( state = {
    isLoading: true,
    isFetching: true,
    error: null,
    data: []
}, { type, payload = {} }) => {
    switch (type) {
        case 'FETCH_SOME':
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case 'FETCH_SOME_SUCCESS':
        case 'FETCH_SOME_ERROR':
            return {
                ...state,
                ...payload
            }
        default: 
            return state
    }
}

export default { home }
