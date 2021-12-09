import React, { useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { actionUpdateCartValues } from '../redux/actions/cartValues'
import { actionClearCart } from '../redux/actions/cart'

export default function CartTotal({ value }) {
    const dispatch = useDispatch()
    const cartData = useSelector(state => state)
    // console.log(cartData)
    const { cartValues, cart } = value

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
            // console.log(newDetailObj)
            dispatch(actionUpdateCartValues(newDetailObj))
        }
    }, [cart])

    const handleTotalClick = (e) => {
        e.preventDefault()
        // console.log(cartData)
        fetch('/api/v1/orders/neworder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                value: cartData
            })
        })
        // .then(res => res.json())
        // .then(data => {
        //     console.log(data.order)
        // })
    }


    return (
        <Container className="cart-total ">
            {/* <h6>Cart Total</h6> */}
            <Row >
                <Col >
                    <Link to="/">
                        <Button onClick={() => dispatch(actionClearCart())}>
                            Clear Cart
                        </Button>
                    </Link>
                    <h5>Subtotal: ${cartValues.cartSubTotal} </h5>
                    <h5>Tax: ${cartValues.cartTax}</h5>
                    <h5>Grand Total: ${cartValues.cartTotal}</h5>
                    <Button onClick={(e) => handleTotalClick(e)}>Checkout</Button>
                </Col>
            </Row>
        </Container>
    )
}
