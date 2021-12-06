import { createStore, combineReducers } from 'redux'
import { items } from './reducers/items'
import { itemDetail } from './reducers/itemDetail'
import { cart } from './reducers/cart'
import { cartSubTotal } from './reducers/cartSubTotal'
import { cartTax } from './reducers/cartTax'
import { cartTotal } from './reducers/cartTotal'

const rootReducer = combineReducers({
    products: items,
    itemDetail,
    cart,
    cartSubTotal,
    cartTax,
    cartTotal,
})

export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

// export default store