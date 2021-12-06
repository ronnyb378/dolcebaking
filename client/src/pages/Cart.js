import React from 'react'
import { useSelector } from 'react-redux'
import CartItem from '../components/CartItem'
import CartColumns from "../components/CartColumns"
import EmptyCart from '../components/EmptyCart'

export default function Cart() {
    const cart = useSelector(state => state.cart)
    console.log(cart)

    return (
        <div>
            <hr />
            <div className="cart-overview">
                <div className="cart-info">
                    { cart.cartItems.length > 0 ? (
                        <React.Fragment>
                            <h2>Your Cart</h2>
                            <CartColumns />
                        </React.Fragment>
                    ) : (
                        <EmptyCart />
                    )}
                </div>
                <div className="cart-total">Cart Summary</div>
            </div>
        </div>
    )
}
