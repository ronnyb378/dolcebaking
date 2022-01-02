import React from 'react'
import { Row, Col } from 'react-bootstrap'

export default function EmptyCart() {
    return (
            <Row>
                <Col className="pb-4">
                    <h2>Your Cart Is Currently Empty 😢</h2>
                </Col>
            </Row>
    )
}
