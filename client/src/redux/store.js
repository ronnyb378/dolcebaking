import { createStore, combineReducers } from 'redux'
import { items } from './reducers/items'
import { itemDetail } from './reducers/itemDetail'
import { cart } from './reducers/cart'
import { cartValues } from './reducers/cartValues'

const rootReducer = combineReducers({
    products: items,
    itemDetail,
    cart,
    cartValues,
})

export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

// export default store