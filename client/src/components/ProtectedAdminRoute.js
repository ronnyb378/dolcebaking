import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

export default function ProtectedAdminRoute({component: Component, ...restOfProps }) {
    const { checked, user } = useSelector(state => state.user)

    if (!checked) {
        return 'Loading...'
    }


    if (user) {
    return (
        <Route {...restOfProps}>
            { !user.email.includes('guest@apple.com') ? <Redirect to="/" /> : <Component />}
        </Route>
    )
    } else {
        return (<Redirect to="/login" />)
    }
}
