import React from 'react'
import { Col, Image, Row, Button } from 'react-bootstrap';

export default function CartItem({item, value}) {
    const { name, image, price, total, count } = item;


    return (
        <Row>
            <Col>
                <Image src={image} style={{ maxHeight: "100%"}}fluid/>
            </Col>
            <Col>
                {name}
            </Col>
            <Col>
                ${price}
            </Col>
            <Col>
            <Button>-</Button>
                {count}
            <Button>+</Button>
            </Col>
            <Col>
                <Button>X</Button>
            </Col>
            <Col>
                {total}
            </Col>
        </Row>
    )
}
