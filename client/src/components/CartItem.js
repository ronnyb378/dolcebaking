import React, { useEffect } from 'react'
import { Col, Image, Row, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { actionRemoveItem, actionUpdateCart } from '../redux/actions/cart';
import { actionUpdateCartValues } from '../redux/actions/cartValues';

export default function CartItem({item, value}) {
    const dispatch = useDispatch()
    const { id, name, image, price, total, count } = item;


    const handleAddToCart = id => {
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
            <Button>-</Button>
                {count}
            <Button onClick={() => handleAddToCart(id)}>+</Button>
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
