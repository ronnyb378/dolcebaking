import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { actionClearAlerts } from '../redux/actions/status'

export default function SingleAlert(props) {
    const dispatch = useDispatch()
    const [show, setShow] = useState(true)

    const { color, message } = props

    const styles = {
        alert: {backgroundColor: `${color}`, borderColor: `${color}`, color: "black"}
    }

    const close = () => {
        setShow(false); dispatch(actionClearAlerts()) 
    }

    return (
    show && <Alert onClick={() => close()} style={styles.alert} dismissible>
                {message}
            </Alert>
    )
}
