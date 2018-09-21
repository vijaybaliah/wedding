import { fetch } from '../api'
// import { isEmpty } from 'lodash'

export const home = store => next => action => {
    const result = next(action)
    const { type, payload } = action
    // const state = store.getState()

    // const loginRedirect = (token, path) => {
    //     if (token.length === 0) { return null }

    //     setCookie('authToken', token, 1)
    //     store.dispatch(push(path))        
    // }

    switch( type ) {
        case 'CREATE_USER_ACCOUNT':
            // TODO: duplicate user error
            fetch('/dashboard/signup', 'POST', { data: payload })
            .then((res) => {
                store.dispatch({ type: type + '_SUCCESS', payload: { ...res, isLoading: false } })
            }, error => {
                // store.dispatch({ type: type + '_ERROR', payload: { error } })
            })
            .catch((error) => {
                // store.dispatch({ type: type + '_ERROR', payload: { error } })
            })
        break
        default:
           return result; 
    }
}
