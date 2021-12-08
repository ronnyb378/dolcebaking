import React from 'react'
import { Col, Image, Row, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { actionDecrementItem, actionRemoveItem, actionUpdateCart } from '../redux/actions/cart';

export default function CartItem({item, value}) {
    const dispatch = useDispatch()
    const { id, name, image, price, total, count } = item;

    const decrement = id => {
        let tempCart = [...value.cart.cartItems];
        const selectedItem = tempCart.find(item => item.id === id)
        let count = selectedItem.count - 1
        console.log(count)
        if (count === 0) {
            return
        } else {
            dispatch(actionDecrementItem(selectedItem))
        }
    }


    const increment = id => {
        let tempCart = [...value.cart.cartItems]
        const selectedItem = tempCart.find(item => item.id === id)
        let count = selectedItem.count + 1
        selectedItem.total = selectedItem.price * count
        dispatch(actionUpdateCart(selectedItem))
    }



    return (
        <Row>
            <Col>
                <Image src={image} style={{ maxHeight: "100%"}}fluid/>
            </Col>
            <Col>
                {name}
            </Col>
            <Col>
                ${price}
            </Col>
            <Col>
            <Button onClick={() => decrement(id)}>-</Button>
                {count}
            <Button onClick={() => increment(id)}>+</Button>
            </Col>
            <Col>
                <Button onClick={() => dispatch(actionRemoveItem(item))}>X</Button>
            </Col>
            <Col>
                {total}
            </Col>
        </Row>
    )
}
