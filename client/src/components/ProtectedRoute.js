import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect} from 'react-router-dom'

export default function ProtectedRoute({component: Component, ...restOfProps }) {
    const { checked, user } = useSelector(state => state.user)
    const { cartItems } = useSelector( state => state.cart)

    if (!checked) {
        return 'Loading...'
    }

    if (user) {
        return (
            <Route {...restOfProps}>
                {cartItems.length < 1 ? <Redirect to="/" /> : <Component />}
            </Route>
        )
    } else {
        return (<Redirect to="/login" />)
    }
}
