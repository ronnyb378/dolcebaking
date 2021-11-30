// const defaultState = {
//     item: item
// }

export function itemDetail(state = {}, action ) {
    switch (action.type) {
        case "ITEM_DETAIL":
            return action.item
        default:
            return state
    }
}