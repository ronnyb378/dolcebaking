import React from 'react'
import { Col, Image, Row, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { actionDecrementItem, actionRemoveItem, actionUpdateCart } from '../redux/actions/cart';
import trash from '../images/trash_icon.png'

export default function CartItem({item, value}) {
    const dispatch = useDispatch()
    const { id, name, image, price, total, count } = item;

    const decrement = id => {
        if (count === 1) {
            return
        } else {
            let tempCart = [...value.cart.cartItems];
            const selectedItem = tempCart.find(item => item.id === id)
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
        <Row className="pb-2 cart-items align-items-center">
            <Col className="col-10 mx-auto col-md-2">
                <Image src={image} alt={`${name}`} style={{ width: "6rem", height: "6rem"}} fluid/>
            </Col>
            <Col className="col-10 mx-auto col-md-2">
                {name}
            </Col>
            <Col className="col-10 mx-auto col-md-2">
                ${price}
            </Col>
            <Col className="col-10 mx-auto col-md-2 together">
            <Button onClick={() => decrement(id)}>-</Button>
            <Button className="cart-count">{count}</Button>
            <Button onClick={() => increment(id)}>+</Button>
            </Col>
            <Col className="col-10 mx-auto col-md-2">
                <img src={trash} alt="remove item" className="trash-image" onClick={() => dispatch(actionRemoveItem(item))} />
            </Col>
            <Col className="col-10 mx-auto col-md-2">
                ${total}
            </Col>
        </Row>
    )
}
