import React, { useEffect, useState } from 'react'
import { Col, Row, Tab, ListGroup, Accordion } from 'react-bootstrap'
import OrderDetail from '../components/OrderDetail'

export default function Admin() {
    const [ orders, setOrders ] = useState([])

    useEffect(() => {
        fetch('/api/v1/orders/all-orders')
        .then(res => res.json())
        .then(data => {
            setOrders(data)
        })
    }, [])

    return (
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row>
                <Col sm={4}>
                    <ListGroup>
                        <ListGroup.Item action href="#link1">
                            Orders
                        </ListGroup.Item>
                        <ListGroup.Item action href="#link2">
                            Something else
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col sm={8}>
                    <Tab.Content>
                        <Tab.Pane eventKey="#link1">
                        {/* <Accordion> */}
                            {orders.map((order, index) => {
                                return <OrderDetail order={order} key={index} />
                            })}
                        {/* </Accordion> */}
                        </Tab.Pane>
                        <Tab.Pane eventKey="#link2">
                            Hello World
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}
