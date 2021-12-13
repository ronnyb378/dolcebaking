import React, { useEffect } from 'react'
import { Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { actionUpdateCartValues } from '../redux/actions/cartValues'
import { actionClearCart } from '../redux/actions/cart'
import { useHistory } from 'react-router'

export default function CartTotal({ value }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const cartData = useSelector(state => state)
    // console.log(cartData)
    const { cartValues, cart } = value


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
        <Col className="d-flex new">
            <Link to="/">
                <Button className="clear-cart-btn"onClick={() => dispatch(actionClearCart())}>
                    Clear Cart
                </Button>
            </Link>
            <div className="pt-4">
                <h5>Subtotal: <strong>${cartValues.cartSubTotal}</strong> </h5>
                <h5>Tax: <strong>${cartValues.cartTax}</strong></h5>
                <h5>Grand Total: <strong>${cartValues.cartTotal}</strong></h5>
                {/* <Button onClick={(e) => handleTotalClick(e)}>Checkout</Button> */}
                <Button onClick={() => history.push('/cart/checkout')}>Checkout</Button>
            </div>
        </Col>
    )
}
