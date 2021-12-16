export function user(state = {
    status: false,
    user: null
}, action) {
    switch(action.type) {
        case 'LOGGED_IN':
            return {
                checked: true,
                user: action.user
            }
        case 'LOGGED_OUT':
            return {
                checked: true,
                user: null
            }
        default:
            return state
    }
}