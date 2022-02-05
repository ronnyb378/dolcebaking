import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export default function CartColumns() {

    return (
        <Container fluid className="text-center d-none d-md-block cart-columns">
            <Row>
                <Col>
                    <p>Items</p>
                </Col>
                <Col md={2}>
                    <p>Name</p>
                </Col>
                <Col md={2}>
                    <p>Price</p>
                </Col>
                <Col md={2}>
                    <p>Quantity</p>
                </Col>
                <Col md={2}>
                    <p>Remove</p>
                </Col>
                <Col md={2}>
                    <p>Total</p>
                </Col>
            </Row>
        </Container>
            
    )
}
