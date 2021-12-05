import React, { useState } from 'react'
import { Container, Card, Row, Col, Button } from 'react-bootstrap'
import ItemPopUp from '../components/ItemPopUp'
import { useDispatch, useSelector } from 'react-redux'
import { actionItemDetail } from '../redux/actions/itemDetail'
import AboutUs from '../components/AboutUs'


export default function Home() {
    const dispatch = useDispatch()

    const items = useSelector(state => state.products.categories)
    const [modalShow, setModalShow] = useState(false)
    const [tempItem, setTempItem ] = useState('')

    // const getItem = (id) => {
    //     const product = items.find(item => item.id === id);
    //     return product
    // }


    const handleDetail = (object) => {
        dispatch(actionItemDetail(object))
    }


    return (
        <div>
            <Container className="pt-4 pb-4 menu" fluid>
                <h2>Our Treats</h2>
                <Row xs={1} md={2} lg={2} xl={4} className="pt-4 g-4 justify-content-center">
                    {items.map((item) => {
                        return <Col key={item.id} onClick={() => {
                            setModalShow(true); setTempItem(item); handleDetail(item.products[0])}}>
                            <Card className="bg-dark text-white ">
                                <div className="img-hover-zoom">
                                <Card.Img variant="top" src={item.image} alt="Card image" />
                                </div>
                                <Card.Body>
                                    <Card.Text>
                                        {item.category}
                                    </Card.Text>
                                    <Button >
                                            Order
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    })}
                </Row>
            </Container>
            <ItemPopUp
                show={modalShow}
                onHide={() => setModalShow(false)}
                data={tempItem}
            />
            <AboutUs />
        </div>
    )
}
