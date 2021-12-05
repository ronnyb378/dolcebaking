import React from 'react'
import CartItem from '../components/CartItem'

export default function Cart() {
    return (
        <div>
            <hr />
            <div className="cart-overview">
                <div className="cart-info"  >
                    <h2>Your Cart</h2>
                    {/* <div>Cart Info</div> */}
                    <CartItem />
                    <CartItem />
                    <CartItem />
                </div>
                <div className="cart-total">Cart Summary</div>
            </div>
        </div>
    )
}
