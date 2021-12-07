import React from 'react'
import { useSelector } from 'react-redux'
import CartColumns from "../components/CartColumns"
import EmptyCart from '../components/EmptyCart'
import CartList from '../components/CartList'
import CartTotal from '../components/CartTotal'

export default function Cart() {
    const cart = useSelector(state => state.cart)
    const value = useSelector(state => state)

    return (
        <div>
            <hr />
            <div className="cart-overview">
                {cart.cartItems.length > 0 ? (
                    <React.Fragment>
                        <div className="cart-info">
                            <h2>Your Cart</h2>
                            <CartColumns />
                            <CartList value={value} />
                        </div>
                        <CartTotal value={value}/>
                    </React.Fragment>
                ) : (
                    <EmptyCart />
                )}

            </div>
        </div>
    )
}
