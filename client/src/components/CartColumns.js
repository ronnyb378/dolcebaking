import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export default function CartColumns() {

    return (
        <Container fluid className="text-center">
            <Row>
                <Col>
                    <p>Items</p>
                </Col>
                <Col>
                    <p>Name of Item</p>
                </Col>
                <Col>
                    <p>Price</p>
                </Col>
                <Col>
                    <p>Quantity</p>
                </Col>
                <Col>
                    <p>Remove</p>
                </Col>
                <Col>
                    <p>Total</p>
                </Col>
            </Row>
        </Container>
            
    )
}
