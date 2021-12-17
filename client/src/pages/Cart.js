import React from 'react'
import { useSelector } from 'react-redux'
import CartColumns from "../components/CartColumns"
import EmptyCart from '../components/EmptyCart'
import CartList from '../components/CartList'
import CartTotal from '../components/CartTotal'
import { Container, Row, Col } from 'react-bootstrap'

export default function Cart() {
    const cart = useSelector(state => state.cart)
    const value = useSelector(state => state)

    return (
        <div>
            <Container fluid className="cart-parent pb-4">
                {cart.cartItems.length > 0 ? (
                    <React.Fragment>
                        <h2 className="py-4">Your Cart</h2>
                        <Row>
                            <Col>
                                <CartColumns />
                                <CartList value={value} />
                            </Col>
                            <Col lg={2} md={2}>
                                <CartTotal value={value} />
                            </Col>
                        </Row>
                    </React.Fragment>
                ) : (
                    <EmptyCart />
                )}

            </Container>
        </div>
    )
}
