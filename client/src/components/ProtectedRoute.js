import React from 'react'
import { useSelector } from 'react-redux'
import { Route, useHistory } from 'react-router-dom'

export default function ProtectedRoute(props) {
    const { checked, user } = useSelector(state => state.user)
    const history = useHistory()

    if (!checked) {
        console.log('checking....')
        return 'Loading...'
    }

    if (!user) {
        history.push('/login')
    }
    return <Route {...props} />
}
