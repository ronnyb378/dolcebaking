import { createStore, combineReducers } from 'redux'
import { items } from './reducers/items'
import { itemDetail } from './reducers/itemDetail'


const rootReducer = combineReducers({
    products: items,
    itemDetail,
})

export const store = createStore(rootReducer)

// export default store