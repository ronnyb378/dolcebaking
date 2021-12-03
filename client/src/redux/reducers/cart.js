export function cart(state=[], action) {
    switch (action.type) {
        case "ADD_ITEMS":
            return [ ...state, action.item ]
        default:
            return state
    }
}