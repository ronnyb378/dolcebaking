import React, { useEffect} from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { actionUpdateCartValues } from '../redux/actions/cartValues'
import { actionClearCart } from '../redux/actions/cart'

export default function CartTotal({value}) {
    const dispatch = useDispatch()
    const {cartValues, cart} = value


    useEffect(() => {

        let subTotal = 0;
        cart.cartItems.map(item => (subTotal += item.total))
        const tempTax = subTotal * .0625
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax
        let totalsObj = {
            cartSubTotal: subTotal,
            cartTax: tax,
            cartTotal: total
        }
        dispatch(actionUpdateCartValues(totalsObj))

    }, [cart.cartItems, dispatch])


    return (
        <Container className="cart-total ">
            <Row >
                <Col >
                    <Link to="/">
                        <Button onClick={() => dispatch(actionClearCart())}>
                            Clear Cart
                        </Button>
                    </Link>
                    <h5>Subtotal: ${cartValues.cartSubTotal}</h5>
                    <h5>Tax: ${cartValues.cartTax}</h5>
                    <h5>Grand Total: ${cartValues.cartTotal}</h5>
                    <Button>Checkout</Button>
                </Col>
            </Row>
        </Container>
    )
}
