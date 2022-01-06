import React from 'react'
import { Card, Row, Container, Col } from 'react-bootstrap'

export default function PastOrders(props) {
    const order = props.order.cart
    // return (
    //     <Container className='d-flex justify-content-center past-order-container'>
    //         <Row>
    //             {order.cartItems ? (order.cartItems.map((item) => {
                    return (<Col>
                    <Card className='past-order-card' >
                        <Card.Header>Order Id: {props.order.orderId}</Card.Header>
                        <Card.Body>
                            <Card.Title>Cart Summary</Card.Title>
                                <Card.Text>
                                    {/* {props.order.count} {props.order.name} */}
                                </Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>)
        //         })) : ('')}
        //     </Row>
        // </Container>
    // )
}
