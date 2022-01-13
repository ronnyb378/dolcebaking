import React, { useEffect, useState } from 'react'
import { Col, Row, Tab, Nav } from 'react-bootstrap'
import OrderDetail from '../components/OrderDetail'
import Paginate from '../components/Paginate'

export default function Admin() {
    const [orders, setOrders] = useState([])

    const ordersLength = orders.length
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 5

    let indexOfLastPost = currentPage * postsPerPage
    let indexOfFirstPost = indexOfLastPost - postsPerPage

    let currentPosts = [];

    currentPosts = orders.slice(indexOfFirstPost, indexOfLastPost)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    useEffect(() => {
        fetch('/api/v1/orders/all-orders')
            .then(res => res.json())
            .then(data => {
                setOrders(data)
            })
    }, [])

    const updateOrders = (orders) => { setOrders(orders) }

    return (
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="first">
            <Row className="pt-2">
                <Col xs={12} sm={4}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="first">Tab 1</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">Tab 2</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col xs={12} sm={8}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <Paginate currentPage={currentPage} paginate={paginate} postsPerPage={postsPerPage} totalPosts={ordersLength} />
                            {currentPosts.map((order, index) => {
                                return <OrderDetail order={order} key={index} updateOrders={updateOrders} />
                            })}
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            Hello World
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}
