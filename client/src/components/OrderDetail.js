import React, { useState } from 'react'
import { Accordion, Col, Container, Row, Form, Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { actionSetOrders } from '../redux/actions/orders'

export default function OrderDetail(props) {
    const dispatch = useDispatch()
    const orderList = useSelector(state => state.orders)
    const selectedOrder = orderList.find((order) => {
        return order.orderId === props.id
    })

    const { completed, orderId, cart, cartValues, firstName, email, lastName, createdAt, phoneNumber } = selectedOrder

    const [ checked, setChecked ] = useState(completed)

    let dateObj = new Date(createdAt)
    let newDate = dateObj.toString().slice(4, 15)

    const handleChange = (e) => {
        setChecked(!checked)
        fetch('/api/v1/orders/update-order', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderId: e.target.id,
                status: !checked
            })
        }).then(res => res.json())
        .then(data => {
            if (data.error) {
                console.log(data)
            } else {
                fetch('/api/v1/orders/all-orders')
                .then(res => res.json())
                .then(data => {
                    dispatch(actionSetOrders(data))
                })
            }
        })
    }

    return (
        <Accordion className="accordion-custom" >
            <Accordion.Item eventKey={`${selectedOrder.id}`}>
                <Accordion.Header>
                    <Row >
                    <Col className="col-10 mx-auto col-lg-2">{newDate}</Col>
                    <Col className="col-10 mx-auto col-lg-2">${cartValues.cartTotal}</Col>
                    <Col className="col-10 mx-auto col-lg-2">{firstName}</Col>
                    <Col className="col-10 mx-auto col-lg-2">{orderId} <Badge bg={completed ? "success" : "warning" }>{completed ? "Completed" : "Not Complete" }</Badge></Col>
                    </Row>
                </Accordion.Header>
                <Accordion.Body>
                    <Container>
                        <Row style={{textAlign: "left"}}>
                            <Col xs={12} sm={6}>
                            <b>Customer Info</b>
                            <br />
                            Customer: {firstName} {lastName}
                            <br />
                            Email: {email}
                            <br />
                            Phone: {phoneNumber}
                            </Col>
                            <Col xs={12} sm={6}>
                            <b>Order Info</b>
                            {cart.cartItems.map((item) => {
                            return (<div key={item.id}>
                                <span>{item.count}x {item.name}</span><br />
                                </div>)
                        })}
                            </Col>
                            <div onChange={(e) => handleChange(e)}>
                            <Form.Check
                                type={'checkbox'}
                                id={`${orderId}`}
                                value={checked}
                                label={`Order is Completed`}
                                defaultChecked={completed}
                            />
                        </div>
                        </Row>
                    </Container>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}
