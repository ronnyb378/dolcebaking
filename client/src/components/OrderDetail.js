import React from 'react'
import { Accordion, Col, Container, Row } from 'react-bootstrap'

export default function OrderDetail(props) {

    const { orderId, cart, cartValues, firstName, email, lastName, createdAt } = props.order
    let dateObj = new Date(createdAt)
    let newDate = dateObj.toString().slice(4, 15)

    return (
        <Accordion>
            <Accordion.Item eventKey={`${props.order.id}`}>
                <Accordion.Header>
                    <Col>{newDate}</Col>
                    <Col>${cartValues.cartTotal}</Col>
                    <Col>{firstName}</Col>
                    <Col>{orderId}</Col>
                </Accordion.Header>
                <Accordion.Body>
                    <Container >
                    <Row>
                        <Col>Customer: {firstName} {lastName}</Col>
                        <Col>Email: {email}</Col></Row><hr />
                    <Row>
                        <Col xs={2}><u>Qty</u></Col>
                        <Col xs={10}><u>Product</u></Col>
                    </Row>
                    {cart.cartItems.map((item) => {
                        return (<Row key={item.id}>
                            <Col xs={2}>{item.count}x</Col>
                            <Col xs={10}>{item.name}</Col></Row>)
                    })}
                    </Container>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}
