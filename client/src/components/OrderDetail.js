import React from 'react'
import { Accordion, Col, Container, Row, Form } from 'react-bootstrap'

export default function OrderDetail(props) {

    const { completed, orderId, cart, cartValues, firstName, email, lastName, createdAt } = props.order

    let dateObj = new Date(createdAt)
    let newDate = dateObj.toString().slice(4, 15)

    const handleChange = (e) => {
        console.log(e.target.id)
    }

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
                        <div onChange={(e) => handleChange(e)}>
                            <Form.Check
                                type={'checkbox'}
                                id={`${orderId}`}
                                label={`default checkbox`}
                                defaultChecked={completed}
                            />
                        </div>
                    </Container>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}
