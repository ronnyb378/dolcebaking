export function orders(state=[], action) {
    switch (action.type) {
        case 'SET_ORDERS':
            return action.items
        default:
            return state
    }
}