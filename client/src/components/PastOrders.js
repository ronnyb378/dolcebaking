import React from 'react'
import { Card, Col } from 'react-bootstrap'

export default function PastOrders(props) {
    const order = props.order.cart
    
    return (
        <Col>
            <Card>
                <Card.Header>Order Id: {props.order.orderId}</Card.Header>
                <Card.Body>
                    <Card.Title>Cart Summary</Card.Title>
                    {order.cartItems ? (order.cartItems.map((item) => {
                        return <div>
                            {console.log(item)}
                            <Card.Text>
                                {item.count} {item.name}
                            </Card.Text>
                        </div>
                    })) : ('')}
                </Card.Body>
            </Card>
        </Col>
    )
}
