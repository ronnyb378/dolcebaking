import React from 'react'
import { useSelector } from 'react-redux';
import SingleAlert from './SingleAlert';

export default function Alerts() {
    const status = useSelector(state => state.status)

    let errors = []
    let successes = []

    if (status.error) {
        errors.push({msg: status.error})
    }

    if (status.success) {
        successes.push({msg: status.success})
    }

    return (
        <React.Fragment>
            {errors.map((error, index) => {
                return <SingleAlert variant={"warning"} key={index} message={error.msg} fluid />
            })}
            {successes.map((success, index) => {
                return <SingleAlert variant={"info"} key={index} message={success.msg} fluid />
            })}
        </React.Fragment>
    )
}
