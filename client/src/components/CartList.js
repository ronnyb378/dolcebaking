import React from 'react'
import { Container } from 'react-bootstrap';
import CartItem from './CartItem'

export default function CartList({value}) {
    const { cart } = value;

    return (
        <Container fluid>
            {cart.cartItems.map((item) => {
            return <CartItem key={item.id} item={item}/>

            })}
        </Container>
    )
}
