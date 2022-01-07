import React from 'react'
import { useSelector } from 'react-redux'
import { Route, useHistory } from 'react-router-dom'

export default function ProtectedAdminRoute(props) {
    const { checked, user } = useSelector(state => state.user)
    const history = useHistory()

    if (!checked) {
        console.log('checking....')
        return 'Loading...'
    }

    if (!user) {
        history.push('/login')
    } else if (!user.email.includes('guest@apple.com')) {
        history.push('/')
        // dispatch(actionSetError({error: 'Please log in'}))
    }

    return <Route {...props} />
}
