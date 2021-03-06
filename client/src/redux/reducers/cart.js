import { handleAddToCart, handleDecrement } from "./cart.utils"

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
        case "CLEAR_CART":
            return {
                cartItems: []
            }
        case "REMOVE_ITEM":
            return {
                cartItems: state.cartItems.filter(item => item.id !== action.item.id)
            }  
        case "DECREMENT_ITEM"  :
            return {
                ...state,
                cartItems: handleDecrement({prevCartItems: state.cartItems,
                nextCartItem: action.item
                })
            }   
        default:
            return state
    }
}