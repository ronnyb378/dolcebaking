export function cartTax(state=0, action) {
    switch (action.type) {
        case "UPDATE_TAX":
            return action.num
        default: 
            return state
    }
}