import React from 'react'
import { Container, Card, Row, Col } from 'react-bootstrap'
import poundCake from '../images/pound_cake.jpg'
import halloStraws from '../images/halloween_strawberries.jpg'
import empanadas from '../images/empanadas.jpg'
import cake from '../images/flower_cake.jpg'

export default function Home() {
    return (
        <div>
            <Container className="pt-2 pb-4 menu" fluid>

                <h2>Menu</h2>
                <Row xs={1} md={2} lg={2} xl={4} className="g-4">
                    <Col>
                        <Card className="bg-dark text-white">
                            <Card.Img src={poundCake} alt="Card image"/>
                            <Card.ImgOverlay>
                                <Card.Title>Pound Cake</Card.Title>
                                <Card.Text>
                                    Order
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
                    </Col>
                </Row>

            </Container>
        </div>
    )
}
