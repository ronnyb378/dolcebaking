import React, { useState } from 'react'
import { Container, Card, Row, Col, Button } from 'react-bootstrap'
import poundCake from '../images/pound_cake.jpg'
import halloStraws from '../images/halloween_strawberries.jpg'
import empanadas from '../images/empanadas.jpg'
import cake from '../images/flower_cake.jpg'
import ItemPopUp from '../components/ItemPopUp'

export default function Home() {
    const [modalShow, setModalShow] = useState(false)
    const [item, setItem] = useState('')

    const menuItems = [
        {
            id: 1,
            name: 'Pound Cake (6ct)',
            description: 'Delicious warm pound cakes',
            category: 'Pound Cake',
            image: poundCake,
            price: 10,
        }, {
            id: 2,
            name: 'Strawberries (6ct)',
            description: 'Chocolate covered strawberries for your boo',
            category: 'Strawberries',
            image: halloStraws,
            price: 12,
        }, {
            id: 3,
            name: 'Empanadas (6ct)',
            description: 'Homemade empanadas',
            category: 'Empanadas',
            image: empanadas,
            price: 10,
        }
    ]

    return (
        <div>
            <Container className="pt-2 pb-4 menu" fluid>
                <h2>Menu</h2>
                <Row xs={1} md={2} lg={2} xl={4} className="g-4 justify-content-center">
                    {menuItems.map((item) => {
                        return <Col>
                            <Card className="bg-dark text-white">
                                <Card.Img src={item.image} alt="Card image" />
                                <Card.ImgOverlay>
                                    <Card.Title>{item.category}</Card.Title>
                                    <Card.Text>
                                        <Button variant="primary" onClick={() => { setModalShow(true); setItem(item.name)}}>
                                            Order
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
            <ItemPopUp
                show={modalShow}
                onHide={() => setModalShow(false)}
                data={item}
            />
        </div>
    )
}
