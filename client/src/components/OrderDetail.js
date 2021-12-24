import React from 'react'
import { Accordion } from 'react-bootstrap'

export default function OrderDetail(props) {
    const { id, orderId, cart, cartValues, firstName, email, createdAt } = props.order
    return (
        <Accordion>
            <Accordion.Item eventKey={`${props.order.id}`}>
                <Accordion.Header>
                        {createdAt} {cartValues.cartTotal} {firstName} {orderId}
                </Accordion.Header>
                    <Accordion.Body>
                        hi
                    </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}
