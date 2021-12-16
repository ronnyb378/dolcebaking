export function status(state = {}, action) {
    switch (action.type) {
        case 'SET_ERROR':
            return action.text
        default:
            return state
    }
}