export function cartSubTotal(state=0, action) {
    switch (action.type) {
        case "UPDATE_SUBTOTAL":
            return action.num
        default: 
            return state
    }
}