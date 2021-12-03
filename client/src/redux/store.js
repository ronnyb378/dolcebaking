import { createStore, combineReducers } from 'redux'
import { items } from './reducers/items'
import { itemDetail } from './reducers/itemDetail'
import { cart } from './reducers/cart'


const rootReducer = combineReducers({
    products: items,
    itemDetail,
    cart,
})

export const store = createStore(rootReducer)

// export default store