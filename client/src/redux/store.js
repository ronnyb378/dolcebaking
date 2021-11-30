import { createStore } from 'redux'
import { items } from './reducers/items'

export const store = createStore(items)

// export default store