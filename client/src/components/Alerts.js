import React from 'react'
import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux';

export default function Alerts() {
    const status = useSelector(state => state.status)
    let warnings = [];

    if (status.error) {
        warnings.push(status.error)
    }

    return (
        <div>
            <Alert variant={warning}>
                
            </Alert>
        </div>
    )
}
