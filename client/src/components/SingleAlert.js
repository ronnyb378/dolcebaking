import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { actionClearAlerts } from '../redux/actions/status'

export default function SingleAlert(props) {
    const dispatch = useDispatch()
    const [show, setShow] = useState(true)


    if (show) {
    return (
        <Alert onClick={() => { setShow(false); dispatch(actionClearAlerts()) }} variant={props.variant} dismissible>
            {props.message}
        </Alert>
    )
    } else { return null }
}
