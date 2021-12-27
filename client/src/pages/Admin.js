import React, { useEffect, useState } from 'react'
import { Col, Row, Tab, ListGroup } from 'react-bootstrap'
import OrderDetail from '../components/OrderDetail'
import Paginate from '../components/Paginate'

export default function Admin() {
    const [ orders, setOrders ] = useState([])

    const ordersLength = orders.length
    const [currentPage, setCurrentPage ] = useState(1)
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

    return (
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row className="pt-2">
                <Col xs={12} sm={4}>
                    <ListGroup>
                        <ListGroup.Item action href="#link1">
                            Orders
                        </ListGroup.Item>
                        <ListGroup.Item action href="#link2">
                            Something else
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col xs={12} sm={8}>
                    <Tab.Content>
                        <Tab.Pane eventKey="#link1">
                        <Paginate currentPage={currentPage} paginate={paginate} postsPerPage={postsPerPage} totalPosts={ordersLength}/>
                            {currentPosts.map((order, index) => {
                                return <OrderDetail order={order} key={index} />
                            })}
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
