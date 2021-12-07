export function cartValues(state={}, action) {
    switch (action.type) {
        case "UPDATE_CART_VALUES":
            return action.item
        default:
            return state
    }
}