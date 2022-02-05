import React from 'react'
import { Col, Image, Row, Button, ButtonGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { actionDecrementItem, actionRemoveItem, actionUpdateCart } from '../redux/actions/cart';
import trash from '../images/trash_icon.png'

export default function CartItem({ item }) {
    const dispatch = useDispatch()
    const { name, image, price, total, count } = item;

    const decrement = product => {
        if (count === 1) {
            return
        } else {
            const selectedItem = { ...product }
            dispatch(actionDecrementItem(selectedItem))
        }
    }


    const increment = product => {
        let selectedItem = { ...product }
        let count = selectedItem.count + 1
        selectedItem.total = selectedItem.price * count
        dispatch(actionUpdateCart(selectedItem))
    }

    const styles = {
        img: { width: "6rem", height: "6rem" }
    };


    return (
        <Row className="pb-2 cart-items align-items-center">
            <Col md={2}>
                <Image src={image} alt={`${name}`} style={styles.img} fluid />
            </Col>
            <Col md={2}>
                {name}
            </Col>
            <Col md={2}>
                ${price}
            </Col>
            <Col className="increment-column" md={2}>
                <ButtonGroup >
                    <Button onClick={() => decrement(item)}>-</Button>
                    <Button className="cart-count">{count}</Button>
                    <Button onClick={() => increment(item)}>+</Button>
                </ButtonGroup>
            </Col>
            <Col md={2}>
                <img src={trash} alt="remove item" className="trash-image" onClick={() => dispatch(actionRemoveItem(item))} />
            </Col>
            <Col md={2}>
                ${total}
            </Col>
        </Row>
    )
}
