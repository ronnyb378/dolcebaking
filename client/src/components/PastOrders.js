import React from 'react'
import { Card, Col } from 'react-bootstrap'

export default function PastOrders(props) {
    return (
        <Col>
            <Card>
                { console.log(props) }
            </Card>
        </Col>
    )
}
