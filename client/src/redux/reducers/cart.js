import { handleAddToCart } from "./cart.utils"

export function cart(state={cartItems: []}, action) {
    switch (action.type) {
        case "ADD_ITEMS":
            // return [ ...state, action.item ]
            return {
                ...state,
                cartItems: handleAddToCart({prevCartItems: state.cartItems,
                nextCartItem: action.item
                })
            };       
        default:
            return state
    }
}