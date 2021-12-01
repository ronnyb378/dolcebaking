import { menuItems } from '../../menuItems'

// const defaultState = {
//     products: menuItems
// }

export function items(state=menuItems, action) {
    switch (action.type) {
        case "MODIFY_ITEMS":
            return action.items
        default:
            return state
    }
}