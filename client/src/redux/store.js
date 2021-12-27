import { createStore, combineReducers } from 'redux'
import { items } from './reducers/items'
import { itemDetail } from './reducers/itemDetail'
import { cart } from './reducers/cart'
import { cartValues } from './reducers/cartValues'
import { user } from './reducers/user'
import { status } from './reducers/status'

const rootReducer = combineReducers({
    products: items,
    itemDetail,
    cart,
    cartValues,
    user,
    status,
})

const saveToSessionStorage = (globalState) => {
    try {
        const serializedState = JSON.stringify(globalState);
        sessionStorage.setItem('state', serializedState);
    }
    catch (e) {
        console.log(e)
    }
}

const loadFromSessionStorage = () => {
    const serializedState = sessionStorage.getItem('state');
    if (serializedState == null) {
        return undefined;
    } else {
        return JSON.parse(serializedState);
    }
}

const persistedState = loadFromSessionStorage()

export const store = createStore(
    rootReducer, persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

store.subscribe(() => {
    saveToSessionStorage(store.getState())
})

// export default store