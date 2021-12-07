import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function CartTotal({value}) {
    const {cartValues} = value


    return (
        <Container className="cart-total">
            <h6>Cart Total</h6>
            <Row>
                <Col>
                    <Link to="/">
                        <Button>
                            Clear Cart
                        </Button>
                    </Link>
                    <h6>Subtotal: {cartValues.cartSubTotal}</h6>
                    <h6>Tax: {cartValues.cartTax}</h6>
                    <h6>Grand Total: {cartValues.cartTotal}</h6>
                </Col>
            </Row>
        </Container>
    )
}
