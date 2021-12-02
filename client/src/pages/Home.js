import React, { useState } from 'react'
import { Container, Card, Row, Col, Button } from 'react-bootstrap'

import ItemPopUp from '../components/ItemPopUp'
import { useDispatch, useSelector } from 'react-redux'
import { actionItemDetail } from '../redux/actions/itemDetail'


export default function Home() {
    const dispatch = useDispatch()

    const [modalShow, setModalShow] = useState(false)
    const items = useSelector(state => state.products)

    const getItem = (id) => {
        const product = items.find(item => item.id === id);
        return product
    }

    const handleDetail = (id) => {
        const product = getItem(id);
        dispatch(actionItemDetail(product))
    }


    return (
        <div>
            <Container className="pt-2 pb-4 menu" fluid>
                <h2>Menu</h2>
                <Row xs={1} md={2} lg={2} xl={4} className="g-4 justify-content-center">
                    {items.map((item) => {
                        return <Col key={item.id}>
                            <Card className="bg-dark text-white">
                                <Card.Img src={item.image} alt="Card image" />
                                <Card.ImgOverlay>
                                    <Card.Title>{item.category}</Card.Title>
                                    <Card.Text>
                                        <Button variant="primary" onClick={() => { setModalShow(true); handleDetail(item.id)}}>
                                            Order
                                        </Button>
                                    </Card.Text>
                                </Card.ImgOverlay>
                            </Card>
                        </Col>
                    })}
                </Row>
            </Container>
            <ItemPopUp
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    )
}
