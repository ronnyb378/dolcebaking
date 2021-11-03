import React, { useState } from 'react'
import { Container, Card, Row, Col, Button } from 'react-bootstrap'
import poundCake from '../images/pound_cake.jpg'
import halloStraws from '../images/halloween_strawberries.jpg'
import empanadas from '../images/empanadas.jpg'
import cake from '../images/flower_cake.jpg'
import ItemPopUp from '../components/ItemPopUp'

export default function Home() {
    const [modalShow, setModalShow] = useState(false)

    const menuItems = [
        {
            id: 1,
            name: 'Pound Cake (6ct)',
            description: 'Delicious warm pound cakes',
            image: poundCake,
            price: 10,
        }, {
            id: 1,
            name: 'Strawberries (6ct)',
            description: 'Chocolate covered strawberries for your boo',
            image: halloStraws,
            price: 12,
        }, {
            id: 1,
            name: 'Cookies (6ct)',
            description: 'Delicious warm cookies for any occasion',
            image: cake,
            price: 8,
        }, {
            id: 1,
            name: 'Empanadas (6ct)',
            description: 'Homemade empanadas',
            image: empanadas,
            price: 10,
        }]

    return (
        <div>
            <Container className="pt-2 pb-4 menu" fluid>
                <h2>Menu</h2>
                <Row xs={1} md={2} lg={2} xl={4} className="g-4">
                    {/* <Col>
                        <Card className="bg-dark text-white">
                            <Card.Img src={poundCake} alt="Card image" />
                            <Card.ImgOverlay>
                                <Card.Title>Pound Cake</Card.Title>
                                <Card.Text>
                                    <Button variant="primary" onClick={() => setModalShow(true)}>
                                        Launch vertically centered modal
                                    </Button>

                                    <ItemPopUp
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                    />
                                </Card.Text>
                            </Card.ImgOverlay>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="bg-dark text-white">
                            <Card.Img src={halloStraws} alt="Card image" />
                            <Card.ImgOverlay>
                                <Card.Title>Strawberries</Card.Title>
                                <Card.Text>
                                    Order
                                </Card.Text>
                            </Card.ImgOverlay>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="bg-dark text-white">
                            <Card.Img src={cake} alt="Card image" />
                            <Card.ImgOverlay>
                                <Card.Title>Cakes</Card.Title>
                                <Card.Text>
                                    Order
                                </Card.Text>
                            </Card.ImgOverlay>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="bg-dark text-white">
                            <Card.Img src={empanadas} alt="Card image" />
                            <Card.ImgOverlay>
                                <Card.Title>Empanadas</Card.Title>
                                <Card.Text>
                                    Order
                                </Card.Text>
                            </Card.ImgOverlay>
                        </Card>
                    </Col> */}
                    {menuItems.map((items) => {
                        return <Col>
                                    <Card className="bg-dark text-white">
                                        <Card.Img src={items.image} alt="Card image" />
                                        <Card.ImgOverlay>
                                            <Card.Title>{items.name}</Card.Title>
                                            <Card.Text>
                                                <Button variant="primary" onClick={() => setModalShow(true)}>
                                                    Launch vertically centered modal
                                                </Button>
                                                <ItemPopUp
                                                    show={modalShow}
                                                    onHide={() => setModalShow(false)}
                                                />
                                            </Card.Text>
                                        </Card.ImgOverlay>
                                    </Card>
                                </Col>
                    })}
                </Row>
            </Container>
        </div>
    )
}
