import React from 'react'
import { Row, Col } from 'react-bootstrap'

export default function EmptyCart() {
    return (
            <Row className="py-4">
                <Col>
                    <h2>Your Cart Is Currently Empty 😢</h2>
                </Col>
            </Row>
    )
}
