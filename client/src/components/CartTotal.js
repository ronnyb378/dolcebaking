import React, { useEffect} from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { actionUpdateCartValues } from '../redux/actions/cartValues'
import { actionClearCart } from '../redux/actions/cart'

export default function CartTotal({value}) {
    const dispatch = useDispatch()
    const {cartValues, cart} = value

    const addTotals = () => {
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
        return totalsObj
    }

    useEffect(() => {
        if (cart) {
            const newDetailObj = addTotals();
            console.log(newDetailObj)
            dispatch(actionUpdateCartValues(newDetailObj))
        }
    }, [cart])


    return (
        <Container className="cart-total">
            <h2>Cart Total</h2>
            <Row>
                <Col>
                    <Link to="/">
                        <Button onClick={() => dispatch(actionClearCart())}>
                            Clear Cart
                        </Button>
                    </Link>
                    <h2>Subtotal: ${cartValues.cartSubTotal}</h2>
                    <h2>Tax: ${cartValues.cartTax}</h2>
                    <h2>Grand Total: ${cartValues.cartTotal}</h2>
                </Col>
            </Row>
        </Container>
    )
}
