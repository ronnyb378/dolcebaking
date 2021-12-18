import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, useHistory } from 'react-router-dom'
import {actionSetError} from '../redux/actions/status'

export default function ProtectedRoute(props) {
    const { checked, user } = useSelector(state => state.user)
    const history = useHistory()
    const dispatch = useDispatch()

    if (!checked) {
        console.log('checking....')
        return 'Loading...'
    }

    if (!user) {
        history.push('/login')
        dispatch(actionSetError({error: 'Please log in'}))
    }
    return <Route {...props} />
}
