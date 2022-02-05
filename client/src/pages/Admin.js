import React, { useEffect, useState } from 'react'
import { Col, Row, Tab, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import OrderDetail from '../components/OrderDetail'
import Paginate from '../components/Paginate'
import { actionSetOrders } from '../redux/actions/orders'

export default function Admin() {
    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orders)

    // pagination 
    const ordersLength = orderList.length
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 5

    let indexOfLastPost = currentPage * postsPerPage
    let indexOfFirstPost = indexOfLastPost - postsPerPage

    let currentPosts = [];


    currentPosts = orderList.slice(indexOfFirstPost, indexOfLastPost)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    useEffect(() => {
        fetch('/api/v1/orders/all-orders')
            .then(res => res.json())
            .then(data => {
                dispatch(actionSetOrders(data))
            })
    }, [dispatch])

    return (
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="first">
            <h2>Admin Dashboard</h2>
            <Row className=" justify-content-center">
                <Col xs={4} lg={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="first">Orders</Nav.Link>
                        </Nav.Item>
                        {/* <Nav.Item>
                            <Nav.Link eventKey="second">TBD</Nav.Link>
                        </Nav.Item> */}
                    </Nav>
                </Col>
                <Col xs={12} lg={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <Paginate currentPage={currentPage} paginate={paginate} postsPerPage={postsPerPage} totalPosts={ordersLength} />
                            {currentPosts.map((order, index) => {
                                return <OrderDetail order={order} id={order.orderId} key={index} />
                            })}
                        </Tab.Pane>
                        {/* <Tab.Pane eventKey="second">
                            Under Maintenance
                        </Tab.Pane> */}
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}
