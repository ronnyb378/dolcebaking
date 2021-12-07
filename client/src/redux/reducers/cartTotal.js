export function cartTotal(state=0, action) {
    switch (action.type) {
        case "UPDATE_TOTAL":
            return action.num
        default: 
            return state
    }
}