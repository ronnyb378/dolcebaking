import React from 'react'
import { useSelector } from 'react-redux';
import SingleAlert from './SingleAlert';

export default function Alerts() {
    const status = useSelector(state => state.status)

    let errors = []

    if (status.error) {
        errors.push({msg: status.error})
    }

    return (
        <div>
            {errors.map((error, index) => {
                return <SingleAlert key={index} message={error.msg} />
            })}
        </div>
    )
}
