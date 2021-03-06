import React, { useEffect } from 'react'
import { Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { actionUpdateCartValues } from '../redux/actions/cartValues'
import { actionClearCart } from '../redux/actions/cart'
import { useHistory } from 'react-router'

export default function CartTotal({ value }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const { cartValues: {cartSubTotal, cartTax, cartTotal}, cart } = value

    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });


    useEffect(() => {
        let subTotal = 0;
        cart.cartItems.map(item => (subTotal += item.total))
        const tempTax = subTotal * .0825
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
        <Col className="d-flex new">
            <Link to="/">
                <Button className="clear-cart-btn"onClick={() => dispatch(actionClearCart())}>
                    Clear Cart
                </Button>
            </Link>
            <div className="pt-4 pb-2">
                <h5>Subtotal: <strong>{formatter.format(cartSubTotal)}</strong> </h5>
                <h5>Tax: <strong>{formatter.format(cartTax)}</strong></h5>
                <h5>Grand Total: <strong>{formatter.format(cartTotal)}</strong></h5>
                <Button size="lg" onClick={() => history.push('/cart/checkout')}>Check Out</Button>
            </div>
            <small><b>Note:</b> Customers will have to pick up their orders</small>
        </Col>
    )
}
