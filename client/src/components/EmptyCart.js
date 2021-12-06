import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export default function EmptyCart() {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Your Cart Is Obviously Empty</h2>
                </Col>
            </Row>
        </Container>
    )
}
