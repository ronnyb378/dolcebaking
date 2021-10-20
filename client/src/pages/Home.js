import React from 'react'
import { Container, Card, CardGroup } from 'react-bootstrap'
import poundCake from '../images/pound_cake.jpg'

export default function Home() {
    return (
        <div>
            <Container className="pt-2 pb-4 menu" fluid>

                <h2>Menu</h2>
                <CardGroup>
                <Card>
                    <Card.Img variant="top" src={poundCake} />
                    <Card.Body>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk
                            of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Img variant="top" src={poundCake} />
                    <Card.Body>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk
                            of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Img variant="top" src={poundCake} />
                    <Card.Body>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk
                            of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Img variant="top" src={poundCake} />
                    <Card.Body>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk
                            of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
                </CardGroup>
            </Container>
        </div>
    )
}
